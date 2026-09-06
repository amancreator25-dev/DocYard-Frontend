const Loader = ({ text = "Loading..." }) => {
  return (
    <div
      className="flex min-h-[180px] w-full items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">

        <span className="h-2 w-2 animate-pulse bg-blue" />

        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          {text}
        </span>

      </div>
    </div>
  );
};

export default Loader;