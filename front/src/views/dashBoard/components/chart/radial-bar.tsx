import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { opProgressData } from "../../type/dashBoard.types";

type RadialBarProps = {
  datas: opProgressData;
};

const RadialBar: React.FC<RadialBarProps> = ({ datas }) => {
  const [series, setSeries] = useState<number[]>([]);
  const [radialOptions, setRadialOptions] = useState<object>({});

  useEffect(() => {
    updateSeriesLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);

  const updateSeriesLine = () => {
    const seriesData = [Math.floor(datas.percentage)];
    const label = comma(datas.done) + "/" + comma(datas.total);

    const defaultStyles = {
      width: "280px",
      height: "280px",
      size: "58%",
    };

    const mergedStyles = { ...defaultStyles, ...datas };

    setSeries(seriesData);
    setRadialOptions({
      chart: {
        height: mergedStyles.height,
        type: "radialBar",
      },
      labels: [label],
      colors: ["#5A89D9"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: mergedStyles.size,
          },
          dataLabels: {
            name: {
              offsetY: 20,
              color: "#999999",
              fontWeight: "400",
              fontSize: "12px",
              show: true,
            },
            value: {
              offsetY: -15,
              color: "#264EB8",
              fontSize: "32px",
              fontWeight: "700",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#ACD9CB"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
    });
  };

  const comma = (val: number) => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div id="chart">
      <ApexCharts
        options={radialOptions}
        series={series}
        type="radialBar"
        width="100%"
      />
    </div>
  );
};

export default RadialBar;
