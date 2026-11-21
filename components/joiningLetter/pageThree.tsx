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
  const [stamp1, setStamp1] = useState<string | null>(null);
  const [stamp2, setStamp2] = useState<string | null>(null);
  const [stamp3, setStamp3] = useState<string | null>(null);
  const [pickerOpen1, setPickerOpen1] = useState(false);
  const [pickerOpen2, setPickerOpen2] = useState(false);
  const [pickerOpen3, setPickerOpen3] = useState(false);

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

        <div className="mt-2 flex flex-col items-end absolute top-[60mm] right-[25mm] z-50">
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
        <div className="mt-2 flex flex-col items-end absolute top-[65mm] left-[75mm] z-50">
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
        <div className="mt-2 flex flex-col items-end absolute top-[110mm] -rotate-90 right-[-10mm] z-50">
          {stamp3 ? (
            // Click the stamp to change it (hover effect is not printed)
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={stamp3}
              alt="Stamp3"
              title="Click to change stamp 3"
              onClick={() => setPickerOpen3(true)}
              className="h-[200px] w-[200px] object-contain cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-400 print:outline-none"
            />
          ) : (
            // Upload button: only visible on screen, never in print
            <div
              className="print:hidden text-[12px] font-normal"
              data-html2canvas-ignore="true"
            >
              <button
                type="button"
                onClick={() => setPickerOpen3(true)}
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
      <StampPicker
        open={pickerOpen3}
        onClose={() => setPickerOpen3(false)}
        onSelect={(_file, url) => setStamp3(url)}
      />
    </div>
  );
}
