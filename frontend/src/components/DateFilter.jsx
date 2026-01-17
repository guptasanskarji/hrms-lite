export default function DateFilter({ onFilter }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="flex gap-4 items-end mb-4">
      <div>
        <label className="text-sm">From</label>
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm">To</label>
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={() => onFilter(from, to)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
}
