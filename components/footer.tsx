export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="select-none bg-gradient-to-b from-fg/[0.14] to-transparent bg-clip-text px-2 pt-10 text-center text-[19.5vw] leading-[0.8] font-medium tracking-[-0.06em] text-transparent"
      >
        ASGORITHM
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} Asgorithm Technologies</span>
        <span className="font-mono tracking-wider uppercase">Engineered in Coimbatore</span>
      </div>
    </footer>
  );
}
