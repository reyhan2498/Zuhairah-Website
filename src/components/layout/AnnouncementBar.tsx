export function AnnouncementBar() {
  const messages = ["Free shipping on orders over $75", "Made to move. Made to cover.", "Modest activewear, made joyful.","ETHICALLY MADE IN NEW ZEALAND."];
  const items = [...messages, ...messages];

  return (
    <div className="bg-brand-purple overflow-hidden py-2.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((msg, i) => (
          <span
            key={i}
            className="text-brand-cream text-[12px] font-medium tracking-[0.22em] uppercase mx-5"
          >
            {msg}
            <span className="text-brand-cream mx-5">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
