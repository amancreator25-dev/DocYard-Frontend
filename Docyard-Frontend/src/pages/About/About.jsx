import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen border-t border-ink bg-paper text-ink">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 lg:py-24">

        <div className="grid gap-10 lg:grid-cols-[30%_70%]">

          <div>
            <span className="page-eyebrow">
              ABOUT DOCYARD
            </span>
          </div>

          <div>
            <h1 className="max-w-6xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.04em] md:text-6xl lg:text-[76px]">
              A digital archive
              <br />
              for preserving
              <br />
              Documents.
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              DocYard is a digital archive platform that helps
              users and institutions upload, preserve, search,
              and manage Documents.
            </p>
          </div>

        </div>
      </section>


      {/* ==========================================
          PURPOSE
      ========================================== */}

      <section className="border-t border-line">

        <div className="grid lg:grid-cols-[30%_70%]">

          <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
            <span className="page-eyebrow">
              OUR PURPOSE
            </span>
          </div>

          <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">

            <h2 className="max-w-4xl font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              Making archival content easier to preserve,
              discover, and understand.
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2">

              <p className="text-sm leading-7 text-ink-soft md:text-base">
                Documents can be difficult to
                organize, search, and access when they are
                scattered across collections and storage systems.
                DocYard provides a structured digital space for
                bringing these resources together.
              </p>

              <p className="text-sm leading-7 text-ink-soft md:text-base">
                The platform combines archival organization with
                modern discovery tools, helping users work with
                documents through metadata, categorization,
                full-text search, and AI-powered features.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ==========================================
          WHAT DOCYARD PROVIDES
      ========================================== */}

      <section className="border-t border-line px-6 py-12 md:px-10 md:py-16 lg:px-16">

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <span className="page-eyebrow">
              THE PLATFORM
            </span>

            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Built for digital archives.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-ink-soft">
            A focused set of tools for preserving and working
            with Documents.
          </p>

        </div>


        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {/* CARD 01 */}

          <article className="rounded-md border border-line bg-white p-7 transition-all duration-200 hover:border-ink/40 hover:shadow-sm md:p-8">


            <h3 className="mt-8 font-display text-2xl font-semibold">
              Preserve
            </h3>

            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Upload documents and maintain them
              within a structured digital archive.
            </p>

          </article>


          {/* CARD 02 */}

          <article className="rounded-md border border-line bg-white p-7 transition-all duration-200 hover:border-ink/40 hover:shadow-sm md:p-8">


            <h3 className="mt-8 font-display text-2xl font-semibold">
              Organize
            </h3>

            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Use metadata and categorization to give archival
              content structure and context.
            </p>

          </article>


          {/* CARD 03 */}

          <article className="rounded-md border border-line bg-white p-7 transition-all duration-200 hover:border-ink/40 hover:shadow-sm md:p-8">


            <h3 className="mt-8 font-display text-2xl font-semibold">
              Search
            </h3>

            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Find relevant archival material through
              structured information.
            </p>

          </article>


          {/* CARD 04 */}

          <article className="rounded-md border border-line bg-white p-7 transition-all duration-200 hover:border-ink/40 hover:shadow-sm md:p-8">


            <h3 className="mt-8 font-display text-2xl font-semibold">
              Manage
            </h3>

            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Give users and institutions tools to manage
              documents and their archival collections.
            </p>

          </article>


          {/* CARD 05 */}

          <article className="rounded-md border border-line bg-white p-7 transition-all duration-200 hover:border-ink/40 hover:shadow-sm md:p-8">


            <h3 className="mt-8 font-display text-2xl font-semibold">
              Summarize
            </h3>

            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Use AI-powered document summarization to make
              archival material easier to understand.
            </p>

          </article>


          {/* CARD 06 */}

          <article className="rounded-md border border-line bg-white p-7 transition-all duration-200 hover:border-ink/40 hover:shadow-sm md:p-8">


            <h3 className="mt-8 font-display text-2xl font-semibold">
              Translate
            </h3>

            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Use AI-powered translation to make document
              content accessible across languages.
            </p>

          </article>

        </div>
      </section>


      {/* ==========================================
          USERS & INSTITUTIONS
      ========================================== */}

      <section className="border-t border-line">

        <div className="grid lg:grid-cols-2">

          <div className="px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">

            <span className="page-eyebrow">
              FOR USERS
            </span>

            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Explore and work with Documents.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-ink-soft md:text-base">
              Users can discover archival material, search
              through documents, and use modern tools to better
              understand and access content.
            </p>

          </div>


          <div className="border-t border-line px-6 py-12 md:px-10 md:py-16 lg:border-l lg:border-t-0 lg:px-16 lg:py-20">

            <span className="page-eyebrow">
              FOR INSTITUTIONS
            </span>

            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Build a structured digital collection.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-ink-soft md:text-base">
              Institutions can use DocYard to upload, organize,
              preserve, search, and manage Documents
              within a digital archive.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          VISION
      ========================================== */}

      <section className="border-t border-line px-6 py-14 md:px-10 md:py-20 lg:px-16">

        <div className="grid gap-10 lg:grid-cols-[30%_70%]">

          <div>
            <span className="page-eyebrow">
              THE IDEA
            </span>
          </div>

          <div>

            <h2 className="max-w-5xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Preserve the past.
              <br />
              Make it easier to explore.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-7 text-ink-soft">
              DocYard brings archival preservation and modern
              digital tools together in one platform, with the
              goal of making documents more accessible,
              searchable, and useful.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          CTA
      ========================================== */}

      <section className="border-t border-line px-6 py-10 md:px-10 md:py-14 lg:px-16">

        <div className="flex flex-col gap-7 rounded-md border border-line bg-paper-raised p-7 md:flex-row md:items-center md:justify-between md:p-10">

          <div>
            <span className="page-eyebrow">
              EXPLORE DOCYARD
            </span>

            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Discover the archive.
            </h2>

            <p className="mt-2 text-sm text-ink-soft">
              Explore documents and find something useful.
            </p>
          </div>

          <Link
            to="/documents"
            className="inline-flex w-fit items-center justify-center rounded-md bg-[#0A3A63] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] !text-[#ffffff] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#082F50]"
          >
            Browse documents
            
          </Link>

        </div>

      </section>

    </main>
  );
};

export default About;