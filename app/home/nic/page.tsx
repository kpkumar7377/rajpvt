"use client";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NicIDCard() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Card fields
  const [idNumber, setIdNumber] = useState("2026 / NIC / 01");
  const [name, setName] = useState("BALAJI SINGH");
  const [designation, setDesignation] = useState("SCIENTIST - D");
  const [employeeCode, setEmployeeCode] = useState("1653");
  const [placeOfPosting, setPlaceOfPosting] = useState("Tricky Colloctorate");
  const [candidateImg, setCandidateImg] = useState<string | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    documentTitle: "NIC_ID_Card_Front",
    // Wait for all assets (SVGs and Images) inside the card to resolve before opening print dialog
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCandidateImg(reader.result as string);
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
            NIC ID Card (Front Side)
          </h2>
          <div />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <input
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="ID Number"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            placeholder="Employee Code"
            className="border rounded px-3 py-1.5"
          />
          <input
            value={placeOfPosting}
            onChange={(e) => setPlaceOfPosting(e.target.value)}
            placeholder="Place of Posting"
            className="border rounded px-3 py-1.5 md:col-span-2"
          />

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Candidate Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border rounded px-2 py-1 text-xs file:mr-2 file:py-0.5 file:px-2 file:border-0 file:rounded file:bg-blue-50 file:text-blue-700"
            />
          </div>
        </div>
      </div>

      {/* Standard PVC Card Container: 55mm x 85mm */}
      <div
        ref={cardRef}
        className="bg-white font-sans overflow-hidden flex flex-col justify-between"
        style={{ width: "55mm", height: "85mm", boxSizing: "border-box" }}
      >
        {/* --- Top Header Section --- */}
        <div className="flex flex-col items-center w-full">
          {/* Top Red Bar with Arch */}
          <div className="relative w-full overflow-hidden leading-none">
            <svg
              viewBox="0 0 100 14"
              className="w-full h-[7mm] fill-[#ED1C24] block"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 L 100,0 L 100,12 Q 50,3 0,12 Z" />
            </svg>
          </div>

          {/* White Space and Emblem */}
          <div className="relative w-full mb-1 bg-white flex flex-col items-center">
            <div className="w-[12mm] h-[13mm]">
              {/* Using native img with eager loading prevents iframe blank render */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/emblemBlack.png"
                alt="State Emblem of India"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <p className="text-[3px] font-serif -mt-px text-gray-900">
              सत्यमेव जयते
            </p>
          </div>

          {/* Main Red Title Bar */}
          <div className="w-full px-0.5 bg-[#ED1C24] rounded-lg flex items-center justify-center">
            <h1 className="font-bold font-serif text-white text-[14px] tracking-wide">
              Government of India
            </h1>
          </div>
        </div>

        {/* --- Middle Content Area --- */}
        <div className="flex flex-col items-center px-[2mm] flex-1">
          <div className="text-center my-[1mm] leading-tight select-none">
            <p className="font-serif font-bold text-[#1B4F9B] text-[9px] tracking-tight">
              National Informatics Centre
            </p>
            <p className="font-serif font-medium text-[#B91C1C] text-[8px] tracking-[0.2px] mt-[1px]">
              IDENTITY CARD NUMBER : {idNumber || "2012 / NIC / 81"}
            </p>
          </div>

          {/* Photo Box */}
          <div className="w-[18mm] h-[20mm] rounded overflow-hidden flex items-center justify-center bg-gray-50">
            {candidateImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={candidateImg}
                alt="Candidate"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[9px] text-gray-400 text-center px-1">
                Photo
              </span>
            )}
          </div>
        </div>

        {/* --- Footer Section (Flow-based, always visible on 1st print) --- */}
        <div className="w-full mt-auto font-serif">
          <div className="px-[1mm] py-0.5 bg-[#ED1C24] text-white flex flex-col items-center leading-tight">
            <p className="text-[10px] font-semibold">{name}</p>
            <p className="text-[9px] font-semibold">{designation}</p>
            <p className="text-[8px] font-semibold">
              Employee Code: {employeeCode}
            </p>
            <p className="text-[8px] font-semibold">
              Place of Posting: {placeOfPosting}
            </p>
          </div>

          <div className="w-full flex items-center justify-center px-5 pb-0.5 bg-[#2483C5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nic.png"
              alt="NIC logo"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handlePrint?.()}
          className="bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Print Card
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/nic/back")}
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Back Card
        </button>
      </div>
    </div>
  );
}
