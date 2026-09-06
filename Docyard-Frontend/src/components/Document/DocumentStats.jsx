const DocumentStats = ({
  documents = [],
  total,
  likes,
  downloads,
}) => {
  const documentCount =
    total ?? documents.length;

  const totalLikes =
    likes ??
    documents.reduce(
      (sum, document) =>
        sum +
        (document.likeCount ??
          document.likesCount ??
          document.likes ??
          0),
      0
    );

  const totalDownloads =
    downloads ??
    documents.reduce(
      (sum, document) =>
        sum +
        (document.downloadCount ??
          document.downloads ??
          0),
      0
    );

  const stats = [
    {
      label: "DOCUMENTS",
      value: documentCount,
    },
    {
      label: "LIKES",
      value: totalLikes,
    },
    {
      label: "DOWNLOADS",
      value: totalDownloads,
    },
  ];

  return (
    <div className="grid border-l border-t border-line sm:grid-cols-3">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-b border-r border-line bg-white px-5 py-6"
        >
          <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
            {stat.label}
          </span>

          <p className="mt-3 font-display text-4xl font-semibold">
            {stat.value}
          </p>
        </div>
      ))}

    </div>
  );
};

export default DocumentStats;