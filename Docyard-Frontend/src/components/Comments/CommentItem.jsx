import { useState } from "react";

const CommentItem = ({
  comment,
  currentUserId,
  onDelete,
  deleting = false,
}) => {
  const [showFull, setShowFull] = useState(false);

  if (!comment) {
    return null;
  }

  const commentId =
    comment._id || comment.id;

  const author =
    comment.user?.username ||
    comment.author?.username ||
    comment.username ||
    comment.author ||
    "Anonymous";

  const email =
    comment.user?.email ||
    comment.author?.email ||
    "";

  const content =
    comment.content ||
    comment.text ||
    comment.comment ||
    "";

  const createdAt =
    comment.createdAt ||
    comment.created_at;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "";

  const commentUserId =
    comment.user?._id ||
    comment.user?.id ||
    comment.author?._id ||
    comment.author?.id ||
    comment.userId;

  const canDelete =
    currentUserId &&
    commentUserId &&
    String(currentUserId) === String(commentUserId);

  const isLong = content.length > 300;

  const displayedContent =
    !showFull && isLong
      ? `${content.slice(0, 300)}...`
      : content;

  return (
    <article className="border-b border-line py-6 last:border-b-0">

      <div className="flex items-start gap-4">

        {/* AVATAR */}

        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-paper-raised">
          <span className="font-mono text-[10px] uppercase text-blue">
            {author.charAt(0)}
          </span>
        </div>


        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          {/* AUTHOR + DATE */}

          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

            <div className="flex items-center gap-2">

              <span className="font-display text-base font-semibold">
                {author}
              </span>

              {email && (
                <span className="hidden font-mono text-[9px] text-ink-faint sm:inline">
                  {email}
                </span>
              )}

            </div>

            {formattedDate && (
              <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                {formattedDate}
              </span>
            )}

          </div>


          {/* COMMENT */}

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink-soft">
            {displayedContent}
          </p>


          {/* ACTIONS */}

          <div className="mt-4 flex items-center gap-5">

            {isLong && (
              <button
                type="button"
                onClick={() =>
                  setShowFull((previous) => !previous)
                }
                className="font-mono text-[9px] uppercase tracking-wide text-ink-faint hover:text-blue"
              >
                {showFull
                  ? "Show less"
                  : "Read more"}
              </button>
            )}

            {canDelete && (
              <button
                type="button"
                onClick={() =>
                  onDelete?.(commentId)
                }
                disabled={deleting}
                className="font-mono text-[9px] uppercase tracking-wide text-ink-faint hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            )}

          </div>

        </div>

      </div>

    </article>
  );
};

export default CommentItem;