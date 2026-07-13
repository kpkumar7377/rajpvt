"use client";

import Image from "next/image";

interface OfficeMemoData {
    railwayZone: string;
    group: string;
    footer: string;
    footerHindi: string;
}

export default function OfficeMemoPage3({ data }: { data: OfficeMemoData }) {
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

                <div className="m-5 mx-20 mt-20 text-[12px] leading-[1.55]">
                    <p className="font-bold underline mb-4">
                        Service Rules, Conduct & Declarations
                    </p>

                    <div className="leading-relaxed text-[12px] font-base">
                        <div className="flex items-start gap-2 mb-3">
                            <span>1.</span>
                            <p>
                                On appointment/joining, you will be required to take an oath of
                                allegiance to the Constitution of India.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>2.</span>
                            <p>
                                You will be governed by the {data.railwayZone} and Railway
                                Recruitment Board, New Delhi (Group {data.group}) Service Rules,
                                1997, as amended from time to time. In respect of pay, leave,
                                and other matters not expressly provided for in these rules, you
                                shall be governed by such regulations and rules as may be framed
                                and adopted by the competent authority under the Constitution of
                                India.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>3.</span>
                            <p>
                                You will be subject to the Government Employees Conduct Rules,
                                2016, and the Railway Servants (Discipline & Appeal) Rules,
                                2016, as amended from time to time. You will also be governed by
                                the Civil Services Rules and the relevant recruitment and
                                conditions of service applicable to your post.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>4.</span>
                            <p>
                                For all other matters not specified herein, you will be governed
                                by the rules, regulations, and instructions issued by the
                                Government from time to time.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>5.</span>
                            <p>
                                You will be governed by the New Pension Scheme as notified by
                                the Government from time to time.
                                <br />
                                If any information or declaration furnished by you in connection
                                with this appointment is found to be false or incorrect at any
                                time, you will be liable to dismissal from service and other
                                action as deemed fit under the law.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>6.</span>
                            <p>You must submit the following:</p>
                        </div>
                        <div className="flex items-start gap-2 mb-3 ml-5">
                            <span>(i)</span>
                            <p>
                                A written declaration that you have not been dismissed from
                                service by any department of the Government on any previous
                                occasion, that you have not been convicted by a court of law,
                                and that no criminal case is pending against you.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3 ml-5">
                            <span>(ii)</span>
                            <p>
                                If married, a declaration regarding non-acceptance or non-giving
                                of dowry. If unmarried, such declaration must be furnished
                                immediately after marriage, as per the prescribed format in the
                                relevant Government instructions.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>7.</span>
                            <p>
                                You will be liable to serve anywhere in India at the discretion
                                of the competent authority, and no request for a specific
                                posting or exemption from transfer will ordinarily be
                                entertained during the probation period.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>8.</span>
                            <p>
                                Restriction on political activity.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>9.</span>
                            <p>
                                Restriction on private trade/employment without sanction.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>10.</span>
                            <p>
                                Restriction on accepting gifts.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>11.</span>
                            <p>
                                Initial declaration of movable/immovable assets.
                            </p>
                        </div>
                        <div className="flex items-start gap-2 mb-3">
                            <span>12.</span>
                            <p>
                                Annual property return + property transaction intimation.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[8mm] left-[18mm] right-[18mm] text-center text-blue-900 font-medium text-[12px]">
                    <p>{data.footer}</p>
                    <p>{data.footerHindi}</p>
                </div>
            </div>
        </div>
    );
}