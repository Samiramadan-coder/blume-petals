"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string | Date;
};

function getTimeLeft(targetDate: string | Date) {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();

  const difference = Math.max(target - now, 0);

  return {
    hours: Math.floor(difference / (1000 * 60 * 60)),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const items = [
    { value: formatNumber(timeLeft.hours), label: "HOURS" },
    { value: formatNumber(timeLeft.minutes), label: "MINS" },
    { value: formatNumber(timeLeft.seconds), label: "SECS" },
  ];

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Ends In
      </p>

      <div className="flex items-start gap-3">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold text-white backdrop-blur-sm">
                {item.value}
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                {item.label}
              </span>
            </div>

            {index < items.length - 1 && (
              <div className="pt-4 text-3xl font-bold text-white/55">:</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
