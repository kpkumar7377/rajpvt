"use client";

import React, { useState, useRef, useMemo } from "react";
import { Noto_Serif_Devanagari, Noto_Sans_Devanagari } from "next/font/google";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { useRouter } from "next/navigation";

const LONG_FIELD_THRESHOLD = 60;

const toLabel = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

type Section = { title: string; description: string; keys: string[] };

const groupKeys = (data: Record<string, string>): Section[] => {
  const keys = Object.keys(data);
  const isOther = (k: string) => /OtherLang/i.test(k);
  const isAddress = (k: string) =>
    /^(address|vtc|po|district|state|pinCode)/i.test(k) && !isOther(k);
  const isDate = (k: string) => /date/i.test(k);

  const other = keys.filter(isOther);
  const address = keys.filter(isAddress);
  const dates = keys.filter((k) => isDate(k) && !isOther(k) && !isAddress(k));
  const used = new Set([...other, ...address, ...dates]);
  const primary = keys.filter((k) => !used.has(k));

  return [
    {
      title: "Primary Details",
      description: "Name, IDs and contact",
      keys: primary,
    },
    { title: "Address", description: "English address fields", keys: address },
    { title: "Dates", description: "Issue and update dates", keys: dates },
    {
      title: "Regional Language Text",
      description: "Odia translations and info points",
      keys: other,
    },
  ].filter((s) => s.keys.length);
};

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "600"],
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["700", "800"],
  display: "swap",
});

