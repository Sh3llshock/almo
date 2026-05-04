import { PATH_WIDTH, segmentPath, type PathNode } from "./path-layout";

type PathSvgProps = {
  nodes: PathNode[];
  height: number;
};

export const PathSvg = ({ nodes, height }: PathSvgProps) => {
  return (
    <svg
      width={PATH_WIDTH}
      height={height}
      viewBox={`0 0 ${PATH_WIDTH} ${height}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {nodes.slice(0, -1).map((from, i) => {
        const to = nodes[i + 1];
        const isCompleted = from.completed;
        return (
          <path
            key={`seg-${from.key}-${to.key}`}
            d={segmentPath(from, to)}
            fill="none"
            stroke={isCompleted ? "#0061AA" : "#e5e7eb"}
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
};
