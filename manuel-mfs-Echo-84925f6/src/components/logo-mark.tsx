import Image from "next/image";

export function LogoMark({ className = "size-11" }: { className?: string }) {
  return (
    <Image
      src="/echo-logo.png"
      alt=""
      width={256}
      height={256}
      className={`object-contain ${className}`}
    />
  );
}
