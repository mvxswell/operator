import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5" aria-hidden="true">
      <Image src="/brand/mark.svg" alt="" width={34} height={34} unoptimized className="h-[34px] w-[34px]" />
      <span className="hidden flex-col gap-1 sm:flex">
        <span className="text-[9px] font-medium leading-none tracking-[0.3em] text-muted">THINK</span>
        <span className="text-[13px] font-bold leading-none tracking-[0.12em] text-ink">OPERATOR</span>
      </span>
    </span>
  );
}
