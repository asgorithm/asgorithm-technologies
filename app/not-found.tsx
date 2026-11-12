export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-start justify-center px-4 sm:px-8 max-w-[1400px] mx-auto">
      <span className="font-mono text-sm tracking-wider text-muted uppercase">404</span>
      <h1 className="mt-6 text-[clamp(3rem,10vw,8rem)] leading-[0.92] font-light tracking-[-0.045em]">
        Off the <em className="text-signal">map.</em>
      </h1>
      <a href="/" className="mt-10 border-b border-line pb-1 hover:border-signal">Back to asgorithm.com →</a>
    </main>
  );
}
