export default function PriceChange({ change }) {
  const direction = change?.dir;
  const percentage = Number(change?.pct) || 0;

  const isUp = direction === "up";
  const isDown = direction === "down";

  const color = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-emerald-50 text-emerald-700"
      : "bg-gray-100 text-gray-500";

  const icon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${color}`}
    >
      {icon} {percentage.toLocaleString("bn-BD")}%
    </span>
  );
}
