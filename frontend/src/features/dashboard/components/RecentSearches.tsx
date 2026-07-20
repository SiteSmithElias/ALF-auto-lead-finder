const searches = [
  {
    query: "plumbers Brussels",
    results: 238,
    date: "Today",
  },
  {
    query: "restaurants Ghent",
    results: 152,
    date: "Yesterday",
  },
  {
    query: "dentists Antwerp",
    results: 87,
    date: "Yesterday",
  },
];

export default function RecentSearches() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
      <h2 className="font-semibold mb-5">Recent Discoveries</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="opacity-60 text-sm">
            <th>Query</th>
            <th>Results</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {searches.map((search) => (
            <tr
              key={search.query}
              className="border-t border-[var(--border)]"
            >
              <td className="py-3">{search.query}</td>
              <td>{search.results}</td>
              <td>{search.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}