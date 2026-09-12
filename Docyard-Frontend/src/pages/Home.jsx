import { Link } from "react-router-dom";
import Hero from "../assets/Hero.png";

const Home = () => {
  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Hero})`,
        }}
      >

        {/* HERO CONTENT */}

        <div className="relative flex min-h-[calc(100vh-76px)] items-center px-6 py-16 sm:px-10 md:px-14 lg:px-20 xl:px-24">

          <div className="w-full">

            <div className="max-w-4xl">

              <span className="page-eyebrow">
                THE DOCUMENT ARCHIVE
              </span>


              <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem]">
                Knowledge,
                <br />
                <span className="text-blue">
                  kept together.
                </span>
              </h1>


              <p className="mt-8 max-w-2xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                Discover, organize, save, and share useful
                documents. DocYard gives important knowledge
                a place where it can be found, revisited,
                and preserved.
              </p>


              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  to="/documents"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-blue bg-blue px-7 text-sm font-semibold text-white shadow-sm transition-all hover:border-ink hover:bg-ink"
                >
                  Explore documents →
                </Link>


                <Link
                  to="/upload"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-line-strong bg-white/90 px-7 text-sm font-semibold text-ink backdrop-blur-sm transition-all hover:border-blue hover:text-blue"
                >
                  Contribute
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="w-full px-6 py-20 sm:px-10 md:px-14 md:py-28 lg:px-20 xl:px-24">

        <div className="grid gap-12 lg:grid-cols-[0.45fr_1.55fr] lg:gap-20">

          <div>

            <span className="page-eyebrow">
              WHY DOCYARD
            </span>

          </div>


          <div>

            <h2 className="max-w-6xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-7xl">
              Good information deserves
              <br className="hidden md:block" />
              a place where it can be found.
            </h2>


            <p className="mt-8 max-w-3xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              Instead of letting useful documents disappear
              across folders, chats, and scattered links,
              DocYard gives them a structured home that makes
              them easier to discover, save, and revisit.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section className="w-full bg-paper-raised px-6 py-4 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        <div className="grid gap-4 md:grid-cols-3">

          {/* DISCOVER */}

          <article className="rounded-2xl border border-line bg-white p-7 md:p-8 lg:p-10">

            <div className="flex items-center justify-between">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                DISCOVER
              </span>

              <span className="font-mono text-xs text-ink-faint">
                01
              </span>

            </div>


            <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.02em]">
              Find useful documents.
            </h3>


            <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
              Explore the archive and find documents,
              notes, research material, and guides that
              are worth keeping.
            </p>


            <Link
              to="/documents"
              className="mt-8 inline-flex h-10 items-center rounded-lg border border-line-strong bg-paper px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-all hover:border-blue hover:text-blue"
            >
              Browse archive →
            </Link>

          </article>


          {/* SAVE */}

          <article className="rounded-2xl border border-line bg-white p-7 md:p-8 lg:p-10">

            <div className="flex items-center justify-between">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                SAVE
              </span>

              <span className="font-mono text-xs text-ink-faint">
                02
              </span>

            </div>


            <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.02em]">
              Keep what matters.
            </h3>


            <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
              Bookmark documents you want to revisit
              and build a personal collection of useful
              knowledge.
            </p>


            <Link
              to="/bookmarks"
              className="mt-8 inline-flex h-10 items-center rounded-lg border border-line-strong bg-paper px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-all hover:border-blue hover:text-blue"
            >
              View bookmarks →
            </Link>

          </article>


          {/* CONTRIBUTE */}

          <article className="rounded-2xl border border-line bg-white p-7 md:p-8 lg:p-10">

            <div className="flex items-center justify-between">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                CONTRIBUTE
              </span>

              <span className="font-mono text-xs text-ink-faint">
                03
              </span>

            </div>


            <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.02em]">
              Add something useful.
            </h3>


            <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
              Upload documents and make valuable
              resources easier for others to discover
              and use.
            </p>


            <Link
              to="/upload"
              className="mt-8 inline-flex h-10 items-center rounded-lg border border-line-strong bg-paper px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-all hover:border-blue hover:text-blue"
            >
              Upload document →
            </Link>

          </article>

        </div>

      </section>


      {/* =========================================================
          ARCHIVE
      ========================================================= */}

      <section className="w-full px-6 py-20 sm:px-10 md:px-14 md:py-28 lg:px-20 xl:px-24">

        <div className="grid gap-14 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">

          {/* LEFT */}

          <div>

            <span className="page-eyebrow">
              THE ARCHIVE
            </span>


            <h2 className="mt-6 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-7xl">
              Something useful
              <br />
              is waiting.
            </h2>


            <p className="mt-7 max-w-lg text-base leading-7 text-ink-soft">
              Browse the document archive, discover useful
              resources, and find material worth returning to.
            </p>


            <Link
              to="/documents"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg border border-blue bg-blue px-7 text-sm font-semibold text-white shadow-sm transition-all hover:border-ink hover:bg-ink"
            >
              Explore the archive →
            </Link>

          </div>


          {/* RIGHT */}

          <div className="grid gap-4 md:grid-cols-2">

            {/* DOCUMENTS */}

            <article className="rounded-2xl border border-line bg-paper-raised p-7 md:p-8">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                DOCUMENTS
              </span>


              <h3 className="mt-5 font-display text-3xl font-semibold">
                Read and discover.
              </h3>


              <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
                Search through the archive and explore
                documents that match what you are looking for.
              </p>

            </article>


            {/* BOOKMARKS */}

            <article className="rounded-2xl border border-line bg-paper-raised p-7 md:p-8">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                BOOKMARKS
              </span>


              <h3 className="mt-5 font-display text-3xl font-semibold">
                Return when needed.
              </h3>


              <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
                Keep important documents close so they
                are easy to find whenever you need them.
              </p>

            </article>


            {/* UPLOAD */}

            <article className="rounded-2xl border border-line bg-paper-raised p-7 md:p-8">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                UPLOAD
              </span>


              <h3 className="mt-5 font-display text-3xl font-semibold">
                Preserve useful work.
              </h3>


              <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
                Add your own documents and give useful
                information a lasting place in the archive.
              </p>

            </article>


            {/* ORGANIZE */}

            <article className="rounded-2xl border border-line bg-paper-raised p-7 md:p-8">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                ORGANIZE
              </span>


              <h3 className="mt-5 font-display text-3xl font-semibold">
                Keep knowledge together.
              </h3>


              <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
                Use the archive's available tools to make
                useful documents easier to find and revisit.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="w-full bg-ink px-6 py-20 text-paper sm:px-10 md:px-14 md:py-28 lg:px-20 xl:px-24">

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">

          <div>

            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper/50">
              START EXPLORING
            </span>


            <h2 className="mt-6 max-w-6xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[7rem]">
              Find something
              <br />
              worth keeping.
            </h2>

          </div>


          <Link
            to="/documents"
            className="inline-flex h-12 w-fit items-center justify-center rounded-lg border border-paper/30 px-7 text-sm font-semibold text-paper transition-all hover:bg-paper hover:text-ink"
          >
            Enter the archive →
          </Link>

        </div>

      </section>

    </main>
  );
};

export default Home;