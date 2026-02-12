import React, { useMemo } from "react";
import ServiceCard from "./ServiceCard";
import { getUpcomingServices } from "../lib/timeUtils";

interface Props {
  services: any[];
}

const dayNames: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function getTodayNameUK() {
  const day = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "Europe/London",
  })
    .format(new Date())
    .toLowerCase();

  return dayNames[day] ?? "Today";
}

export default function WhatsOnTodayClient({ services }: Props) {
  const todayName = useMemo(() => getTodayNameUK(), []);

  const upcomingServices = useMemo(() => getUpcomingServices(services, 3), [services]);

  const hasRunningNow = upcomingServices.some((s) => s.status === "running-now");
  const hasScheduledServices = upcomingServices.length > 0;

  return (
    <section
      className="py-16 bg-gradient-to-br from-teal-50 to-white px-4 sm:px-6 lg:px-8 border-y-2 border-teal-600"
      aria-labelledby="whats-on-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-teal-700 text-sm font-medium bg-teal-50 px-4 py-1.5 rounded-full border border-teal-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Today is {todayName}</span>
          </div>

          <h2 id="whats-on-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What's On
          </h2>

          {hasRunningNow ? (
            <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Drop in now or see what's coming up this week
            </p>
          ) : hasScheduledServices ? (
            <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              See what's happening today and this week
            </p>
          ) : (
            <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Free, friendly support for everyone in our community
            </p>
          )}
        </div>

        {hasScheduledServices ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {upcomingServices.map((item) => (
              <ServiceCard
                key={`${item.service._id}-${item.schedule.dayOfWeek}-${item.schedule.startTime}`}
                service={item.service}
                context={item.status}
                timeText={item.timeText}
                dayText={item.dayText}
              />
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {services.slice(0, 3).map((s: any) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm mb-10">
            <p className="text-slate-600 text-lg">Check back soon for our upcoming services and events.</p>
          </div>
        )}

        <div className="text-center">
          <a
            href="/services"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors inline-flex items-center min-h-[44px] text-lg shadow-sm"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}
