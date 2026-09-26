export default function Loading() {
  return (
    <div className="page-shell grid min-h-[55vh] place-items-center py-20" role="status">
      <div className="text-center">
        <span className="mx-auto block size-12 animate-pulse rounded-full bg-terracotta-light" />
        <p className="mt-5 font-display text-2xl font-semibold">Echo is gathering the next page…</p>
      </div>
    </div>
  );
}
