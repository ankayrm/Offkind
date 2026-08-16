import { brand } from "@/data/brand";

export function AnnouncementBar() {
  return (
    <div className="bg-ok-black text-ok-off">
      <p className="px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] md:text-[11px]">
        <span className="text-ok-yellow">●</span> {brand.announcement}
      </p>
    </div>
  );
}
