"use client";

import Image from "next/image";
import StampPicker from "@/components/StampPicker"; // adjust path if needed
import { useState } from "react";

interface CancellationData {
  candidateImg: string;

  personnelName: string;
  personnelBranch: string;
  personnelZone: string;
  personnelBranchNo: string;
  personnelDate: string;

  trainingZone: string;

  footer: string;
  footerHindi: string;
}

export default function CancellationPage2({
  data,
}: {
  data: CancellationData;
}) {
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
          background: "white",
          position: "relative",
          boxSizing: "border-box",
          border: "1px solid black",
        }}
      >
        {/* WATERMARK */}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/indian-railway.png"
            alt="Indian Railways Watermark"
            width={360}
            height={360}
            className="opacity-[0.08]"
          />
        </div>

        <div className="m-5 mt-20 mx-20 text-[12px] leading-[1.5]">
          <p>
            The Railway Administration reserves the right to cancel any
            appointment at any stage of the recruitment process if it is found
            that the candidate does not fulfil the eligibility criteria or if
            any information furnished by the candidate is found to be false,
            incorrect, or misleading.
          </p>

          <br />

          <p>
            In the present case, upon verification of the records and
            certificates submitted by the candidate, it has been observed that
            the candidate is not eligible for appointment to the said post as
            per the conditions laid down in the recruitment notification and the
            applicable service rules.
          </p>

          <br />

          <p>
            Accordingly, the offer of appointment issued earlier stands
            cancelled and the candidate shall have no claim whatsoever for
            appointment to the said post in the Railway Administration.
          </p>

          <br />

          <p>
            The candidate is hereby advised to treat the appointment letter
            issued earlier as null and void with immediate effect. Any attempt
            to claim appointment based on the cancelled offer will not be
            entertained by the administration.
          </p>

          <br />

          <p>
            The Railway Administration shall not be responsible for any
            expenditure or inconvenience caused to the candidate due to the
            cancellation of the appointment.
          </p>

          <br />

          <p>
            This order is issued in accordance with the rules and instructions
            governing recruitment and service conditions in the Indian Railways
            and with the approval of the competent authority.
          </p>

          <br />

          <p>
            The candidate may contact the concerned office only if any
            documentary clarification is required with regard to this
            cancellation order.
          </p>

          <p className="text-center my-5 font-bold">
            This has the approval of the competent authority.
          </p>

          <div className="flex justify-between items-start mt-10">
            <div />

            <div className="relative flex flex-col items-center">
              {data.candidateImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.candidateImg}
                  alt="Candidate Signature"
                  className="h-[120px] w-[100px] object-contain"
                />
              ) : (
                <div className="h-[120px] w-[100px] border" />
              )}

              <p className="text-[11px] mt-1 text-center leading-tight">
                Signature of the Candidate <br />
                <span className="italic text-gray-600">
                  (Signature should start inside the box and extend outside)
                </span>
              </p>
            </div>

            <div className="flex flex-col items-end mt-20 text-[14px] font-semibold">
              <p>{data.personnelName}</p>
              <p>Asst. Personnel Officer (T)/{data.personnelBranch}</p>
              <p>(for Divisional Personnel Officer/{data.personnelBranch})</p>
              <p>{data.trainingZone}</p>
            </div>
          </div>

          <div className="m-5 text-[13px] leading-[1.6]">
            <p>
              Divisional Office <br />
              Personnel Branch/{data.personnelBranch} <br />
              No. {data.personnelBranchNo} &nbsp;&nbsp; Date:{" "}
              {data.personnelDate}
            </p>

            <p className="my-2.5">
              A copy is forwarded to the following for information and necessary
              action:
            </p>

            <p>
              Sr. DCM/{data.personnelBranch}; Sr. DFM/{data.personnelBranch};
              DCM/{data.personnelBranch} <br />
              The Principal, Divisional Traffic Training School (DTTS) <br />
              Ch. OS/Commercial Branch; Ch. OS/Traffic Bills <br />
              Confidential Section; O.O. File; Candidate
            </p>

            <p className="my-2.5">
              Ch. OS/Pass Section: to issue the necessary duty pass to the
              candidate.
            </p>

            <p>
              Divisional Secretary/{data.personnelBranch} – {data.personnelZone}
            </p>
          </div>
        </div>

        <div className="absolute bottom-[8mm] left-[18mm] text-blue-900 right-[18mm] text-center text-blue-900 font-medium text-[12px]">
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
        <div className="mt-2 flex flex-col items-end absolute bottom-[105mm] right-[20mm] z-50">
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
