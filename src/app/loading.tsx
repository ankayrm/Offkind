import { BrandLogo } from "@/components/ui/BrandLogo";

export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <BrandLogo href={false} className="h-10 animate-pulse md:h-12" />
    </div>
  );
}
