"use client";

import { useState } from "react";
import Image from "next/image";
import StampPicker from "@/components/StampPicker"; // adjust path if needed

interface OfficeMemoData {
  candidateImg: string;
  personnelName: string;
  personnelBranch: string;
  trainingZone: string;
  division: string;
  personnelBranchNo: string;
  personnelDate: string;
  personnelZone: string;
  footer: string;
  footerHindi: string;
}

export default function OfficeMemoPage3({ data }: { data: OfficeMemoData }) {
  const [stamp, setStamp] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/indian-railway.png"
            alt="Indian Railways Watermark"
            width={360}
            height={360}
            className="opacity-[0.08]"
          />
        </div>

        <div className="m-5 mt-20 mx-20 text-[12px] leading-[1.55]">
          <div className="ml-5 leading-relaxed font-base">
            <div className="flex items-start gap-2 mb-1">
              <span>7.</span>
              <p>
                You shall furnish to this office, along with your joining
                report, a declaration duly attested by a Gazetted Officer or a
                Magistrate to the effect that you have only one living spouse
                and that you are not married to a person having a living husband
                or wife.
                <br />
                You are liable to be transferred anywhere within the{" "}
                {data.division?.toLocaleLowerCase()} as per administrative
                requirements.
              </p>
            </div>
          </div>
          <p className="text-center my-5 font-bold">
            This has the approval of the competent authority.
          </p>

          <div className="flex justify-between items-start">
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

              {/* Stamp area, below "Northern Railway" */}
              <div className="mt-2 flex flex-col items-end absolute bottom-[140mm] right-[15mm]">
                {stamp ? (
                  // Click the stamp to change it (hover effect is not printed)
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={stamp}
                    alt="Stamp"
                    title="Click to change stamp"
                    onClick={() => setPickerOpen(true)}
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
                      onClick={() => setPickerOpen(true)}
                      className="rounded border border-gray-400 px-3 py-1 hover:bg-gray-100"
                    >
                      Upload Stamp
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="m-5 text-[13px] leading-[1.55]">
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

        <div className="absolute bottom-[8mm] left-[18mm] right-[18mm] text-center text-blue-900 font-medium text-[12px]">
          <p>{data.footer}</p>
          <p>{data.footerHindi}</p>
        </div>
      </div>

      {/* Popup: opened by the Upload button or by clicking the stamp */}
      <StampPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(_file, url) => setStamp(url)}
      />
    </div>
  );
}