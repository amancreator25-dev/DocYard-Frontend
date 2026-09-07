import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="border-b border-line px-6 py-20 md:px-10 lg:px-14 xl:px-16 md:py-28">

        <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.65fr)] lg:gap-24">

          {/* LEFT */}

          <div className="max-w-[1050px]">

            <span className="page-eyebrow">
              THE DOCUMENT ARCHIVE
            </span>

            <h1 className="mt-5 max-w-[1000px] font-display text-6xl font-semibold leading-[0.9] tracking-tight md:text-8xl lg:text-[8rem]">
              Knowledge,
              <br />
              <span className="text-blue">
                kept together.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-ink-soft md:text-lg">
              DocYard is a place to discover,
              organize, save, and share useful
              documents with a community of
              curious people.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                to="/documents"
                className="btn btn-primary text-#132a57"
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


          {/* RIGHT */}

          <div className="border-t border-line pt-6 lg:mb-2">

            <p className="font-mono text-[10px] uppercase leading-5 tracking-wide text-ink-faint">
              A SHARED SPACE FOR
            </p>

            <div className="mt-5">

              {[
                "Research",
                "Notes",
                "Guides",
                "Ideas",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-line py-4"
                >

                  <span className="font-display text-xl">
                    {item}
                  </span>

                  <span className="font-mono text-[10px] text-ink-faint">
                    0{index + 1}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          INTRO
      ========================================== */}

      <section className="px-6 py-20 md:px-10 lg:px-14 xl:px-16 md:py-28">

        <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-24">

          {/* LABEL */}

          <div>

            <span className="page-eyebrow">
              WHY DOCYARD
            </span>

          </div>


          {/* CONTENT */}

          <div className="max-w-[1100px]">

            <h2 className="font-display text-4xl font-semibold leading-[1.02] md:text-6xl lg:text-7xl">
              Good information deserves
              <br className="hidden md:block" />
              a place where it can be found.
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
              Instead of letting useful documents
              disappear across folders, chats, and
              scattered links, DocYard gives them a
              shared home.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          FEATURES
      ========================================== */}

      <section className="border-y border-line bg-paper-raised px-6 md:px-10 lg:px-14 xl:px-16">

        <div className="grid md:grid-cols-3">

          {/* FEATURE 01 */}

          <article className="border-b border-line py-10 md:border-b-0 md:border-r md:pr-14 lg:py-14">

            <span className="font-mono text-[10px] text-blue">
              01
            </span>

            <h3 className="mt-5 font-display text-2xl font-semibold">
              Discover
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
              Search through documents and find
              resources that are actually useful
              to you.
            </p>

            <Link
              to="/documents"
              className="mt-6 inline-block font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
            >
              Browse archive →
            </Link>

          </article>


          {/* FEATURE 02 */}

          <article className="border-b border-line py-10 md:border-b-0 md:border-r md:px-14 lg:py-14">

            <span className="font-mono text-[10px] text-blue">
              02
            </span>

            <h3 className="mt-5 font-display text-2xl font-semibold">
              Save
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
              Bookmark documents you want to
              revisit and keep your personal
              collection organized.
            </p>

            <Link
              to="/bookmarks"
              className="mt-6 inline-block font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
            >
              View bookmarks →
            </Link>

          </article>


          {/* FEATURE 03 */}

          <article className="py-10 md:pl-14 lg:py-14">

            <span className="font-mono text-[10px] text-blue">
              03
            </span>

            <h3 className="mt-5 font-display text-2xl font-semibold">
              Contribute
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
              Upload documents and add something
              valuable to the archive for others
              to discover.
            </p>

            <Link
              to="/upload"
              className="mt-6 inline-block font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
            >
              Upload document →
            </Link>

          </article>

        </div>

      </section>


      {/* ==========================================
          CTA
      ========================================== */}

      <section className="bg-ink px-6 py-20 text-paper md:px-10 lg:px-14 xl:px-16 md:py-28">

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">

          <div>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              START EXPLORING
            </span>

            <h2 className="mt-5 max-w-[1000px] font-display text-5xl font-semibold leading-[0.92] md:text-7xl lg:text-8xl">
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


      {/* ==========================================
          FOOTER NOTE
      ========================================== */}

      <section className="border-t border-line px-6 py-8 md:px-10 lg:px-14 xl:px-16">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <span className="font-display text-lg font-semibold">
            DocYard<span className="text-blue">.</span>
          </span>

          <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
            DOCUMENTS / KNOWLEDGE / COMMUNITY
          </span>

        </div>

      </section>

    </main>
  );
};

export default Home;