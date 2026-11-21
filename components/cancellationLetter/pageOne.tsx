"use client";

import Image from "next/image";
import { useState } from "react";
import StampPicker from "@/components/StampPicker"; // adjust path if needed

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CancellationPage1({ data }: { data: any }) {
  const [stamp1, setStamp1] = useState<string | null>(null);
  const [stamp2, setStamp2] = useState<string | null>(null);
  const [pickerOpen1, setPickerOpen1] = useState(false);
  const [pickerOpen2, setPickerOpen2] = useState(false);
  
  return (
    <div className="min-h-screen flex justify-center">
      <div
        style={{
          width: "210mm",
          height: "297mm",
          background: "white",
          border: "1px solid black",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Image
            src="/indian-railway.png"
            alt="logo"
            width={350}
            height={350}
          />
        </div>

        <div className="flex items-center px-10 py-4">
          <div className="w-[80px]">
            <Image
              src="/golden-emblem.png"
              alt="emblem"
              width={60}
              height={80}
            />
          </div>

          <div className="flex-1 text-center">
            <p className="text-[14px] font-semibold">
              Govt. of India (Ministry of Railways)
            </p>

            <p className="text-[16px] font-bold">
              Railway Recruitment Board, {data.boardCity}
            </p>

            <p className="text-[12px]">{data.boardAddress}</p>

            <p className="text-[12px]">{data.boardContact}</p>
          </div>

          <div className="w-[100px] flex justify-end">
            <Image
              src="/indian-railway.png"
              alt="railway"
              width={80}
              height={80}
            />
          </div>
        </div>

        <hr className="border-black" />

        <p className="text-center font-bold text-[18px] mt-4">
          CANCELLATION OF APPOINTMENT
        </p>

        <div className="mx-20 mt-10 text-[12px] leading-[1.5]">
          <p>
            Letter No: <b>{data.letterNo}</b>
          </p>

          <p>
            Date: <b>{data.letterDate}</b>
          </p>

          <br />

          <p>
            To,
            <br />
            {data.candidateName}
            <br />
            {data.candidateSO}
          </p>

          <br />

          <p>
            <b>Subject:</b> Cancellation of appointment to the post of{" "}
            <b>{data.designation}</b>.
          </p>

          <br />

          <p>
            Reference is invited to your application bearing Application No.{" "}
            <b>{data.applicationNo}</b> submitted in response to the recruitment
            notification issued by the Railway Recruitment Board for the post of{" "}
            <b>{data.designation}</b> under <b>{data.division}</b>.
          </p>

          <br />

          <p>
            Based on the recommendation of the Railway Recruitment Board and the
            subsequent verification of documents submitted by you, an offer of
            appointment was issued for the post of <b>{data.designation}</b>.
            However, during the process of detailed verification of certificates
            and records submitted by you, certain discrepancies have been
            noticed.
          </p>

          <br />

          <p>
            After careful examination of the matter and verification of the
            records available with this office, it has been observed that the
            candidate does not fulfil the prescribed eligibility conditions as
            stipulated in the recruitment notification and the rules governing
            the appointment to the said post.
          </p>

          <br />

          <p>
            Accordingly, the competent authority has reviewed the case and it
            has been decided that the offer of appointment issued to you earlier
            for the post of <b>{data.designation}</b> cannot be sustained.
          </p>

          <br />

          <p>
            Therefore, the offer of appointment issued to you for the post of{" "}
            <b>{data.designation}</b> under <b>{data.division}</b> stands
            <b> cancelled with immediate effect</b>.
          </p>

          <br />

          <p>The cancellation has been made on the following grounds:</p>

          <br />

          <p className="font-semibold">{data.reason}</p>

          <br />

          <p>
            You are hereby informed that the Railway Administration shall not be
            responsible for any consequences arising out of the cancellation of
            the said appointment. Any claim or request for reconsideration in
            this regard will not be entertained unless supported by valid
            documentary evidence as per the recruitment rules.
          </p>

          <br />

          <p>
            This action has been taken in accordance with the applicable
            recruitment rules and administrative instructions issued by the
            Government of India from time to time.
          </p>

          <br />

          <p>
            This cancellation is issued with the approval of the competent
            authority after careful examination of all relevant records,
            documents, and declarations submitted by the candidate at the time
            of recruitment.
          </p>
        </div>

        <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] text-blue-900 text-center text-[12px]">
          <p>{data.footer}</p>
          <p>{data.footerHindi}</p>
        </div>

        <div className="mt-2 flex flex-col items-end absolute bottom-[20mm] left-[15mm] z-50">
          {stamp1 ? (
            // Click the stamp to change it (hover effect is not printed)
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={stamp1}
              alt="Stamp1"
              title="Click to change stamp 2"
              onClick={() => setPickerOpen1(true)}
              className="h-[160px] w-[160px] object-contain cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-400 print:outline-none"
            />
          ) : (
            // Upload button: only visible on screen, never in print
            <div
              className="print:hidden text-[12px] font-normal"
              data-html2canvas-ignore="true"
            >
              <button
                type="button"
                onClick={() => setPickerOpen1(true)}
                className="rounded border border-gray-400 px-3 py-1 hover:bg-gray-100"
              >
                Upload Stamp
              </button>
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-col items-end absolute top-[30mm] right-[90mm] z-50">
          {stamp2 ? (
            // Click the stamp to change it (hover effect is not printed)
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={stamp2}
              alt="Stamp2"
              title="Click to change stamp 2"
              onClick={() => setPickerOpen2(true)}
              className="h-[160px] w-[160px] object-contain cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-400 print:outline-none"
            />
          ) : (
            // Upload button: only visible on screen, never in print
            <div
              className="print:hidden text-[12px] font-normal"
              data-html2canvas-ignore="true"
            >
              <button
                type="button"
                onClick={() => setPickerOpen2(true)}
                className="rounded border border-gray-400 px-3 py-1 hover:bg-gray-100"
              >
                Upload Stamp
              </button>
            </div>
          )}
        </div>
      </div>
      <StampPicker
        open={pickerOpen1}
        onClose={() => setPickerOpen1(false)}
        onSelect={(_file, url) => setStamp1(url)}
      />
      <StampPicker
        open={pickerOpen2}
        onClose={() => setPickerOpen2(false)}
        onSelect={(_file, url) => setStamp2(url)}
      />
    </div>
  );
}
