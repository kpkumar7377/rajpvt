"use client";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";

export default function NicIDCardBack() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Form Fields
  const [dateOfIssue, setDateOfIssue] = useState("01-06-2012");
  const [validUpto, setValidUpto] = useState("31-03-2015");
  const [candidateName, setCandidateName] = useState("BALAJI KUMAR");
  const [addressLine1, setAddressLine1] = useState(
    "#754, Sea Breeze Apartments,",
  );
  const [addressLine2, setAddressLine2] = useState(
    "Gokul Arcade, 2nd Cross Street,",
  );
  const [addressLine3, setAddressLine3] = useState("Trichy - 24");
  const [dateOfBirth, setDateOfBirth] = useState("15-05-1966");
  const [bloodGroup, setBloodGroup] = useState("O -ve");
  const [phoneMobile, setPhoneMobile] = useState("9433264254");

  // Center Office Address Fields
  const [officeLine1, setOfficeLine1] = useState(
    "National Informatics Centre,",
  );
  const [officeLine2, setOfficeLine2] = useState(
    "Ministry of Communications & Information Technology,",
  );
  const [officeLine3, setOfficeLine3] = useState(
    "Department of Information Technology",
  );
  const [officeLine4, setOfficeLine4] = useState("E-2-A, Rajaji Bhavan,");
  const [officeLine5, setOfficeLine5] = useState(
    "Besant Nagar, Chennai -600 090",
  );

  // Signatures
  const [holderSignature, setHolderSignature] = useState<string | null>(null);
  const [authoritySignature, setAuthoritySignature] = useState<string | null>(
    null,
  );

  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    documentTitle: "NIC_ID_Card_Back",
    onBeforePrint: () => {
      return new Promise((resolve) => setTimeout(resolve, 200));
    },
    pageStyle: `
      @page {
        size: 55mm 85mm;
        margin: 0;
      }
      body {
        margin: 0;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `,
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
      {/* Form Controls */}
      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl space-y-4 border border-gray-300">
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-50 text-sm"
            onClick={() => router.back()}
          >
            Back
          </button>
          <h2 className="font-semibold text-base text-gray-800">
            NIC ID Card (Back Side Details)
          </h2>
          <div />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <input
            value={dateOfIssue}
            onChange={(e) => setDateOfIssue(e.target.value)}
            placeholder="Date of Issue"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={validUpto}
            onChange={(e) => setValidUpto(e.target.value)}
            placeholder="Valid Upto"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Name (as in address)"
            className="border rounded px-3 py-1.5 md:col-span-2"
          />
          <input
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Address Line 1"
            className="border rounded px-3 py-1.5 md:col-span-2"
          />
          <input
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Address Line 2"
            className="border rounded px-3 py-1.5 md:col-span-2"
          />
          <input
            value={addressLine3}
            onChange={(e) => setAddressLine3(e.target.value)}
            placeholder="Address Line 3 (City / Pincode)"
            className="border rounded px-3 py-1.5 md:col-span-2"
          />
          <input
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Date of Birth"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            placeholder="Blood Group"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={phoneMobile}
            onChange={(e) => setPhoneMobile(e.target.value)}
            placeholder="Phone / Mobile"
            className="border rounded px-3 py-1.5 md:col-span-2"
          />

          {/* Center Red Block Details */}
          <div className="md:col-span-2 border-t pt-2 space-y-2">
            <p className="text-xs font-semibold text-gray-600">
              NIC Office Address (Center Block)
            </p>
            <input
              value={officeLine1}
              onChange={(e) => setOfficeLine1(e.target.value)}
              placeholder="Office Line 1"
              className="border rounded px-3 py-1 text-xs w-full"
            />
            <input
              value={officeLine2}
              onChange={(e) => setOfficeLine2(e.target.value)}
              placeholder="Office Line 2"
              className="border rounded px-3 py-1 text-xs w-full"
            />
            <input
              value={officeLine3}
              onChange={(e) => setOfficeLine3(e.target.value)}
              placeholder="Office Line 3"
              className="border rounded px-3 py-1 text-xs w-full"
            />
            <input
              value={officeLine4}
              onChange={(e) => setOfficeLine4(e.target.value)}
              placeholder="Office Line 4"
              className="border rounded px-3 py-1 text-xs w-full"
            />
            <input
              value={officeLine5}
              onChange={(e) => setOfficeLine5(e.target.value)}
              placeholder="Office Line 5"
              className="border rounded px-3 py-1 text-xs w-full"
            />
          </div>

          {/* Signature Uploads */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Holder Signature
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setHolderSignature)}
              className="border rounded px-2 py-1 text-xs file:mr-2 file:py-0.5 file:px-2 file:border-0 file:rounded file:bg-blue-50 file:text-blue-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Issuing Authority Signature
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setAuthoritySignature)}
              className="border rounded px-2 py-1 text-xs file:mr-2 file:py-0.5 file:px-2 file:border-0 file:rounded file:bg-blue-50 file:text-blue-700"
            />
          </div>
        </div>
      </div>

      {/* Standard PVC Card Container: 55mm x 85mm */}
      <div
        ref={cardRef}
        className="bg-white font-sans overflow-hidden flex flex-col justify-between relative "
        style={{ width: "55mm", height: "85mm", boxSizing: "border-box" }}
      >
        {/* Top Header Section */}
        <div>
          {/* Top Red Bar with Arch */}
          <div className="relative w-full overflow-hidden leading-none mb-[1.5mm]">
            <svg
              viewBox="0 0 100 14"
              className="w-full h-[6mm] fill-[#ED1C24] block"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 L 100,0 L 100,12 Q 50,3 0,12 Z" />
            </svg>
          </div>

          {/* Card Details Section */}
          <div className="px-[3.2mm] flex flex-col font-serif select-none">
            {/* Dates Group */}
            <div className="text-[7.2px] leading-[1.25] tracking-tight">
              <div className="flex">
                <span className="font-bold text-[#881337] w-[19mm]">
                  Date of Issue
                </span>
                <span className="font-bold text-[#881337] mr-1">:</span>
                <span className="font-bold text-[#881337]">{dateOfIssue}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#881337] w-[19mm]">
                  Valid Upto
                </span>
                <span className="font-bold text-[#881337] mr-1">:</span>
                <span className="font-bold text-[#881337]">{validUpto}</span>
              </div>
            </div>

            {/* Address Group */}
            <div className="mt-[1.5mm] mb-[0.8mm]">
              <p className="text-[7.2px] font-bold text-[#1B4F9B] tracking-tight">
                Residential Address :
              </p>
            </div>
            <div className="text-[7px] leading-[1.2] text-[#881337] font-serif pl-[0.8mm]">
              <p className="font-bold uppercase tracking-wide">
                {candidateName}
              </p>
              <p className="font-semibold">{addressLine1}</p>
              <p className="font-semibold">{addressLine2}</p>
              <p className="font-semibold">{addressLine3}</p>
            </div>

            {/* Personnel Details Group */}
            <div className="mt-[2mm] text-[7.2px] leading-[1.25] tracking-tight">
              <div className="flex">
                <span className="font-bold text-[#1B4F9B] w-[19mm]">
                  Date of Birth
                </span>
                <span className="font-bold text-[#1B4F9B] mr-1">:</span>
                <span className="font-bold text-[#881337]">{dateOfBirth}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#1B4F9B] w-[19mm]">
                  Blood Group
                </span>
                <span className="font-bold text-[#1B4F9B] mr-1">:</span>
                <span className="font-bold text-[#881337]">{bloodGroup}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#1B4F9B] w-[19mm]">
                  Phone / Mobile
                </span>
                <span className="font-bold text-[#1B4F9B] mr-1">:</span>
                <span className="font-bold text-[#881337]">{phoneMobile}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Center Red Office Address Block --- */}
        <div className="my-[1mm] px-[2mm] py-[1.2mm] bg-[#ED1C24] text-white font-serif leading-[1.2] tracking-tight select-none flex flex-col gap-0.5">
          <p className="text-[6.5px] font-bold">{officeLine1}</p>
          <p className="text-[6.2px] font-bold">{officeLine2}</p>
          <p className="text-[6.2px] font-bold">{officeLine3}</p>
          <p className="text-[6.2px] font-bold">{officeLine4}</p>
          <p className="text-[6.2px] font-bold">{officeLine5}</p>
        </div>

        {/* --- Bottom Signatures and Footer Section --- */}
        <div className="w-full px-[3mm] pb-[2.5mm] flex flex-col items-center">
          {/* Signatures Row */}
          <div className="w-full flex justify-between items-end gap-2 mb-[1.2mm]">
            {/* Signature of the Holder */}
            <div className="flex-1 flex flex-col items-center min-w-0">
              <span className="text-[6px] font-sans font-bold text-gray-800 text-center leading-none mb-1">
                Signature of the Holder
              </span>
              <div className="w-full h-[7mm] border border-gray-400 bg-white p-[0.8mm] box-border flex items-center justify-center overflow-hidden">
                {holderSignature && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={holderSignature}
                    alt="Holder Signature"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="eager"
                  />
                )}
              </div>
            </div>

            {/* Signature of Issuing Authority */}
            <div className="flex-1 flex flex-col items-center min-w-0">
              <span className="text-[6px] font-sans font-bold text-gray-800 text-center leading-none mb-1">
                Signature of Issuing Authority
              </span>
              <div className="w-full h-[7mm] border border-gray-400 bg-white p-[0.8mm] box-border flex items-center justify-center overflow-hidden">
                {authoritySignature && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={authoritySignature}
                    alt="Authority Signature"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="eager"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom Disclaimer */}
          <p className="text-[4.5px] font-sans font-semibold text-gray-800 text-center tracking-tight leading-tight w-full">
            In case lost or found, report immediately to the police or the
            nearest NIC Centre.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => handlePrint?.()}
        className="bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700 transition"
      >
        Print Card
      </button>
    </div>
  );
}
