import cx from "classnames";
import { format, isWithinInterval } from "date-fns";
import { useEffect, useState } from "react";

interface WeatherAtLocation {
  current_units: { temperature_2m: string };
  current: { time: string; temperature_2m: number };
  hourly_units: { temperature_2m: string };
  hourly: { time: string[]; temperature_2m: number[] };
  daily: { time: string[]; sunrise: string[]; sunset: string[] };
}

const SAMPLE: WeatherAtLocation = {
  current_units: { temperature_2m: "°C" },
  current: { time: "2024-10-07T19:30", temperature_2m: 29.3 },
  hourly_units: { temperature_2m: "°C" },
  hourly: {
    time: Array.from({ length: 24 }, (_, i) => `2024-10-07T${String(i).padStart(2, "0")}:00`),
    temperature_2m: [22, 21, 20, 19, 19, 18, 18, 19, 21, 24, 26, 28, 30, 31, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22],
  },
  daily: {
    time: ["2024-10-07"],
    sunrise: ["2024-10-07T07:15"],
    sunset: ["2024-10-07T19:00"],
  },
};

function n(num: number): number {
  return Math.ceil(num);
}

export function Weather({ weatherAtLocation = SAMPLE }: { weatherAtLocation?: WeatherAtLocation }) {
  const currentHigh = Math.max(...weatherAtLocation.hourly.temperature_2m.slice(0, 24));
  const currentLow = Math.min(...weatherAtLocation.hourly.temperature_2m.slice(0, 24));
  const isDay = isWithinInterval(new Date(weatherAtLocation.current.time), {
    start: new Date(weatherAtLocation.daily.sunrise[0]),
    end: new Date(weatherAtLocation.daily.sunset[0]),
  });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    h();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  const hoursToShow = isMobile ? 5 : 6;
  const currentIndex = weatherAtLocation.hourly.time.findIndex(
    (t) => new Date(t) >= new Date(weatherAtLocation.current.time)
  );
  const displayTimes = weatherAtLocation.hourly.time.slice(currentIndex, currentIndex + hoursToShow);
  const displayTemps = weatherAtLocation.hourly.temperature_2m.slice(currentIndex, currentIndex + hoursToShow);

  return (
    <div className={cx("flex flex-col gap-4 rounded-2xl p-4", isDay ? "bg-blue-400" : "bg-indigo-900")}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className={cx("size-10 rounded-full", isDay ? "bg-yellow-300" : "bg-indigo-100")} />
          <div className="text-4xl font-medium text-blue-50">
            {n(weatherAtLocation.current.temperature_2m)}{weatherAtLocation.current_units.temperature_2m}
          </div>
        </div>
        <div className="text-blue-50">{`H:${n(currentHigh)}° L:${n(currentLow)}°`}</div>
      </div>
      <div className="flex flex-row justify-between">
        {displayTimes.map((time, index) => (
          <div key={time} className="flex flex-col items-center gap-1">
            <div className="text-blue-100 text-xs">{format(new Date(time), "ha")}</div>
            <div className={cx("size-6 rounded-full", isDay ? "bg-yellow-300" : "bg-indigo-200")} />
            <div className="text-blue-50 text-sm">{n(displayTemps[index])}{weatherAtLocation.hourly_units.temperature_2m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
