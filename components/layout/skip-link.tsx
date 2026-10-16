export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg font-medium outline-none ring-2 ring-white"
    >
      Skip to main content
    </a>
  );
}
