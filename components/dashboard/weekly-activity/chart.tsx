import React, { memo } from "react";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarGroup } from "@visx/shape";
import { motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/use-media-query";
import { ActivityData } from "@/lib/features/activity-slice";

interface ChartProps {
  width: number;
  height: number;
  weeklyData: ActivityData[];
}

const keys = ["expenses", "income"];
const defaultMargin = { top: 20, right: 20, bottom: 40, left: 50 };

const Chart = memo(({ width, height, weeklyData }: ChartProps) => {
  const isMaxLg = useMediaQuery("lg", "down");
  const getDays = (d: ActivityData) => d.date;

  const dayScale = scaleBand<string>({
    domain: weeklyData.map(getDays),
    padding: 0.5,
  });

  const expensesScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(...weeklyData.map((d) => Math.max(d.expenses, d.income))),
    ],
    nice: true,
  });

  const incomeScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(...weeklyData.map((d) => Math.max(d.expenses, d.income))),
    ],
    nice: true,
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: ["#000000", "#4169E1"],
  });

  const keyScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  const xMax = width - defaultMargin.left - defaultMargin.right;
  const yMax = height - defaultMargin.top - defaultMargin.bottom;

  dayScale.rangeRound([0, xMax]);
  expensesScale.range([yMax, 0]);
  incomeScale.range([yMax, 0]);

  const barWidth = isMaxLg ? 5 : 15;
  const barSpacing = isMaxLg ? 1.5 : 3;
  const barRadius = isMaxLg ? 4 : 8;
  keyScale.rangeRound([0, barWidth + barSpacing]);

  return (
    <svg width={width} height={height}>
      <Group top={defaultMargin.top} left={defaultMargin.left}>
        <Grid
          xScale={dayScale}
          yScale={expensesScale}
          width={xMax}
          height={yMax}
          numTicksRows={5}
          numTicksColumns={0}
          strokeDasharray="4,4"
          strokeOpacity={0.3}
          stroke="#aaa"
        />

        {/* Y-axis */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AxisLeft
            scale={expensesScale}
            stroke="#e5e5e5"
            tickStroke="#e5e5e5"
            hideAxisLine
            numTicks={5}
            tickLabelProps={{
              fill: "#aaa",
              fontSize: 12,
              textAnchor: "end",
              dx: -8,
            }}
          />
        </motion.g>

        <BarGroup
          data={weeklyData}
          keys={keys}
          height={yMax}
          x0={getDays}
          x0Scale={dayScale}
          x1Scale={keyScale}
          yScale={expensesScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group
                key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                left={barGroup.x0}
              >
                {barGroup.bars.map((bar) => (
                  <React.Fragment
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                  >
                    <rect
                      x={bar.x + bar.index * (barWidth + barSpacing)}
                      y={bar.y}
                      width={barWidth}
                      height={Math.min(bar.height)}
                      fill={bar.color}
                      rx={barRadius}
                    />
                    <motion.rect
                      initial={{ height: yMax }}
                      animate={{ height: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: barGroup.index * 0.1,
                      }}
                      x={bar.x + bar.index * (barWidth + barSpacing)}
                      y={bar.y}
                      width={barWidth}
                      height={yMax}
                      fill="white"
                      rx={barRadius}
                      className="pointer-events-none"
                    />
                  </React.Fragment>
                ))}
              </Group>
            ))
          }
        </BarGroup>

        {/* X-axis */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AxisBottom
            top={yMax}
            scale={dayScale}
            stroke="#e5e5e5"
            tickStroke="#e5e5e5"
            hideAxisLine
            tickLabelProps={{
              fill: "#aaa",
              fontSize: 12,
              textAnchor: "middle",
            }}
          />
        </motion.g>
      </Group>
    </svg>
  );
});

Chart.displayName = "Chart";

export default Chart;
