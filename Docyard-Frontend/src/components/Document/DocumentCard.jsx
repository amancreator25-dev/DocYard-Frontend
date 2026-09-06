import { Link } from "react-router-dom";

const DocumentCard = ({ document }) => {
  if (!document) {
    return null;
  }

  const documentId =
    document._id || document.id;

  const title =
    document.title || "Untitled document";

  const description =
    document.description ||
    "No description available.";

  const author =
    document.author?.username ||
    document.user?.username ||
    document.createdBy?.username ||
    "Unknown author";

  const category =
    document.category || "Uncategorized";

  const slug =
    document.slug || documentId;

  const likes =
    document.likeCount ??
    document.likesCount ??
    document.likes ??
    0;

  const downloads =
    document.downloadCount ??
    document.downloads ??
    0;

  const createdAt = document.createdAt
    ? new Date(
        document.createdAt
      ).toLocaleDateString()
    : "";

  return (
    <article className="group flex h-full flex-col border border-line bg-white transition-colors hover:bg-paper-raised">

      {/* TOP */}

      <div className="flex items-center justify-between border-b border-line px-5 py-4">

        <span className="font-mono text-[9px] uppercase tracking-wide text-blue">
          {category}
        </span>

        <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          DOC
        </span>

      </div>


      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-5">

        <Link
          to={`/documents/${slug}`}
          className="font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-blue"
        >
          {title}
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-soft">
          {description}
        </p>


        {/* AUTHOR */}

        <div className="mt-6 flex items-center gap-2">

          <span className="h-1.5 w-1.5 bg-blue" />

          <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
            {author}
          </span>

        </div>


        {/* STATS */}

        <div className="mt-auto pt-7">

          <div className="flex items-center gap-5 border-t border-line pt-4">

            <span className="font-mono text-[9px] text-ink-faint">
              ♥ {likes}
            </span>

            <span className="font-mono text-[9px] text-ink-faint">
              ↓ {downloads}
            </span>

            {createdAt && (
              <span className="ml-auto font-mono text-[9px] text-ink-faint">
                {createdAt}
              </span>
            )}

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <Link
        to={`/documents/${slug}`}
        className="flex items-center justify-between border-t border-line px-5 py-4 font-mono text-[9px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
      >
        <span>
          Read document
        </span>

        <span className="text-sm text-blue transition-transform group-hover:translate-x-1">
          →
        </span>

      </Link>

    </article>
  );
};

export default DocumentCard;