import { Link } from "react-router-dom";
import Hero from "../assets/Hero.png";

const Home = () => {
  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* HERO */}

      <section
        className="relative min-h-[calc(100vh-76px)] overflow-hidden border-b border-line bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Hero})`,
        }}
      >

        <div className="absolute inset-0 bg-paper/65" />

        <div className="relative flex min-h-[calc(100vh-76px)] items-center px-6 py-16 md:px-10 lg:px-14 xl:px-16">

          <div className="max-w-3xl">

            <span className="page-eyebrow">
              THE DOCUMENT ARCHIVE
            </span>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[6.5rem]">
              Knowledge,
              <br />
              <span className="text-blue">
                kept together.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-ink-soft md:text-lg">
              Discover, organize, save, and share useful documents.
              DocYard gives important knowledge a place where it can
              be found, revisited, and preserved.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                to="/documents"
                className="btn btn-primary"
              >
                Explore documents →
              </Link>

              <Link
                to="/upload"
                className="btn btn-ghost"
              >
                Contribute
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* INTRO */}

      <section className="px-6 py-20 md:px-10 lg:px-14 xl:px-16 md:py-24">

        <div className="grid gap-12 lg:grid-cols-[0.45fr_1.55fr] lg:gap-20">

          <div>
            <span className="page-eyebrow">
              WHY DOCYARD
            </span>
          </div>

          <div className="max-w-5xl">

            <h2 className="font-display text-4xl font-semibold leading-[1.02] md:text-6xl lg:text-7xl">
              Good information deserves
              <br className="hidden md:block" />
              a place where it can be found.
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
              Instead of letting useful documents disappear across
              folders, chats, and scattered links, DocYard gives them
              a structured home that makes them easier to discover,
              save, and revisit.
            </p>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="border-y border-line bg-paper-raised px-6 md:px-10 lg:px-14 xl:px-16">

        <div className="grid md:grid-cols-3">

          <article className="border-b border-line py-10 md:border-b-0 md:border-r md:pr-12 lg:py-14">

            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
              DISCOVER
            </span>

            <h3 className="mt-5 font-display text-2xl font-semibold">
              Find useful documents.
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
              Explore the archive and find documents,
              notes, research material, and guides that
              are worth keeping.
            </p>

            <Link
              to="/documents"
              className="mt-6 inline-block font-mono text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
            >
              Browse archive →
            </Link>

          </article>


          <article className="border-b border-line py-10 md:border-b-0 md:border-r md:px-12 lg:py-14">

            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
              SAVE
            </span>

            <h3 className="mt-5 font-display text-2xl font-semibold">
              Keep what matters.
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
              Bookmark documents you want to revisit
              and build a personal collection of useful
              knowledge.
            </p>

            <Link
              to="/bookmarks"
              className="mt-6 inline-block font-mono text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
            >
              View bookmarks →
            </Link>

          </article>


          <article className="py-10 md:pl-12 lg:py-14">

            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
              CONTRIBUTE
            </span>

            <h3 className="mt-5 font-display text-2xl font-semibold">
              Add something useful.
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
              Upload documents and make valuable
              resources easier for others to discover
              and use.
            </p>

            <Link
              to="/upload"
              className="mt-6 inline-block font-mono text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
            >
              Upload document →
            </Link>

          </article>

        </div>

      </section>


      {/* ARCHIVE */}

      <section className="px-6 py-20 md:px-10 lg:px-14 xl:px-16 md:py-24">

        <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">

          <div>

            <span className="page-eyebrow">
              THE ARCHIVE
            </span>

            <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] md:text-6xl">
              Something useful
              <br />
              is waiting.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-ink-soft">
              Browse the document archive, discover useful
              resources, and find material worth returning to.
            </p>

            <Link
              to="/documents"
              className="btn btn-primary mt-8 inline-flex"
            >
              Explore the archive →
            </Link>

          </div>


          <div className="grid border-t border-line md:grid-cols-2">

            <div className="border-b border-line py-8 md:border-r md:pr-10">

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                DOCUMENTS
              </span>

              <h3 className="mt-4 font-display text-2xl font-semibold">
                Read and discover.
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Search through the archive and explore
                documents that match what you are looking for.
              </p>

            </div>


            <div className="border-b border-line py-8 md:pl-10">

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                BOOKMARKS
              </span>

              <h3 className="mt-4 font-display text-2xl font-semibold">
                Return when needed.
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Keep important documents close so they
                are easy to find whenever you need them.
              </p>

            </div>


            <div className="border-b border-line py-8 md:border-b-0 md:border-r md:pr-10">

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                UPLOAD
              </span>

              <h3 className="mt-4 font-display text-2xl font-semibold">
                Preserve useful work.
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Add your own documents and give useful
                information a lasting place in the archive.
              </p>

            </div>


            <div className="py-8 md:pl-10">

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                ORGANIZE
              </span>

              <h3 className="mt-4 font-display text-2xl font-semibold">
                Keep knowledge together.
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Use the archive's available tools to make
                useful documents easier to find and revisit.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="bg-ink px-6 py-20 text-paper md:px-10 lg:px-14 xl:px-16 md:py-28">

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">

          <div>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              START EXPLORING
            </span>

            <h2 className="mt-5 max-w-[900px] font-display text-5xl font-semibold leading-[0.92] md:text-7xl lg:text-8xl">
              Find something
              <br />
              worth keeping.
            </h2>

          </div>

          <Link
            to="/documents"
            className="inline-flex w-fit items-center border border-paper/30 px-6 py-4 font-mono text-[10px] uppercase tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Enter the archive →
          </Link>

        </div>

      </section>


      {/* FOOTER NOTE */}


    </main>
  );
};

export default Home;