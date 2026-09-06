const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="w-full max-w-md border border-line bg-white p-7 shadow-xl">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-6">

          <div>

            <span className="page-eyebrow">
              CONFIRM ACTION
            </span>

            <h2
              id="confirm-modal-title"
              className="mt-3 font-display text-3xl font-semibold leading-tight"
            >
              {title}
            </h2>

          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close"
            className="font-mono text-sm text-ink-faint hover:text-ink disabled:opacity-50"
          >
            ×
          </button>

        </div>


        {/* MESSAGE */}

        <p className="mt-5 text-sm leading-6 text-ink-soft">
          {message}
        </p>


        {/* ACTIONS */}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn btn-ghost"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Processing..." : `${confirmText} →`}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;