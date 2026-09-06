import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="min-h-screen bg-paper px-6 py-20 text-ink md:px-12 md:py-28">

      <div className="mx-auto flex min-h-[70vh] max-w-[1180px] items-center">

        <div className="w-full">

          {/* EYEBROW */}

          <span className="page-eyebrow">
            DOCYARD / 404
          </span>


          {/* ERROR */}

          <div className="mt-6 font-mono text-[100px] font-bold leading-none tracking-[-0.08em] text-blue md:text-[180px]">
            404
          </div>


          {/* CONTENT */}

          <div className="mt-6 max-w-2xl border-t border-line pt-7">

            <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
              This page doesn't exist.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-ink-soft md:text-base">
              The page you're looking for may have
              been moved, removed, or never existed
              in the DocYard archive.
            </p>


            {/* ACTIONS */}

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/"
                className="btn btn-primary"
              >
                Back home →
              </Link>

              <Link
                to="/documents"
                className="btn btn-ghost"
              >
                Browse archive
              </Link>

            </div>

          </div>


          {/* FOOTER NOTE */}

          <div className="mt-16 border-t border-line pt-5">

            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              DOCUMENTS / KNOWLEDGE / COMMUNITY
            </span>

          </div>

        </div>

      </div>

    </main>
  );
};

export default PageNotFound;