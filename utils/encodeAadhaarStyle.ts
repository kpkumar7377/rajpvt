// utils/encodeAadhaarStyle.ts

export async function generateAadhaarStyleNumericPayload(
  fields: string[],
): Promise<string> {
  // 1. Pack demographic strings using 0xFF (255) as the field delimiter
  const encoder = new TextEncoder();
  const byteChunks: Uint8Array[] = [];

  for (let i = 0; i < fields.length; i++) {
    byteChunks.push(encoder.encode(fields[i]));
    // Append 0xFF delimiter after every field except the last
    if (i < fields.length - 1) {
      byteChunks.push(new Uint8Array([0xff]));
    }
  }

  // Combine chunks into a single byte buffer
  const totalLength = byteChunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const combinedBytes = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of byteChunks) {
    combinedBytes.set(chunk, offset);
    offset += chunk.length;
  }

  // 2. Gzip compress using the native Web Stream API
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(combinedBytes);
  writer.close();

  const compressedBuffer = await new Response(cs.readable).arrayBuffer();
  const compressedBytes = new Uint8Array(compressedBuffer);

  // 3. Convert byte array to a BigInt (Big-Endian)
  let bigIntVal = BigInt(0);
  for (let i = 0; i < compressedBytes.length; i++) {
    bigIntVal = (bigIntVal << BigInt(8)) | BigInt(compressedBytes[i]);
  }

  // 4. Return as standard base-10 decimal string
  return bigIntVal.toString(10);
}
