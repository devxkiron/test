"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/data";
import { CheckmarkCircleIcon } from "@/components/icons";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";

export function BookingCalendarSection() {
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");
  const [booked, setBooked] = useState(false);
  const [email, setEmail] = useState("");

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:00 PM",
    "03:30 PM",
    "04:45 PM",
  ];

  const days = [
    { day: 20, active: false, label: "Thu" },
    { day: 21, active: false, label: "Fri" },
    { day: 22, active: false, label: "Sat" },
    { day: 23, active: false, label: "Sun" },
    { day: 24, active: true, label: "Mon" },
    { day: 25, active: true, label: "Tue" },
    { day: 26, active: true, label: "Wed" },
    { day: 27, active: true, label: "Thu" },
    { day: 28, active: true, label: "Fri" },
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBooked(true);
  };

  return (
    <section id="book" className="py-12 sm:py-20 bg-canvas border-t border-line pattern-dots">
      <Container>
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-4 font-heading">
              Book a <span className="font-accent inline-block -rotate-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-lime to-[#B8E000]">Free Strategy Call</span>
            </h2>
            <p className="text-base text-ink leading-relaxed">
              Pick a date and time to discuss your product architecture, roadmap, and scope directly with our lead engineer.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Dual-Pane Scheduler Interface */}
        <AnimateOnScroll direction="scale" delay={100}>
          <div className="skewElem max-w-4xl mx-auto r-lg overflow-hidden border-2 border-[#243B2E] shadow-2xl bg-canvas grid grid-cols-1 md:grid-cols-12">
            {/* Left Pane: Forest Green Calendar Picker */}
            <div className="md:col-span-6 bg-[#14221A] text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#243B2E] mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#D4FF00] text-black font-extrabold text-xs flex items-center justify-center font-heading">
                      G
                    </div>
                    <span className="font-bold text-sm text-white font-heading">Goodspeed Discovery</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D4FF00] bg-[#1A2B21] px-2 py-0.5 rounded border border-[#243B2E]">15 Min Call</span>
                </div>

                <div className="text-2xl font-extrabold text-white mb-1 font-heading">
                  August 2026
                </div>
                <p className="text-xs text-white/90 mb-6 font-medium">
                  Select an available date below:
                </p>

                {/* Day Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {days.map((d) => (
                    <button
                      key={d.day}
                      disabled={!d.active}
                      onClick={() => { setSelectedDay(d.day); setBooked(false); }}
                      className={`p-3 r text-center font-mono text-xs transition-all cursor-pointer ${
                        selectedDay === d.day
                          ? "bg-[#D4FF00] text-black font-extrabold shadow-md scale-105"
                          : d.active
                          ? "bg-[#1A2B21] text-white hover:bg-[#243B2E] border border-[#243B2E]"
                          : "opacity-30 cursor-not-allowed bg-transparent text-white/40"
                      }`}
                    >
                      <div className="text-[11px] uppercase font-bold text-white/90">{d.label}</div>
                      <div className="text-base font-extrabold mt-0.5">{d.day}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#243B2E] text-xs text-white/80 font-mono">
                Timezone: <span className="text-[#D4FF00] font-bold">UTC (London / Remote)</span>
              </div>
            </div>

            {/* Right Pane: Time Slots & Confirmation */}
            <div className="md:col-span-6 p-8 sm:p-10 bg-canvas flex flex-col justify-between">
              {booked ? (
                <div className="my-auto text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-lime flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckmarkCircleIcon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-ink mb-2 font-heading">Strategy Call Scheduled!</h3>
                  <p className="text-xs text-ink-muted leading-relaxed max-w-xs mx-auto mb-4 font-medium">
                    Confirmed for <span className="font-bold text-ink">Aug {selectedDay}, 2026 at {selectedTime}</span>. A Google Meet invitation has been sent to <span className="font-mono font-semibold text-ink">{email}</span>.
                  </p>
                  <button
                    onClick={() => setBooked(false)}
                    className="text-xs font-mono font-bold text-ink underline underline-offset-4 cursor-pointer"
                  >
                    Reschedule slot
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase font-extrabold text-ink">
                      Available Times for Aug {selectedDay}:
                    </span>
                    <span className="text-xs font-mono text-emerald-600 font-extrabold inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Slots
                    </span>
                  </div>

                  {/* Slots Grid */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 max-h-[220px] overflow-y-auto pr-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-2.5 r border text-xs font-mono font-extrabold transition-all text-center cursor-pointer ${
                          selectedTime === slot
                            ? "bg-ink text-canvas border-ink shadow-sm"
                            : "bg-canvas-alt dark:bg-canvas-subtle border-line hover:border-line-strong text-ink"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {/* Confirm Form */}
                  <form onSubmit={handleConfirm} className="space-y-3.5 pt-4 border-t border-line">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        Your Work Email
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="founder@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 r border border-line bg-canvas-alt dark:bg-canvas-subtle text-xs text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-ink font-medium"
                      />
                    </div>

                    <ZenSecondaryButton
                      type="submit"
                      className="w-full py-3 text-xs font-bold"
                    >
                      Confirm {selectedTime} Slot
                    </ZenSecondaryButton>
                  </form>
                </div>
              )}
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