export default function A4PrintPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefSign = useRef<HTMLInputElement>(null);
  // const inputRefHolo = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoSign, setPhotoSign] = useState<string | null>(null);
  // const [photoHolo, setPhotoHolo] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string | null>(null);

  const initial = {
    name: "Brijesh Kumar Singh",
    fatherName: "Manipal Singh",
    dob: "10/10/1992",
    gender: "MALE",
    acknowledgmentNumber: "89857851235",
    digitalSignDate: "2020.07.18",
    digitalSignTime: "18:12:39 IST",
    panNumber: "ABCPD1234E",
    address:
      "PLOT NO - 45, SUBUDHIPUR (KP NAGAR), WARD NO - 13, PATNA, SWERAGE TANK BASTI, Kpnagar, PO: KPnagar, DIST: Patna, Bihar - 801019",
  };
  const [data, setData] = useState<Record<string, string>>(initial);

  const updateField = (key: string, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const sections = useMemo(() => groupKeys(data), [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateQR = () => {
    const fakeData = `PAN: ${data.panNumber} | Name: ${data.name} | Dob: ${data.dob} | Gender: ${data.gender} | FatherName: ${data.fatherName} | Address: ${data.address} ${Math.floor(
      1000 +
        Math.random() *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          999999999 *
          8888888 *
          8888888 *
          8888888 *
          8888888 *
          8888888 *
          8888888 *
          8888888 *
          8888888 *
          8888888 *
          8888888 *
          99999999998888 *
          90000000000000,
    )} | Date: ${new Date().toISOString()}`;
    setQrValue(fakeData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setPhoto(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setPhotoSign(URL.createObjectURL(file));
    e.target.value = "";
  };

  // const handleHoloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file || !file.type.startsWith("image/")) return;
  //   setPhotoHolo(URL.createObjectURL(file));
  //   e.target.value = "";
  // };

  return (
    <div className="print-parent min-h-screen bg-neutral-100 p-8 flex flex-col items-center">
      <div className="no-print mb-6 flex flex-col items-center gap-4">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-sm transition cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition cursor-pointer"
          >
            Print Page
          </button>
          <button
            type="button"
            onClick={handleGenerateQR}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition cursor-pointer"
          >
            Generate QR
          </button>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6"
        >
          {sections.map((section) => {
            return (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <header className="border-b border-slate-100 px-5 py-4">
                  <h2 className="text-sm font-bold text-slate-800">
                    {section.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {section.description}
                  </p>
                </header>

                <div className="grid grid-cols-1 gap-x-5 gap-y-4 p-5 md:grid-cols-2">
                  {section.keys.map((key) => {
                    const value = String(data[key] ?? "");
                    const isLong = value.length > LONG_FIELD_THRESHOLD;
                    const fieldClass =
                      "w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 " +
                      "outline-none transition placeholder:text-slate-400 " +
                      "focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 " +
                      "font-['Noto_Sans_Oriya',system-ui,sans-serif]";

                    return (
                      <div
                        key={key}
                        className={`flex flex-col gap-1.5 ${isLong ? "md:col-span-2" : ""}`}
                      >
                        <label
                          htmlFor={key}
                          className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                        >
                          {toLabel(key)}
                        </label>

                        {isLong ? (
                          <textarea
                            id={key}
                            value={value}
                            rows={3}
                            onChange={(e) => updateField(key, e.target.value)}
                            className={`${fieldClass} resize-y`}
                          />
                        ) : (
                          <input
                            id={key}
                            type="text"
                            value={value}
                            onChange={(e) => updateField(key, e.target.value)}
                            className={fieldClass}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </form>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <input
        ref={inputRefSign}
        type="file"
        accept="image/*"
        onChange={handleSignChange}
        className="hidden"
      />

      {/* <input
        ref={inputRefHolo}
        type="file"
        accept="image/*"
        onChange={handleHoloChange}
        className="hidden"
      /> */}

      {/* A4 Container */}
      <div
        id="printable-area"
        className="a4-page bg-white flex items-center justify-center box-border"
      >
        <div className="flex flex-col items-center border-2 border-black a4-page-main">
          <div className="w-full flex items-center justify-center h-auto relative">
            <img src="/pantop.png" alt="Pantop" className="w-full h-full" />
            {/* Container positioned at top-56 left-60 */}
            <div className="absolute w-2/3 top-56  left-60 flex items-center justify-between gap-2">
              <p className="font-semibold text-[14px] text-neutral-900 leading-none">
                {data.acknowledgmentNumber}
              </p>

              {/* Auto-generated Barcode */}
              <div className="flex items-center">
                {data.acknowledgmentNumber.length > 0 && (
                  <Barcode
                    value={data.acknowledgmentNumber}
                    format="CODE128"
                    height={22} // Compact height to fit inside the ID card
                    width={1} // Bar width
                    displayValue={false} // Hidden since the number is already rendered in the <p> tag
                    margin={0}
                    background="transparent"
                  />
                )}
              </div>
            </div>
            <div className="absolute top-34 w-full flex flex-col items-center justify-center select-none text-center">
              <p
                className={`${notoSansDevanagari.className} text-[15px] leading-tight font-bold tracking-tight text-[#0f233a]`}
              >
                स्थायी लेखा संख्या कार्ड
              </p>

              <p
                className="font-sans font-extrabold text-[16px] leading-tight tracking-tight text-[#004b87] mt-0.5"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Permanent Account Number Card
              </p>

              <p className="font-sans font-bold text-[14px] tracking-wider text-black mt-1">
                {data.panNumber}
              </p>
            </div>
            <p className="absolute top-68 left-60 font-semibold text-[14px] text-neutral-900">
              {data.name}
            </p>
            <p className="absolute top-80 left-60 font-semibold text-[14px] text-neutral-900">
              {data.fatherName}
            </p>
            <p className="absolute top-92 left-60 font-semibold text-[14px] text-neutral-900">
              {data.dob}
            </p>
            <p className="absolute top-104 left-60 font-semibold text-[14px] text-neutral-900">
              {data.gender}
            </p>
            <div className="absolute h-12 w-2/3 top-114 left-60 font-semibold text-[14px] text-neutral-900">
              {data.address}
            </div>

            <button
              type="button"
              onClick={() => inputRefSign.current?.click()}
              aria-label={
                photoSign ? "Change signature photo" : "Upload signature photo"
              }
              className="absolute left-67 bottom-15 w-[30mm] h-[10mm] flex flex-col items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer"
            >
              {photoSign ? (
                <img
                  src={photoSign}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <span className="text-[4px] text-slate-500 font-bold mt-0.5">
                    Signature
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-label={
                photo ? "Change profile photo" : "Upload profile photo"
              }
              className="absolute left-10.5 bottom-1 w-[33mm] h-[32mm] border border-slate-400 rounded-xs flex flex-col items-center justify-center bg-slate-100 flex-shrink-0 overflow-hidden cursor-pointer"
            >
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <span className="text-[4px] text-slate-500 font-bold mt-0.5">
                    PHOTO
                  </span>
                </>
              )}
            </button>

            <div className="absolute right-50 bottom-2 w-[30mm] h-[30mm] ml-1 mt-10 p-2 border border-slate-400 flex flex-col items-center justify-center bg-slate-100 shrink-0 overflow-hidden box-border">
              {qrValue ? (
                <div className="w-full h-full flex items-center justify-center">
                  <QRCodeSVG
                    value={qrValue}
                    size={55}
                    level="M"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <span className="text-[4px] text-slate-500 font-bold tracking-tight">
                  NO QR
                </span>
              )}
            </div>
            <div className="absolute right-5.5 bottom-8 p-2 flex flex-col items-center justify-center shrink-0 overflow-hidden box-border">
              <div className="relative inline-block select-none overflow-visible">
                <img
                  className="absolute ml-10 w-15"
                  src="/checkmark.png"
                  alt="Checkmark"
                />

                <div
                  className="relative z-10 text-left text-neutral-900 leading-[1.1]"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  <p className="text-[11.5px] font-normal">
                    Digitally signed by DS
                  </p>
                  <p className="text-[11.5px] font-semibold tracking-tight">
                    INCOME TAX DEPT 2
                  </p>
                  <p className="text-[11.5px] font-normal mt-0.5">
                    Date: {data.digitalSignDate}
                  </p>
                  <p className="text-[11.5px] font-normal">
                    {data.digitalSignTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 p-1 w-full">
            <ul className="space-y-1 list-none">
              {/* Item 1 */}
              <li className="flex items-start gap-2">
                <span className="select-none font-serif text-base leading-tight mt-0.5">
                  ✓
                </span>
                <div className="flex-1">
                  <p className="font-tnr tracking-tighter text-[13.5px] leading-[1.3] text-black">
                    Permanent Account Number (PAN) facilitate iscanse Tax
                    Department linking of various documents, including payment
                    of taxes, assessment, tax demand, itx arrears, matching of
                    information and easy maintenance &amp; retrieval of
                    electronic information etc. relating to a taxpayer.
                  </p>
                  <p
                    className={`${notoSerifDevanagari.className} tracking-tight text-[12.5px] leading-[1.3] text-black mt-0.5`}
                  >
                    स्थायी लेखा संख्या (पैन) एक करदाता से संबंधित विभिन्न
                    दस्तावेजों को जोड़ने में आयकर विभाग को सहायक होता है, जिसमें
                    करों के भुगतान, निर्धारण, कर मांग, टैक्स बकाया, सूचना के
                    मिलान और इलेक्ट्रॉनिक जानकारी का आसान रखरखाव व बहाली आदि भी
                    शामिल है।
                  </p>
                </div>
              </li>

              {/* Item 2 */}
              <li className="flex items-start gap-2">
                <span className="select-none font-serif text-base leading-tight mt-0.5">
                  ✓
                </span>
                <div className="flex-1">
                  <p className="font-tnr tracking-tighter text-[13.5px] leading-[1.3] text-black">
                    Quoting of PAN is now mandatory for several transactions
                    specified under income Tax Act, 1961 (Refer Rule 114B of
                    Income Tax Rules, 1962)
                  </p>
                  <p
                    className={`${notoSerifDevanagari.className} tracking-tight text-[12.5px] leading-[1.3] text-black mt-0.5`}
                  >
                    आयकर अधिनियम, 1961 के तहत निर्दिष्ट कई लेनदेन के लिए स्थायी
                    लेखा संख्या (पैन) का उल्लेख अब अनिवार्य है। (आयकर नियम, 1962
                    के नियम 114B, का संदर्भ लें)
                  </p>
                </div>
              </li>

              {/* Item 3 */}
              <li className="flex items-start gap-2">
                <span className="select-none font-serif text-base leading-tight mt-0.5">
                  ✓
                </span>
                <div className="flex-1">
                  <p className="font-tnr tracking-tighter text-[13.5px] leading-[1.3] text-black">
                    Possessing or using more than one PAN is against the law
                    &amp; may attract penalty of upto Rs. 10,000.
                  </p>
                  <p
                    className={`${notoSerifDevanagari.className} tracking-tight text-[12.5px] leading-[1.3] text-black mt-0.5`}
                  >
                    एक से अधिक स्थायी लेखा संख्या (पैन) का रखना या उपयोग करना,
                    कानून के विरुद्ध है और इसके लिए 10,000 रुपये तक का दंड लगाया
                    जा सकता है।
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="w-full flex items-center">
            <div className="flex-grow border-b-2 border-dotted border-neutral-500" />
            <span className="px-2 text-xs font-serif tracking-widest text-neutral-600 select-none flex items-center gap-1">
              Cut
            </span>
            <div className="flex-grow border-b-2 border-dotted border-neutral-500" />
          </div>

          <div className="w-full flex-1 flex items-center justify-center py-1">
            <div className="flex items-stretch justify-center">
              <div className="border-t border-b border-l border-r-0 border-dotted border-black p-2.5 bg-white inline-block">
                <div
                  className="relative card-size border border-neutral-300 rounded-[3.18mm] p-2 flex flex-col justify-between overflow-hidden box-border bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/panfrontN.png')" }}
                >
                  <div className="absolute right-1 bottom-5 w-[26mm] h-[26mm] ml-1 mt-10 border border-slate-400 flex flex-col items-center justify-center bg-slate-100 flex-shrink-0 overflow-hidden p-1 box-border">
                    {qrValue ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <QRCodeSVG
                          value={qrValue}
                          size={55}
                          level="M"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-[4px] text-slate-500 font-bold tracking-tight">
                        NO QR
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    aria-label={
                      photo ? "Change profile photo" : "Upload profile photo"
                    }
                    className="w-[15mm] h-[15mm] ml-1 mt-10 border border-slate-400 rounded-xs flex flex-col items-center justify-center bg-slate-100 flex-shrink-0 overflow-hidden cursor-pointer"
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <span className="text-[4px] text-slate-500 font-bold mt-0.5">
                          PHOTO
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => inputRefSign.current?.click()}
                    aria-label={
                      photoSign
                        ? "Change signature photo"
                        : "Upload signature photo"
                    }
                    className="absolute right-26 bottom-5 w-[24mm] h-[5.5mm] ml-1 mt-10 flex flex-col items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer"
                  >
                    {photoSign ? (
                      <img
                        src={photoSign}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <span className="text-[4px] text-slate-500 font-bold mt-0.5">
                          Signature
                        </span>
                      </>
                    )}
                  </button>

                  <p className="absolute bottom-20 left-2.75 font-bold text-[9px] text-neutral-900">
                    {data.name}
                  </p>
                  <p className="absolute bottom-12.75 left-2.75 font-bold text-[9px] text-neutral-900">
                    {data.fatherName}
                  </p>
                  <p className="absolute bottom-5 left-2.75 font-bold text-[9px] text-neutral-900">
                    {data.dob}
                  </p>
                  <p className="absolute top-21 left-34 font-bold text-[11px] text-neutral-900">
                    {data.panNumber}
                  </p>
                </div>
              </div>

              {/* Shared Vertical Dotted Cut Separator */}
              <div className="flex flex-col items-center justify-center select-none w-0 relative z-10">
                {/* Top dotted line segment */}
                <div className="flex-1 w-0 border-r border-dotted border-black" />

                {/* Vertical CUT label badge */}
                <div className="bg-white py-1 flex flex-col items-center justify-center text-neutral-700">
                  <span className="vertical-cut-label font-mono text-[9px] font-bold tracking-widest uppercase">
                    CUT
                  </span>
                </div>

                {/* Bottom dotted line segment */}
                <div className="flex-1 w-0 border-r border-dotted border-black" />
              </div>

              {/* Outer Container 2 (Border dotted, NO left border) */}
              <div className="border-t border-b border-r border-l-0 border-dotted border-black p-2.5 bg-white inline-block">
                {/* Inner Card Container 2 with Background Image */}
                <div
                  className="card-size border border-neutral-300 rounded-[3.18mm] p-3 flex flex-col justify-center overflow-hidden relative box-border bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/panback.jpg')" }}
                >
                  <div className="w-full flex justify-end -mb-1">
                    <img
                      src="/hologramPan.jpeg"
                      alt="hologram"
                      className="w-[18mm] h-auto rounded-sm mr-1.5"
                    />

                    {/* <button
                      type="button"
                      onClick={() => inputRefHolo.current?.click()}
                      aria-label={
                        photoHolo ? "Change hologram" : "Upload hologram"
                      }
                      className="w-[18mm] h-[18mm] mr-1.5 border border-slate-400 rounded-xs flex flex-col items-center justify-center bg-slate-100 flex-shrink-0 overflow-hidden cursor-pointer"
                    >
                      {photoHolo ? (
                        <img
                          src={photoHolo}
                          alt="Hologram"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          <span className="text-[4px] text-slate-500 font-bold mt-0.5">
                            PHOTO
                          </span>
                        </>
                      )}
                    </button> */}
                  </div>
                  <p className="italic font-bold text-[8.5px] tracking-tight">
                    In case this card is lost / found, kindly inform / return to
                    :
                  </p>
                  <div className="w-full text-black select-none text-left flex items-end justify-between gap-1.5">
                    <div className="flex-1">
                      <div className="font-tnr text-neutral-900 leading-[1.15]">
                        <p className="font-bold text-[9.5px] tracking-tight mt-0.5">
                          Income Tax PAN Services Unit, UTIITSL
                        </p>
                        <p className="font-bold text-[9.2px] tracking-tight">
                          Plot No. 3, Sector 11, CBD Belapur,
                        </p>
                        <p className="font-bold text-[9.2px] tracking-tight">
                          Navi Mumbai - 400 614.
                        </p>
                        <p className="font-bold text-[9.5px] tracking-tight mt-0.5">
                          Helpline Number : 033-40802999
                        </p>
                      </div>

                      <div
                        className={`${notoSerifDevanagari.className} text-neutral-900 leading-[1.2] mt-1 font-bold`}
                      >
                        <p className="text-[9.2px] tracking-tight">
                          इस कार्ड के खोने/पाने पर कृपया सूचित करें/लौटाएं :
                        </p>
                        <p className="text-[9.5px] tracking-tight">
                          आयकर पैन सेवा यूनीट, UTIITSL
                        </p>
                        <p className="text-[9.2px] tracking-tight">
                          प्लाट नं: ३, सेक्टर ११ , सी.बी.डी.बेलापूर,
                        </p>
                        <p className="text-[9.2px] tracking-tight">
                          नवी मुंबई-४०० ६१४.
                        </p>
                        <p className="text-[9.5px] tracking-tight mt-0.5">
                          हेल्पलाइन नंबर : 033-40802999
                        </p>
                      </div>
                    </div>

                    <div className="w-[33mm] border border-neutral-900 rounded-md p-1 flex flex-col items-center justify-center text-center self-end mb-0.5 bg-transparent">
                      <p className="font-sans font-bold text-[9.5px] leading-tight text-neutral-900">
                        For Income Tax Related
                      </p>
                      <p className="font-sans font-bold text-[8.5px] leading-tight text-neutral-900 mb-1">
                        Queries
                      </p>

                      <div className="w-[85%] border-b border-neutral-900 mb-1" />

                      <p className="font-sans font-bold text-[8.5px] leading-tight text-neutral-900">
                        E-Mail :
                      </p>
                      <p className="font-sans font-medium text-[8.5px] leading-tight text-neutral-900 tracking-tighter mt-0.5">
                        pangrievance@incometax.gov.in
                      </p>
                      <p className="font-sans font-medium text-[8.5px] leading-tight text-neutral-900 tracking-tighter">
                        ito.systems1.1@incometax.gov.in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Scoped font class for Times New Roman English lines */
        .font-tnr {
          font-family: "Times New Roman", Times, Georgia, serif;
          font-stretch: condensed;
          text-rendering: geometricPrecision;
          -webkit-font-smoothing: antialiased;
        }

        /* Fixed Standard Card Size: 85.60mm x 56mm */
        .card-size {
          width: 85.6mm;
          height: 56mm;
          min-width: 85.6mm;
          min-height: 56mm;
          max-width: 85.6mm;
          max-height: 56mm;
        }

        /* Vertical CUT typography */
        .vertical-cut-label {
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: 2px;
        }

        /* Screen View: Real-world A4 proportions */
        .a4-page {
          width: 210mm;
          min-height: 297mm;
        }

        .a4-page-main {
          width: calc(210mm - 20px);
          min-height: calc(297mm - 20px);
        }

        /* Print Settings Fix */
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm !important;
          }

          html,
          body {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Neutralize the screen parent container */
          .print-parent {
            padding: 0 !important;
            margin: 0 !important;
            min-height: 297mm !important;
            height: 297mm !important;
            width: 210mm !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: transparent !important;
          }

          /* Hide UI elements */
          .no-print {
            display: none !important;
          }

          /* Lock A4 page to 1 exact sheet and prevent spill */
          .a4-page {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
          }

          /* Retain crisp borders on paper */
          .a4-page-main {
            width: calc(210mm - 20px) !important;
            height: calc(297mm - 20px) !important;
            max-height: calc(297mm - 20px) !important;
            box-sizing: border-box !important;
            border: 2px solid black !important;
          }
        }
      `}</style>
    </div>
  );
}
