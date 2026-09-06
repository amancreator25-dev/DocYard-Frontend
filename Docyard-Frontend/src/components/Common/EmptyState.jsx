const EmptyState = ({
  eyebrow = "NOTHING HERE",
  title = "No results found.",
  message = "There is nothing to display at the moment.",
  action = null,
}) => {
  return (
    <div className="border border-line bg-white px-6 py-16 text-center">

      <span className="page-eyebrow">
        {eyebrow}
      </span>

      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
        {message}
      </p>

      {action && (
        <div className="mt-7 flex justify-center">
          {action}
        </div>
      )}

    </div>
  );
};

export default EmptyState;