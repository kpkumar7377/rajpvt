'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const BUCKET = 'pvthouse';
const SALT_PATH = 'vault.salt';
const CHECK_PATH = 'vault.check';
const CHECK_TEXT = 'pvthouse-vault-ok';

interface VaultFile {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: number;
}

/* ---------------- Crypto helpers (Web Crypto, runs in browser) ---------------- */

const enc = new TextEncoder();
const dec = new TextDecoder();

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations: 600_000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false, // non-extractable
    ['encrypt', 'decrypt']
  );
}

// Output format: [12-byte IV][ciphertext + GCM tag]
async function encryptBytes(key: CryptoKey, data: ArrayBuffer | Uint8Array): Promise<Uint8Array> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data as BufferSource)
  );
  const out = new Uint8Array(iv.length + ct.length);
  out.set(iv, 0);
  out.set(ct, iv.length);
  return out;
}

async function decryptBytes(key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
  const buf = new Uint8Array(data);
  return crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: buf.slice(0, 12) },
    key,
    buf.slice(12)
  );
}

/* ---------------- Misc helpers ---------------- */

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
};

const fileIcon = (type: string) => {
  if (type.startsWith('image/')) return '🖼️';
  if (type === 'application/pdf') return '📕';
  if (type.startsWith('video/')) return '🎞️';
  if (type.startsWith('audio/')) return '🎵';
  if (type.startsWith('text/')) return '📄';
  if (type.includes('zip') || type.includes('compressed')) return '🗜️';
  return '📁';
};

// Only types that can't run scripts are opened in a tab.
// HTML/SVG etc. are downloaded instead (a blob URL shares your app's origin).
const isSafeToPreview = (type: string) =>
  (type.startsWith('image/') && type !== 'image/svg+xml') ||
  type === 'application/pdf' ||
  type.startsWith('video/') ||
  type.startsWith('audio/') ||
  type === 'text/plain';

const saveBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
};

/* ---------------- Component ---------------- */

