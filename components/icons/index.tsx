import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
}

// Base helper for standard 24x24 stroke icons
function createIcon(
  name: string,
  paths: (strokeWidth: number | string) => React.ReactNode,
  defaultFilled = false
) {
  const Component = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 20, strokeWidth = 1.75, className = "", ...props }, ref) => {
      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill={defaultFilled ? "currentColor" : "none"}
          stroke={defaultFilled ? "none" : "currentColor"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {paths(strokeWidth)}
        </svg>
      );
    }
  );
  Component.displayName = name;
  return Component;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Aviation & Navigation
   ───────────────────────────────────────────────────────────────────────────── */
export const PlaneIcon = createIcon("PlaneIcon", () => (
  <>
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 20.5 3s-3 .5-4.5 1L12.5 7.5 4.3 5.7c-.8-.2-1.6.2-2 .9l-.2.4 6 4.5L5 14.5l-2.5-.5-1 .5 2 2 2 2 .5-1-.5-2.5 3-3.1 4.5 6 .4-.2c.7-.4 1.1-1.2.9-2z" />
  </>
));

/* ─────────────────────────────────────────────────────────────────────────────
   Communication & Copilot
   ───────────────────────────────────────────────────────────────────────────── */
export const MessageSquareIcon = createIcon("MessageSquareIcon", () => (
  <>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8" />
    <path d="M8 13h5" />
  </>
));

export const BotIcon = createIcon("BotIcon", () => (
  <>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8.01" y2="16" />
    <line x1="16" y1="16" x2="16.01" y2="16" />
  </>
));

/* ─────────────────────────────────────────────────────────────────────────────
   Data & Financial Sync
   ───────────────────────────────────────────────────────────────────────────── */
export const ArrowLeftRightIcon = createIcon("ArrowLeftRightIcon", () => (
  <>
    <path d="M8 3L4 7l4 4" />
    <path d="M4 7h16" />
    <path d="M16 21l4-4-4-4" />
    <path d="M20 17H4" />
  </>
));

export const LayersIcon = createIcon("LayersIcon", () => (
  <>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </>
));

export const DatabaseIcon = createIcon("DatabaseIcon", () => (
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </>
));

/* ─────────────────────────────────────────────────────────────────────────────
   Media, Actions & Controls
   ───────────────────────────────────────────────────────────────────────────── */
export const PlayIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
);
PlayIcon.displayName = "PlayIcon";

export const SparklesIcon = createIcon("SparklesIcon", () => (
  <>
    <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" />
    <path d="M19 15l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2L19 15z" />
    <path d="M5 17l.8 1.8L7.6 19l-1.8.8L5 21.6l-.8-1.8L2.4 19l1.8-.8L5 17z" />
  </>
));

export const CheckmarkCircleIcon = createIcon("CheckmarkCircleIcon", () => (
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12.5l2.8 2.8 5.4-5.6" />
  </>
));

export const CheckIcon = createIcon("CheckIcon", () => (
  <>
    <polyline points="20 6 9 17 4 12" />
  </>
));

export const StarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
);
StarIcon.displayName = "StarIcon";

export const ZapIcon = createIcon("ZapIcon", () => (
  <>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </>
));

export const FlashIcon = ZapIcon;

/* ─────────────────────────────────────────────────────────────────────────────
   Technical & Developer Tools
   ───────────────────────────────────────────────────────────────────────────── */
export const TerminalIcon = createIcon("TerminalIcon", () => (
  <>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </>
));

export const ActivityIcon = createIcon("ActivityIcon", () => (
  <>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </>
));

export const CpuIcon = createIcon("CpuIcon", () => (
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3" />
    <path d="M15 1v3" />
    <path d="M9 20v3" />
    <path d="M15 20v3" />
    <path d="M20 9h3" />
    <path d="M20 14h3" />
    <path d="M1 9h3" />
    <path d="M1 14h3" />
  </>
));

export const ShieldIcon = createIcon("ShieldIcon", () => (
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </>
));

export const FileIcon = createIcon("FileIcon", () => (
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </>
));

export const SettingsIcon = createIcon("SettingsIcon", () => (
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </>
));

export const SearchIcon = createIcon("SearchIcon", () => (
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>
));

export const FilterIcon = createIcon("FilterIcon", () => (
  <>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </>
));

export const RefreshIcon = createIcon("RefreshIcon", () => (
  <>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </>
));

/* ─────────────────────────────────────────────────────────────────────────────
   Navigation Arrows & Directional
   ───────────────────────────────────────────────────────────────────────────── */
export const ArrowRightIcon = createIcon("ArrowRightIcon", () => (
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>
));

export const ArrowLeftIcon = createIcon("ArrowLeftIcon", () => (
  <>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </>
));

export const ArrowUpRightIcon = createIcon("ArrowUpRightIcon", () => (
  <>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </>
));

export const ArrowDownIcon = createIcon("ArrowDownIcon", () => (
  <>
    <polyline points="6 9 12 15 18 9" />
  </>
));

export const ArrowUpIcon = createIcon("ArrowUpIcon", () => (
  <>
    <polyline points="18 15 12 9 6 15" />
  </>
));

export const PlusIcon = createIcon("PlusIcon", () => (
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>
));

export const MinusIcon = createIcon("MinusIcon", () => (
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
  </>
));

export const MenuIcon = createIcon("MenuIcon", () => (
  <>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>
));

export const CloseIcon = createIcon("CloseIcon", () => (
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>
));

export const CancelIcon = CloseIcon;

/* ─────────────────────────────────────────────────────────────────────────────
   Identity, Organization & Calendar
   ───────────────────────────────────────────────────────────────────────────── */
export const CalendarIcon = createIcon("CalendarIcon", () => (
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
));

export const MailIcon = createIcon("MailIcon", () => (
  <>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </>
));

export const UserIcon = createIcon("UserIcon", () => (
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>
));

export const BuildingIcon = createIcon("BuildingIcon", () => (
  <>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <line x1="8" y1="6" x2="8.01" y2="6" />
    <line x1="12" y1="6" x2="12.01" y2="6" />
    <line x1="16" y1="6" x2="16.01" y2="6" />
    <line x1="8" y1="10" x2="8.01" y2="10" />
    <line x1="12" y1="10" x2="12.01" y2="10" />
    <line x1="16" y1="10" x2="16.01" y2="10" />
    <line x1="8" y1="14" x2="8.01" y2="14" />
    <line x1="12" y1="14" x2="12.01" y2="14" />
    <line x1="16" y1="14" x2="16.01" y2="14" />
  </>
));

/* ─────────────────────────────────────────────────────────────────────────────
   Theme Mode (Sun & Moon)
   ───────────────────────────────────────────────────────────────────────────── */
export const SunIcon = createIcon("SunIcon", () => (
  <>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </>
));

export const MoonIcon = createIcon("MoonIcon", () => (
  <>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </>
));
