import React, { memo } from "react";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleTime, scaleLinear } from "@visx/scale";
import { LinePath, AreaClosed } from "@visx/shape";
import { motion } from "framer-motion";

import { BalanceData } from "@/lib/features/balance-slice";

const getDate = (d: BalanceData) => new Date(d.date);
const getValue = (d: BalanceData) => d.balance;

const AREA_GRADIENT_ID = "area-gradient";

interface ChartProps {
  width: number;
  height: number;
  history: BalanceData[];
}

const Chart = memo(({ width, height, history }: ChartProps) => {
  const margin = { top: 20, right: 10, bottom: 40, left: 50 };

  const xScale = scaleTime<number>({
    domain: [
      Math.min(...history.map((d) => new Date(d.date).getTime())),
      Math.max(...history.map((d) => new Date(d.date).getTime())),
    ],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...history.map((d) => d.balance)) * 1.1],
    range: [height - margin.bottom, margin.top],
  });

  const formatDate = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  };

  return (
    <svg width={width} height={height}>
      <Group>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={width - margin.left - margin.right}
          height={height - margin.top - margin.bottom}
          numTicksRows={5}
          numTicksColumns={0}
          strokeDasharray="4,4"
          strokeOpacity={0.3}
          stroke="#aaa"
          left={margin.left}
        />

        <AxisLeft
          scale={yScale}
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
          left={margin.left}
        />

        <LinearGradient
          id={AREA_GRADIENT_ID}
          from="#4169E1"
          to="#4169E1"
          fromOpacity={0.3}
          toOpacity={0}
        />
        {/* Area chart with gradient */}
        <AreaClosed
          data={history}
          x={(d) => xScale(getDate(d).getTime())}
          y={(d) => yScale(getValue(d))}
          yScale={yScale}
          curve={curveMonotoneX}
          fill={`url(#${AREA_GRADIENT_ID})`}
        />

        {/* Line chart */}
        <motion.g
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <LinePath
            data={history}
            x={(d) => xScale(getDate(d).getTime())}
            y={(d) => yScale(getValue(d))}
            stroke="#4169E1"
            strokeWidth={3}
            curve={curveMonotoneX}
          />
        </motion.g>

        {/* X-axis */}
        <AxisBottom
          top={height - margin.bottom}
          scale={xScale}
          stroke="#e5e5e5"
          tickStroke="#e5e5e5"
          hideAxisLine
          tickFormat={(value) => formatDate(new Date(value as number))}
          tickLabelProps={{
            fill: "#aaa",
            fontSize: 11,
            textAnchor: "middle",
          }}
        />
      </Group>
    </svg>
  );
});

Chart.displayName = "Chart";

export default Chart; 