export default function CloudFileVault() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [key, setKey] = useState<CryptoKey | null>(null);
  const [passphrase, setPassphrase] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const [files, setFiles] = useState<VaultFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  /* ----- Unlock / create vault ----- */
  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase) return;
    setError('');
    setUnlocking(true);

    try {
      const { data: saltBlob } = await supabase.storage.from(BUCKET).download(SALT_PATH);

      if (!saltBlob) {
        // First use: create a new vault
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const k = await deriveKey(passphrase, salt);
        const check = await encryptBytes(k, enc.encode(CHECK_TEXT));

        const up1 = await supabase.storage
          .from(BUCKET)
          .upload(SALT_PATH, new Blob([salt as BlobPart]), {
            contentType: 'application/octet-stream',
            upsert: false,
          });
        if (up1.error) throw up1.error;

        const up2 = await supabase.storage
          .from(BUCKET)
          .upload(CHECK_PATH, new Blob([check as BlobPart]), {
            contentType: 'application/octet-stream',
            upsert: false,
          });
        if (up2.error) throw up2.error;

        setKey(k);
      } else {
        // Existing vault: derive key and verify the passphrase
        const salt = new Uint8Array(await saltBlob.arrayBuffer());
        const k = await deriveKey(passphrase, salt);

        const { data: checkBlob, error: checkErr } = await supabase.storage
          .from(BUCKET)
          .download(CHECK_PATH);
        if (checkErr || !checkBlob) throw new Error('Vault check file is missing.');

        try {
          const plain = await decryptBytes(k, await checkBlob.arrayBuffer());
          if (dec.decode(plain) !== CHECK_TEXT) throw new Error();
        } catch {
          throw new Error('Wrong passphrase.');
        }
        setKey(k);
      }
      setPassphrase('');
    } catch (err: any) {
      setError(err?.message || 'Could not unlock vault.');
    } finally {
      setUnlocking(false);
    }
  };

  const lock = () => {
    setKey(null);
    setFiles([]);
    setError('');
  };

  /* ----- Load file list (names/types live in encrypted .meta files) ----- */
  const fetchFiles = useCallback(async (k: CryptoKey) => {
    setLoading(true);
    const { data, error: listErr } = await supabase.storage.from(BUCKET).list('', {
      limit: 1000,
    });

    if (listErr || !data) {
      setError(listErr?.message || 'Could not list files.');
      setLoading(false);
      return;
    }

    const metas = await Promise.all(
      data
        .filter((item) => item.name.endsWith('.meta'))
        .map(async (item) => {
          try {
            const { data: blob } = await supabase.storage.from(BUCKET).download(item.name);
            if (!blob) return null;
            const plain = await decryptBytes(k, await blob.arrayBuffer());
            return JSON.parse(dec.decode(plain)) as VaultFile;
          } catch {
            return null;
          }
        })
    );

    setFiles(
      (metas.filter(Boolean) as VaultFile[]).sort((a, b) => b.createdAt - a.createdAt)
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (key) fetchFiles(key);
  }, [key, fetchFiles]);

  /* ----- Upload (encrypt in browser first) ----- */
  const uploadFiles = async (list: FileList | File[]) => {
    if (!key) return;
    const arr = Array.from(list);
    if (!arr.length) return;
    setError('');

    for (let i = 0; i < arr.length; i++) {
      const file = arr[i];
      try {
        setUploadStatus(`Encrypting & uploading ${i + 1}/${arr.length}: ${file.name}`);
        const id = crypto.randomUUID();

        const meta: VaultFile = {
          id,
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size,
          createdAt: Date.now(),
        };

        const encFile = await encryptBytes(key, await file.arrayBuffer());
        const encMeta = await encryptBytes(key, enc.encode(JSON.stringify(meta)));

        const opts = { contentType: 'application/octet-stream', upsert: false };

        const r1 = await supabase.storage
          .from(BUCKET)
          .upload(`${id}.bin`, new Blob([encFile as BlobPart]), opts);
        if (r1.error) throw r1.error;

        const r2 = await supabase.storage
          .from(BUCKET)
          .upload(`${id}.meta`, new Blob([encMeta as BlobPart]), opts);
        if (r2.error) {
          await supabase.storage.from(BUCKET).remove([`${id}.bin`]);
          throw r2.error;
        }
      } catch (err: any) {
        setError(`Upload failed for "${file.name}": ${err?.message || 'unknown error'}`);
      }
    }

    setUploadStatus('');
    if (inputRef.current) inputRef.current.value = '';
    await fetchFiles(key);
  };

  /* ----- Download + decrypt ----- */
  const getDecryptedBlob = async (f: VaultFile) => {
    if (!key) throw new Error('Vault is locked.');
    const { data, error: dlErr } = await supabase.storage.from(BUCKET).download(`${f.id}.bin`);
    if (dlErr || !data) throw dlErr || new Error('Download failed.');
    const plain = await decryptBytes(key, await data.arrayBuffer());
    return new Blob([plain], { type: f.type || 'application/octet-stream' });
  };

  // Opens the preview in a NEW TAB
  const handlePreview = async (f: VaultFile) => {
    setError('');
    setBusyId(f.id);

    // Open the tab synchronously (inside the click) so popup blockers allow it
    const tab = isSafeToPreview(f.type) ? window.open('', '_blank') : null;
    if (tab) tab.document.title = 'Decrypting…';

    try {
      const blob = await getDecryptedBlob(f);

      if (!tab) {
        saveBlob(blob, f.name); // unsafe type -> download instead
        return;
      }

      const url = URL.createObjectURL(blob);
      tab.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 5 * 60_000);
    } catch (err: any) {
      tab?.close();
      setError(`Could not open "${f.name}": ${err?.message || 'decryption failed'}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleDownload = async (f: VaultFile) => {
    setError('');
    setBusyId(f.id);
    try {
      saveBlob(await getDecryptedBlob(f), f.name);
    } catch (err: any) {
      setError(`Could not download "${f.name}": ${err?.message || 'failed'}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (f: VaultFile) => {
    if (!key || !confirm(`Delete "${f.name}"? This cannot be undone.`)) return;
    setBusyId(f.id);
    const { error: rmErr } = await supabase.storage
      .from(BUCKET)
      .remove([`${f.id}.bin`, `${f.id}.meta`]);
    setBusyId(null);
    if (rmErr) return setError(rmErr.message);
    setFiles((prev) => prev.filter((x) => x.id !== f.id));
  };

  /* ---------------- UI ---------------- */

  const BackButton = (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  );

  // ---- Locked screen ----
  if (!key) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-md space-y-6">
          {BackButton}

          <form
            onSubmit={unlock}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                🔐
              </div>
              <h1 className="text-xl font-semibold text-slate-900">Unlock your vault</h1>
              <p className="mt-1 text-sm text-slate-500">
                Files are encrypted in your browser. Your passphrase never leaves this device.
              </p>
            </div>

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Passphrase"
                autoFocus
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={unlocking || !passphrase}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {unlocking ? 'Unlocking…' : 'Unlock'}
            </button>

            <p className="text-center text-xs text-slate-400">
              First time? Whatever passphrase you enter becomes your vault passphrase.
              <br />
              <strong>If you forget it, your files cannot be recovered.</strong>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ---- Unlocked screen ----
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          {BackButton}
          <button
            onClick={lock}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            🔒 Lock
          </button>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Cloud File Vault</h1>
          <p className="text-sm text-slate-500">
            End-to-end encrypted. Syncs across browsers with your passphrase.
          </p>
        </div>

        {/* Drop zone */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            uploadFiles(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
          } ${uploadStatus ? 'pointer-events-none opacity-70' : ''}`}
        >
          <span className="text-3xl">☁️</span>
          <span className="mt-2 text-sm font-medium text-slate-700">
            Drop files here or click to browse
          </span>
          <span className="mt-1 text-xs text-slate-400">
            Encrypted on your device before upload
          </span>
          <input
            ref={inputRef}
            type="file"
            multiple
            disabled={!!uploadStatus}
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            className="hidden"
          />
        </label>

        {uploadStatus && (
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            {uploadStatus}
          </div>
        )}

        {error && (
          <div className="flex items-start justify-between gap-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            <span>{error}</span>
            <button onClick={() => setError('')} className="font-medium">✕</button>
          </div>
        )}

        {/* File list */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 className="font-semibold text-slate-900">
              Your files <span className="text-slate-400">({files.length})</span>
            </h2>
            <button
              onClick={() => fetchFiles(key)}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Refresh
            </button>
          </div>

          {loading && <p className="px-4 py-6 text-center text-sm text-slate-500">Loading…</p>}

          {!loading && files.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-slate-400">
              No files yet. Upload your first one above.
            </p>
          )}

          <ul className="divide-y divide-slate-100">
            {files.map((f) => (
              <li key={f.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-2xl">{fileIcon(f.type)}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{f.name}</p>
                  <p className="text-xs text-slate-400">
                    {formatSize(f.size)} · {new Date(f.createdAt).toLocaleString()}
                  </p>
                </div>

                {busyId === f.id ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                ) : (
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      onClick={() => handlePreview(f)}
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(f)}
                      className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(f)}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}