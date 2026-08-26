const messages = [
  "Free shipping on orders over $75",
  "Made to move. Made to cover.",
  "Modest activewear, made joyful.",
  "ETHICALLY MADE IN NEW ZEALAND.",
];

export function AnnouncementBar() {
  // Duplicating twice ensures seamless coverage across wide displays
  const items = [...messages, ...messages];

  return (
    <div className="relative w-full overflow-hidden bg-brand-purple py-2.5">
      {/* 
        aria-hidden mask for screen readers + pause on hover for accessibility 
      */}
      <div className="group flex w-max min-w-full select-none">
        <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
          {items.map((msg, i) => (
            <span
              key={`a-${i}`}
              className="mx-4 flex items-center text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cream sm:mx-6 sm:text-[12px]"
            >
              {msg}
              <span className="ml-8 text-[10px] opacity-70" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>

        {/* Identical secondary block for seamless seamless offset tracking */}
        <div
          className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {items.map((msg, i) => (
            <span
              key={`b-${i}`}
              className="mx-4 flex items-center text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cream sm:mx-6 sm:text-[12px]"
            >
              {msg}
              <span className="ml-8 text-[10px] opacity-70" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}