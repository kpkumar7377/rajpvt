"use client";

import { useState } from "react";
import StampPicker from "@/components/StampPicker";

interface PageThreeData {
  appointmentBoard: string;
  appointmentZone: string;
  appointmentDate: string;
  probationPeriod: string;
  signature: string;
  footer: string;
  footerHindi: string;
}

export default function OfficeMemoPage1({ data }: { data: PageThreeData }) {
  const [stamp1, setStamp1] = useState<string | null>(null);
  const [stamp2, setStamp2] = useState<string | null>(null);
  const [pickerOpen1, setPickerOpen1] = useState(false);
  const [pickerOpen2, setPickerOpen2] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div
        style={{
          width: "210mm",
          height: "297mm",
          padding: "12mm 15mm",
          background: "white",
          position: "relative",
          boxSizing: "border-box",
          border: "1px solid black",
        }}
      >
        <div className="text-[14px] leading-[1.6]">
          <p className="text-justify my-5">
            The date of appointment shall be effective from the date of joining,
            unless otherwise communicated in writing by the{" "}
            {data.appointmentBoard}. The {data.appointmentZone} will communicate
            details of appointment on or before
            <b> {data.appointmentDate}</b>.
            <br />
            <br />
            You will be on probation for a period of{" "}
            <b>{data.probationPeriod}</b> from the date of appointment. On
            completion of the probation period, your appointment may be
            confirmed at the discretion of the Railway Recruitment Board,
            Bhubaneswar, based on your performance and other applicable
            criteria. Unless confirmation is communicated in writing, the
            probation period shall be deemed to have been extended.
            <br />
            <br />
            You may be transferred to any other location, department, function,
            establishment, or branch of the Railway Recruitment Board,
            Bhubaneswar, or its associate/affiliate offices, in such capacity as
            deemed appropriate. In such cases, you shall be governed by the
            terms and conditions applicable to the new assignment, including
            compensation, working hours, holidays, leave, and service policies.
            <br />
            <br />A copy of this letter, duly signed by you, must be mandatorily
            submitted on the date of joining.
            <br />
            <br />
            <br />
            Candidate shortlisted for Selection does not confer any right to be
            treated as eligible in all aspects for Regards!!!
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <span></span>
          <div className="text-right">
            <i>
              <b>{data.signature}</b>
            </i>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="absolute bottom-[8mm] left-[18mm] right-[18mm] text-center text-blue-900 font-medium text-[12px]">
          <p>{data.footer}</p>
          <p>{data.footerHindi}</p>
        </div>

        <div className="mt-2 flex flex-col items-end absolute bottom-[120mm] left-[15mm] z-50">
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
        <div className="mt-2 flex flex-col items-end absolute bottom-[40mm] right-[30mm] z-50">
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
