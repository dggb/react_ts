import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { workStatusFileCount } from "../../type/dashBoard.types";

type BarChartProps = {
  datas: workStatusFileCount;
};

const BarChart: React.FC<BarChartProps> = ({ datas }) => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [chartOptions, setChartOptions] = useState<object>({});

  useEffect(() => {
    updateSeriesLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);

  const updateSeriesLine = () => {
    const seriesData = [
      {
        name: "할당량",
        data: datas.progress ? datas.progress : [],
      },
    ];

    setSeries(seriesData);
    setChartOptions({
      grid: { show: false },
      colors: ["#5A89D9", "#B7F0EB"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#B7F0EB"],
          stops: [0, 100],
        },
      },
      chart: {
        background: "#fff",
        type: "bar",
        foreColor: "#373d3f",
        toolbar: {
          show: false,
        },
      },
      noData: {
        text: "No data",
        align: "center",
        verticalAlign: "middle",
      },
      plotOptions: {
        bar: {
          columnWidth: "20",
          horizontal: true,
          borderRadius: 10,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: 0,
        offsetX: 30,
        style: {
          fontSize: "12px",
          fontWeight: "400",
          colors: ["#22296A"],
        },
        background: {
          enabled: false,
        },
      },
      xaxis: {
        fontSize: "12px",
        categories: datas.status ? datas.status : [],
        labels: {
          formatter: function (val: number) {
            if (Number.isInteger(val)) return val;
          },
          show: true,
          style: {
            colors: [],
            fontSize: " 12px",
            fontFamily: "Pretendard",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: "12px",
            fontWeight: 500,
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
      tooltip: {
        custom: function ({
          series,
          seriesIndex,
          dataPointIndex,
          w,
        }: {
          series: number[][];
          seriesIndex: number;
          dataPointIndex: number;
          w: { globals: { labels: string[] } };
        }) {
          const label = w.globals.labels[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];

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
                        background-color: #5a89d9;
                      "
                    ></div>
                    <div>파일 수: &nbsp;${value}개</div>
                  </div>
                </div>
              </div>
            `;
        },
      },
      // 하단의 범례
      legend: {
        show: false,
      },
    });
  };

  return (
    <ApexCharts
      type="bar"
      width="100%"
      height="350px"
      options={chartOptions}
      series={series}
    />
  );
};

export default BarChart;
