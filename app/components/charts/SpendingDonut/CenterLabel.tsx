import { CenterLabelProps } from "./types";
import { formatCurrency } from "./utils";

export default function CenterLabel({
  viewBox,
  total,
  active,
}: CenterLabelProps) {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;
  const label = active ? active.name : "Total";
  const value = active ? active.value : total;

  const boxW = 160;
  const boxH = 56;

  return (
    <foreignObject
      x={cx - boxW / 2}
      y={cy - boxH / 2}
      width={boxW}
      height={boxH}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          textAlign: "center",
          gap: 2,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: "#94a3b8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1e293b",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            marginLeft: "80px",
          }}
        >
          {formatCurrency(value)}
        </span>
      </div>
    </foreignObject>
  );
}
