"use client";

import Image from "next/image";

interface OfficeMemoData {
    designation: string;
    placeOfJoining: string;
    dutyStartDate: string;
    payScale: string;
    footer: string;
    footerHindi: string;
}

export default function OfficeMemoPage2({ data }: { data: OfficeMemoData }) {
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
                    <p className="font-bold underline mb-4">Terms & Conditions of Appointment</p>

                    <div className="leading-relaxed text-[12px] font-base">
                        <p>
                            He is directed to report for duty as {data.designation} at{" "}
                            {data.placeOfJoining} on {data.dutyStartDate}. He will be eligible
                            for the salary admissible under the pay scale of {data.payScale}
                            under the rules in force, with effect from the date of joining.
                            <br />
                            <br />
                            He will be on probation for a period of two years from the date
                            of joining against the working post. He must satisfactorily
                            complete any departmental training or examination prescribed for
                            confirmation in the post. In the event of failure, he may be
                            given a second chance as per the applicable rules. If he fails
                            again, he will be governed by the conditions stipulated in the
                            Offer of Appointment.
                            <br />
                            <br />
                            He will be responsible for Government money, stores, and any other
                            property entrusted to him in the discharge of official duties. No
                            change of category will be permitted for a minimum period of three
                            years unless he is declared medically unsuitable for the category.
                            <br />
                            <br />
                            His service will be terminable by one month’s notice on either
                            side or by payment of one month’s salary, including allowances, in
                            lieu of the notice (except in cases of removal or dismissal for
                            misconduct). It will, however, be open to the Government to
                            recover from him the salary for the period by which the notice
                            falls short of one month. Similarly, if he wishes to resign, he
                            may do so by depositing salary in lieu of notice for the period of
                            shortfall. Such notice of resignation should be addressed to the
                            competent authority.
                            <br />
                            <br />
                            In cases of misconduct, he will be entitled to a reasonable
                            opportunity to show cause why his services should not be
                            terminated. In such cases, the condition of one month’s notice
                            will not apply. This provision will also not apply if the services
                            are dispensed with during the probation period.
                            <br />
                            <br />
                            During the period of probation, his work and conduct will be
                            closely watched and if found unsatisfactory, his services are
                            liable to be terminated without assigning any reason, without
                            notice and without any compensation in lieu thereof.
                        </p>
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