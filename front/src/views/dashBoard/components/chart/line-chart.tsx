import React, { useEffect, useState } from "react";
import { dailyWorkload } from "../../type/dashBoard.types";
import ApexCharts from "react-apexcharts";

type LineChartProps = {
  datas: dailyWorkload;
};

const LineChart: React.FC<LineChartProps> = ({ datas }) => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [chartOptions, setChartOptions] = useState<object>({});

  useEffect(() => {
    updateSeriesLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);

  const updateSeriesLine = () => {
    const seriesData = [
      {
        name: "작업",
        type: "line",
        data: datas.OP ? datas.OP : [],
      },
      {
        name: "검수",
        type: "line",
        data: datas.IN ? datas.IN : [],
      },
      {
        name: datas.type ? datas.type : "",
        data: [],
      },
    ];
    setSeries(seriesData);
    setChartOptions({
      chart: {
        height: 290,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "category",
        labels: {
          fontSize: "12px",
          trim: false, // Label ... 으로 되지 않도록
          rotate: 0, // Label 이 기울지 않도록
          minHeight: 20, // Label 영역 높이 지정 - UI에 맞게 수정해주세요
          hideOverlappingLabels: true, // Label이 겹치면 중간 중간 값을 숨기도록
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: number) {
            if (Number.isInteger(val)) return val;
          },
        },
      },
      colors: ["#5A89D9", "#ACD9CB"],
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
      },
      labels: datas.date,
      markers: {
        size: 0,
      },
      tooltip: {
        custom: function ({
          dataPointIndex,
          w,
        }: {
          dataPointIndex: number;
          w: {
            globals: {
              categoryLabels: string[];
              initialSeries: {
                color: string;
                data: string[];
                name: string;
                type: string;
              }[];
            };
          };
        }) {
          const label = w.globals.categoryLabels[dataPointIndex];
          const x = w.globals.initialSeries[0].data[dataPointIndex];
          const y = w.globals.initialSeries[1].data[dataPointIndex];

          let titleX = "";
          let titleY = "";

          let unit = "";

          if (w.globals.initialSeries[2].name === "fileCount") {
            titleX = "작업";
            titleY = "검수";
            unit = "개";
          } else {
            titleX = "작업자";
            titleY = "검수자";
            unit = "명";
          }

          return `
            <div
              class="tooltip"
              style="
                background: #f7f7f7;
                border: 1px solid #e3e3e3;
              "
            >
              <div class="title tc-333">${label}</div>
              <div class="inner">
                <div class="inner-row">
                  <div
                    style="
                      margin-right: 8px;
                      width: 12px;
                      height: 12px;
                      border: 2px solid #ffffff;
                      border-radius: 50%;
                      background: #5a89d9;
                    "
                  ></div>
                  ${titleX}: <span>&nbsp;${x}</span>${unit}
                </div>
                <div class="inner-row">
                  <div
                    style="
                      margin-right: 8px;
                      width: 12px;
                      height: 12px;
                      border: 2px solid #ffffff;
                      border-radius: 50%;
                      background: #acd9cb;
                    "
                  ></div>
                  ${titleY}: <span>&nbsp;${y}</span>${unit}
                </div>
              </div>
            </div>
          `;
        },
      },
      legend: {
        show: false,
      },
    });
  };

  return (
    <div id="lineChart">
      <ApexCharts
        type="line"
        width="100%"
        height="290px"
        options={chartOptions}
        series={series}
      />
    </div>
  );
};

export default LineChart;
