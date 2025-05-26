"use client";

import { useEffect } from "react";
import { ConfettiButton } from "@/components/magicui/confetti";
import { getCalApi } from "@calcom/embed-react";

interface CalendarConfettiButtonProps {
    className?: string;
}

const CalendarConfettiButton = ({ className }: CalendarConfettiButtonProps) => {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "15min" });
            cal("ui", { "hideEventTypeDetails": true, "layout": "month_view" });
        })();
    }, []);

    return (
        <>
            <ConfettiButton
                className={className}
                data-cal-link="sadik/15min"
                data-cal-config='{"layout":"month_view"}'
            >
                <span
                    className="size-2 rounded-full bg-emerald-500 animate-pulse"
                    aria-hidden="true"
                ></span>
                Book a call (15 min)
            </ConfettiButton>
        </>
    );
};

export default CalendarConfettiButton;