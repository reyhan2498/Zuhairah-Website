export function AnnouncementBar() {
  const messages = ["Free shipping on orders over $75", "Made to move. Made to cover.", "Modest activewear, made joyful."];

  return (
    <div className="overflow-hidden bg-brand-charcoal text-brand-cream text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em]">
      <div className="flex min-w-max animate-marquee items-center gap-10 py-2.5">
        {[...messages, ...messages].map((message, index) => (
          <span key={`${message}-${index}`} className="inline-flex items-center gap-10">
            {message}<span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
