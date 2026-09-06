import DocumentCard from "./DocumentCard.jsx";

const DocumentGrid = ({
  documents = [],
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="border border-line bg-white p-5"
          >
            <div className="h-3 w-20 bg-paper-raised" />

            <div className="mt-6 h-7 w-4/5 bg-paper-raised" />

            <div className="mt-3 h-3 w-full bg-paper-raised" />
            <div className="mt-2 h-3 w-3/4 bg-paper-raised" />

            <div className="mt-8 border-t border-line pt-4">
              <div className="h-3 w-24 bg-paper-raised" />
            </div>
          </div>
        ))}

      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="border border-line bg-white px-6 py-16 text-center">

        <span className="page-eyebrow">
          EMPTY ARCHIVE
        </span>

        <h2 className="mt-4 font-display text-3xl font-semibold">
          No documents found.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
          Try changing your filters or search
          for something else.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard
          key={document._id || document.id}
          document={document}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;