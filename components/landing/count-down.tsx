"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
  labels: {
    eyebrow: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

const initialTimeLeft = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeLeft(targetDate: string) {
  const diff = Math.max(new Date(targetDate).getTime() - Date.now(), 0);

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function Countdown({ targetDate, labels }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const items = [
    { value: pad(timeLeft.hours), label: labels.hours },
    { value: pad(timeLeft.minutes), label: labels.minutes },
    { value: pad(timeLeft.seconds), label: labels.seconds },
  ];

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {labels.eyebrow}
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
