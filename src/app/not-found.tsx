import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-6xl font-serif font-semibold text-brand-terracotta/20">404</p>
      <h1 className="mt-4 text-xl font-semibold text-brand-charcoal">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm text-brand-charcoal/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-terracotta px-6 py-3 text-sm font-semibold text-brand-cream hover:bg-brand-terracotta/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
