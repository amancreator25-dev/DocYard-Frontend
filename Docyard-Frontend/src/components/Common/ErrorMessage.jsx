const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
  onRetry = null,
}) => {
  return (
    <div
      className="border border-line bg-paper-raised px-6 py-6"
      role="alert"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-3">

          <span className="mt-1 font-mono text-[9px] text-red-600">
            ERR
          </span>

          <div>
            <span className="page-eyebrow">
              ERROR
            </span>

            <p className="mt-2 text-sm leading-6 text-ink-soft">
              {message}
            </p>
          </div>

        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="btn btn-ghost w-fit"
          >
            Try again →
          </button>
        )}

      </div>
    </div>
  );
};

export default ErrorMessage;