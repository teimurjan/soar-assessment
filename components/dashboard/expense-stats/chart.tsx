import React, { memo } from "react";

import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { motion } from "framer-motion";

interface Category {
  category: string;
  percentage: number;
  color: string;
}

interface ChartProps {
  width: number;
  height: number;
  categories: Category[];
}

const Chart = memo(({ width, height, categories }: ChartProps) => {
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <Group top={centerY} left={centerX}>
        <Pie
          data={categories}
          pieValue={(d) => d.percentage}
          outerRadius={radius}
          innerRadius={0}
          cornerRadius={5}
          padAngle={0}
          startAngle={-1.05}
          endAngle={Math.PI * 2}
          pieSort={() => 1}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const arcPath = pie.path(arc) || "";
              const arcFill = categories[index].color;

              const [centroidX, centroidY] = pie.path.centroid(arc);

              // Check if the slice is large enough for a label
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

              // Adjust centroid position to move label slightly toward outer edge
              const labelScale = 1.3;
              const labelX = centroidX * labelScale;
              const labelY = centroidY * labelScale;

              return (
                <motion.g
                  key={`arc-${index}`}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <path d={arcPath} fill={arcFill} />
                  {hasSpaceForLabel && (
                    <g>
                      <Text
                        x={labelX}
                        y={labelY}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={radius * 0.09}
                        fontWeight="bold"
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {`${categories[index].category}`}
                      </Text>
                      <Text
                        x={labelX}
                        y={labelY + radius * 0.12}
                        fill="#ffffff"
                        fontSize={radius * 0.09}
                        fontWeight="bold"
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {`${categories[index].percentage}%`}
                      </Text>
                    </g>
                  )}
                </motion.g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
});

Chart.displayName = "Chart";

export default Chart;
