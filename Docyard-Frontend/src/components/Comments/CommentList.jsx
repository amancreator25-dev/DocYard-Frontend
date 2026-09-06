import CommentItem from "./CommentItem.jsx";

const CommentList = ({
  comments = [],
  currentUserId,
  onDelete,
  deletingId = null,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="border border-line bg-white px-5">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex gap-4 border-b border-line py-6 last:border-b-0"
          >
            <div className="h-9 w-9 shrink-0 bg-paper-raised" />

            <div className="flex-1">
              <div className="h-4 w-32 bg-paper-raised" />

              <div className="mt-4 h-3 w-full bg-paper-raised" />

              <div className="mt-2 h-3 w-3/4 bg-paper-raised" />
            </div>
          </div>
        ))}

      </div>
    );
  }

  if (!comments.length) {
    return (
      <div className="border border-line bg-white px-6 py-12 text-center">

        <span className="page-eyebrow">
          COMMENTS
        </span>

        <h3 className="mt-3 font-display text-2xl font-semibold">
          No comments yet.
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
          Be the first to share your thoughts on
          this document.
        </p>

      </div>
    );
  }

  return (
    <div className="border border-line bg-white px-5">
      {comments.map((comment) => {
        const commentId =
          comment._id || comment.id;

        return (
          <CommentItem
            key={commentId}
            comment={comment}
            currentUserId={currentUserId}
            onDelete={onDelete}
            deleting={deletingId === commentId}
          />
        );
      })}
    </div>
  );
};

export default CommentList;