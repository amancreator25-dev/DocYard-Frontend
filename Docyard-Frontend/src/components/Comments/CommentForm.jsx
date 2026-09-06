import { useState } from "react";

const CommentForm = ({
  onSubmit,
  loading = false,
  initialValue = "",
  placeholder = "Write a comment...",
}) => {
  const [comment, setComment] = useState(initialValue);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedComment = comment.trim();

    if (!trimmedComment || loading) {
      return;
    }

    const result = await onSubmit?.(trimmedComment);

    // Clear only when the parent confirms success.
    if (result !== false) {
      setComment("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-white p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="page-eyebrow">
          ADD COMMENT
        </span>

        <span className="font-mono text-[9px] text-ink-faint">
          {comment.length}/1000
        </span>
      </div>

      <textarea
        value={comment}
        onChange={(event) => {
          if (event.target.value.length <= 1000) {
            setComment(event.target.value);
          }
        }}
        placeholder={placeholder}
        rows={5}
        disabled={loading}
        className="form-input min-h-[130px] resize-y"
        aria-label="Comment"
      />

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={!comment.trim() || loading}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post comment →"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;