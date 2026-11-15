"use client";

const STAMPS: string[] = [
  "/stamps/apo-central-railway.png",
  "/stamps/apo-east-central-railway.png",
  "/stamps/apo-east-coast-railway.png",
  "/stamps/apo-eastern-railway.png",
  "/stamps/apo-metro-railway-kolkata.png",
  "/stamps/apo-north-central-railway.png",
  "/stamps/apo-north-eastern-railway.png",
  "/stamps/apo-north-western-railway.png",
  "/stamps/apo-northeast-frontire-eastern-railway.png",
  "/stamps/apo-northern-railway.png",
  "/stamps/apo-south-central-railway-2.png",
  "/stamps/apo-south-central-railway.png",
  "/stamps/apo-south-coast-railway.png",
  "/stamps/apo-south-east-central-railway.png",
  "/stamps/apo-south-eastern-railway.png",
  "/stamps/apo-south-western-railway.png",
  "/stamps/apo-west-central-railway.png",
  "/stamps/cgm-central-railway.png",
  "/stamps/cgm-east-central-railway.png",
  "/stamps/cgm-east-coast-railway.png",
  "/stamps/cgm-eastern-railway.png",
  "/stamps/cgm-metro-railway-kolkatta.png",
  "/stamps/cgm-north-central-railway.png",
  "/stamps/cgm-north-eastern-railway.png",
  "/stamps/cgm-north-western-railway.png",
  "/stamps/cgm-northeast-frontire-eastern-railway.png",
  "/stamps/cgm-northern-railway.png",
  "/stamps/cgm-south-central-railway.png",
  "/stamps/cgm-south-coast-railway.png",
  "/stamps/cgm-south-east-central-railway.png",
  "/stamps/cgm-south-eastern-railway.png",
  "/stamps/cgm-south-western-railway.png",
  "/stamps/cgm-southern-railway.png",
  "/stamps/cgm-west-central-railway.png",
  "/stamps/cgm-western-railway.png",
  "/stamps/cms-central-railway.png",
  "/stamps/cms-east-central-railway.png",
  "/stamps/cms-east-coast-railway.png",
  "/stamps/cms-eastern-railway.png",
  "/stamps/cms-metro-railway-kolkatta.png",
  "/stamps/cms-north-eastern-railway.png",
  "/stamps/cms-north-railway.png",
  "/stamps/cms-north-western-railway.png",
  "/stamps/cms-northern-railway.png",
  "/stamps/cms-northieast-frontire.png",
  "/stamps/cms-south-central-railway.png",
  "/stamps/cms-south-coast-railway.png",
  "/stamps/cms-south-east-central-railway.png",
  "/stamps/cms-south-eastern-railway.png",
  "/stamps/cms-south-western-railway.png",
  "/stamps/cms-southern-railway.png",
  "/stamps/cms-west-central-railway.png",
  "/stamps/cms-western-railway.png",
  "/stamps/date-central-railway-1.png",
  "/stamps/date-central-railway.png",
  "/stamps/date-east-central-railway.png",
  "/stamps/date-east-coast-railway.png",
  "/stamps/date-eastern-railway.png",
  "/stamps/date-metro-railway-kolkatta.png",
  "/stamps/date-north-central-railway.png",
  "/stamps/date-north-eastern-railway.png",
  "/stamps/date-north-western-railway.png",
  "/stamps/date-northeast-frontire-railway.png",
  "/stamps/date-northern-railway.png",
  "/stamps/date-south-coast-railway.png",
  "/stamps/date-south-east-central-railway.png",
  "/stamps/date-south-eastern-railway.png",
  "/stamps/date-south-western-railway.png",
  "/stamps/date-southern-railway.png",
  "/stamps/date-west-central-railway.png",
  "/stamps/date-western-railway.png",
  "/stamps/iocl-iocl-executive-director.png",
  "/stamps/iocl-iocl-logo-stamp.png",
  "/stamps/misc-red-stamp-indian-railway-1.png",
  "/stamps/misc-red-stamp-indian-railway.png",
  "/stamps/misc-red-stamp-personnel-department-1.png",
  "/stamps/misc-red-stamp-pesonnel-department.png",
];

interface StampPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (file: File, url: string) => void;
}

export default function StampPicker({
  open,
  onClose,
  onSelect,
}: StampPickerProps) {
  if (!open) return null;

  const handlePick = async (url: string) => {
    try {
      const blob = await (await fetch(url)).blob();
      const name = url.split("/").pop() ?? "stamp.png";
      const file = new File([blob], name, { type: blob.type });
      onSelect(file, url);
    } finally {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      data-html2canvas-ignore="true"
      className="print:hidden"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          maxWidth: 600,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <strong>Select a stamp</strong>
          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {STAMPS.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt="stamp"
              onClick={() => handlePick(src)}
              style={{
                width: "100%",
                cursor: "pointer",
                border: "1px solid #ddd",
                borderRadius: 4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}