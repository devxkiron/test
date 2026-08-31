"use client";

import { useEffect, useRef, useState } from "react";
import { 
  CloseIcon, 
  ArrowRightIcon, 
  CheckmarkCircleIcon, 
  CalendarIcon, 
  MailIcon, 
  UserIcon, 
  BuildingIcon, 
  ArrowDownIcon 
} from "@/components/icons";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

const painPoints = [
  "Manual data entry & repetitive CSV exports",
  "Disconnected SaaS tools with no automated sync",
  "Slow or unmaintained client web applications",
  "Absence of automated onboarding or billing pipelines",
  "Manual reporting & ad-hoc spreadsheet reconciliation",
  "Excessive operational headcount costs",
];

export function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setLoading(false);
        setSubmitted(false);
        setSelected([]);
        setForm({ name: "", email: "", company: "", size: "", message: "" });
      }, 300);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const togglePain = (point: string) => {
    setSelected((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div
        className={cn(
          "relative w-full max-w-xl rounded-xs border border-line bg-canvas shadow-xs overflow-hidden",
          "transition-all duration-300"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-line bg-canvas-alt/40">
          <div>
            <Badge variant="accent" dot pulse className="mb-2">
              Free Technical Architecture Audit
            </Badge>
            <h2 className="text-lg font-bold text-ink">
              {submitted ? "Audit Request Received" : step === 1 ? "Where is friction slowing you down?" : step === 2 ? "Your Organization Details" : "Pick Your Review Slot"}
            </h2>
            <p className="mt-1 text-xs text-ink-muted leading-relaxed">
              {submitted
                ? "We review your submission and reply with a prioritized roadmap within 4 hours."
                : "A senior engineer will review your workflow and identify top 3 high-ROI automation targets."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-0.5 rounded-md p-1.5 text-ink-muted hover:text-ink hover:bg-canvas-alt transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg border border-success/30 text-success">
                <CheckmarkCircleIcon size={28} />
              </div>
              <div>
                <p className="font-bold text-ink">Architecture Intake Complete</p>
                <p className="mt-1 text-xs text-ink-muted">
                  Confirmation sent to <span className="font-mono text-ink font-semibold">{form.email}</span>
                </p>
              </div>
              <div className="w-full rounded-xs border border-line bg-canvas-alt p-4 text-left text-xs text-ink-muted space-y-2">
                <p className="font-mono font-bold text-ink uppercase text-[10px]">Next Steps:</p>
                <p>1. Direct review by Frontend, Backend & Automation principals.</p>
                <p>2. Customized implementation & ROI roadmap.</p>
                <p>3. 30-minute technical walkthrough call.</p>
              </div>
              <Button variant="outline" size="sm" onClick={onClose} className="mt-2 w-full">
                Close Window
              </Button>
            </div>
          ) : step === 1 ? (
            <div className="space-y-3">
              <p className="text-xs font-mono text-ink-muted uppercase">Select all friction points that apply:</p>
              <div className="grid grid-cols-1 gap-2">
                {painPoints.map((point) => (
                  <button
                    key={point}
                    onClick={() => togglePain(point)}
                    className={cn(
                      "flex items-center gap-3 rounded-xs border px-3.5 py-2.5 text-xs text-left transition-all duration-150 cursor-pointer",
                      selected.includes(point)
                        ? "border-accent bg-accent-bg text-ink font-medium"
                        : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
                    )}
                  >
                    <span className={cn(
                      "flex h-4 w-4 shrink-0 rounded-xs border transition-colors items-center justify-center text-[10px]",
                      selected.includes(point)
                        ? "border-accent bg-accent text-white"
                        : "border-line"
                    )}>
                      {selected.includes(point) && <CheckmarkCircleIcon size={12} />}
                    </span>
                    <span>{point}</span>
                  </button>
                ))}
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => setStep(2)}
                disabled={selected.length === 0}
              >
                Proceed to Details <ArrowRightIcon size={14} className="ml-1" />
              </Button>
            </div>
          ) : step === 2 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-ink mb-1">Your Name</label>
                  <div className="relative">
                    <UserIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-ghost" />
                    <input
                      required
                      type="text"
                      placeholder="Alex Chen"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xs border border-line bg-canvas-alt pl-8 pr-3 py-2 text-xs text-ink placeholder:text-ink-ghost focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-ink mb-1">Work Email</label>
                  <div className="relative">
                    <MailIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-ghost" />
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xs border border-line bg-canvas-alt pl-8 pr-3 py-2 text-xs text-ink placeholder:text-ink-ghost focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block font-medium text-ink mb-1">Company / Organization</label>
                <div className="relative">
                  <BuildingIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-ghost" />
                  <input
                    required
                    type="text"
                    placeholder="Acme Logistics Inc."
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-xs border border-line bg-canvas-alt pl-8 pr-3 py-2 text-xs text-ink placeholder:text-ink-ghost focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-ink mb-1">Team Size</label>
                <div className="relative">
                  <select
                    required
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full appearance-none rounded-xs border border-line bg-canvas-alt px-3 py-2 text-xs text-ink focus:outline-none focus:border-accent"
                  >
                    <option value="">Select organizational scale</option>
                    <option value="1-10">1–10 employees</option>
                    <option value="11-50">11–50 employees</option>
                    <option value="51-200">51–200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                  <ArrowDownIcon size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-ghost" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" type="button" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" size="sm" type="submit">Continue <ArrowRightIcon size={14} className="ml-1" /></Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="rounded-xs border border-line p-3 bg-canvas-alt/50">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon size={14} className="text-accent" />
                  <span className="font-semibold text-ink">Select Preferred Time Window</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Mon — 10:00 AM", "Mon — 02:00 PM", "Tue — 11:30 AM", "Wed — 09:00 AM"].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className="rounded-xs border border-line bg-canvas px-2.5 py-1.5 text-[11px] font-mono text-ink-muted hover:border-accent hover:text-ink transition-colors text-left cursor-pointer"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium text-ink mb-1">Architecture Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Describe your current tech stack or primary bottleneck..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xs border border-line bg-canvas-alt px-3 py-2 text-xs text-ink placeholder:text-ink-ghost focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" type="button" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" size="sm" type="submit" loading={loading}>
                  {loading ? "Submitting..." : "Confirm Free Audit"}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Progress indicator */}
        {!submitted && (
          <div className="flex gap-1 px-6 pb-4">
            {([1, 2, 3] as Step[]).map((s) => (
              <div
                key={s}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-all duration-300",
                  s <= step ? "bg-accent" : "bg-line"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
