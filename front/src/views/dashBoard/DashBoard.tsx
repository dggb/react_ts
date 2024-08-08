import React, { useEffect, useState, useCallback } from "react";
import RadialBar from "./components/chart/radial-bar.tsx";
import BarChart from "./components/chart/bar-chart.tsx";
import LineChart from "./components/chart/line-chart.tsx";
import AsideBar from "./components/aside/AsideBar.tsx";
import axios from "axios";

import {
  opProgressData,
  workStatusFileCount,
  dailyWorkload,
  TreeList,
} from "./type/dashBoard.types.ts";
import "./style/style.css";

const DashBoard: React.FC = () => {
  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    fontWeight: 500,
    fontSize: "16px",
    color: "#22296a",
    marginTop: "-10px",
  };

  const opProgressDefaultData: opProgressData = {
    total: 0,
    done: 0,
    percentage: 0,
  };

  const insProgressDefaultData: opProgressData = {
    total: 0,
    done: 0,
    percentage: 0,
  };

  const workStatusFileDefaultData: workStatusFileCount = {
    progress: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    status: [
      "작업 전",
      "작업 중",
      "작업 완료",
      "삭제",
      "검수 중",
      "검수 반려",
      "검수 완료",
      "검수 완료(일괄)",
      "삭제 완료",
      "삭제 완료(일괄)",
      "",
    ],
  };

  const dailyWorkloadWorkPieceDefaultData: dailyWorkload = {
    IN: [0, 0, 0, 0, 0, 0, 0],
    OP: [0, 0, 0, 0, 0, 0, 0],
    date: ["04-10", "04-11", "04-12", "04-13", "04-14", "04-15", "04-16"],
    type: "fileCount",
  };

  const dailyWorkloadWorkerDefaultData: dailyWorkload = {
    IN: [0, 0, 0, 0, 0, 0, 0],
    OP: [0, 0, 0, 0, 0, 0, 0],
    date: ["04-10", "04-11", "04-12", "04-13", "04-14", "04-15", "04-16"],
    type: "personCount",
  };

  const [selectedItem, setSelectedItem] = useState<TreeList | null>(null);
  const [opProgressData, setOpProgressData] = useState<opProgressData | null>(
    null
  );
  const [insProgressData, setInsProgressData] = useState<opProgressData | null>(
    null
  );
  const [workStatusFileData, setWorkStatusFileData] =
    useState<workStatusFileCount | null>(null);
  const [dailyWorkloadWorkerData, setDailyWorkloadWorkerData] =
    useState<dailyWorkload | null>(null);
  const [dailyWorkloadWorkPieceData, setDailyWorkloadWorkPieceData] =
    useState<dailyWorkload | null>(null);
  const [projectId, setProjectId] = useState<number>();

  const selectItem = (item: TreeList) => {
    setSelectedItem(item);
    setProjectId(item.projectId);
  };

  const radialBarData = useCallback(async () => {
    try {
      const res = await axios.get(
        `/treedApi/dashboard/summary/project/${projectId}/progress/total`
      );

      const { inspectionCount, operationCount } = res.data.progress;

      setOpProgressData(operationCount);
      setInsProgressData(inspectionCount);
    } catch (error) {
      console.log("Error : ", error);
    }
  }, [projectId]);

  const barChartData = useCallback(async () => {
    try {
      const res = await axios.get(
        `/treedApi/dashboard/summary/project/${projectId}/progress/task-status`
      );

      const status: string[] = [];
      const progress: number[] = [];
      for (const work of res.data.progress) {
        status.push(setWorkCode(work.status));
        progress.push(work.entityCount.done);
      }

      setWorkStatusFileData({
        status: status,
        progress: progress,
      });
    } catch (error) {
      console.log("Error : ", error);
    }
  }, [projectId]);

  const lineChartData = useCallback(async () => {
    try {
      const res = await axios.get(
        `/treedApi/dashboard/summary/project/${projectId}/workload/daily?term=${7}`
      );

      const workload = res.data.workload;
      const dates: string[] = [];
      const workPieceOP: number[] = [];
      const workPieceIN: number[] = [];
      const workerOP: number[] = [];
      const workerIN: number[] = [];

      for (const work of workload.dailyWorkloads) {
        dates.push(work.date.slice(5));
        workPieceOP.push(work.operationCount);
        workPieceIN.push(work.inspectionCount);
        workerOP.push(work.operatorCount);
        workerIN.push(work.inspectorCount);
      }

      setDailyWorkloadWorkPieceData({
        type: "fileCount",
        date: dates,
        OP: workPieceOP,
        IN: workPieceIN,
      });

      setDailyWorkloadWorkerData({
        type: "personCount",
        date: dates,
        OP: workerOP,
        IN: workerIN,
      });
    } catch (error) {
      console.log("Error : ", error);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId === undefined) {
      return;
    }
    radialBarData();
    barChartData();
    lineChartData();
  }, [projectId, radialBarData, barChartData, lineChartData]);

  const setWorkCode = (code: number) => {
    let str = "";
    switch (code) {
      case 0:
        str = "작업 전";
        break;
      case 1:
        str = "작업 중";
        break;
      case 2:
        str = "작업 완료";
        break;
      case 3:
        str = "삭제";
        break;
      case 4:
        str = "검수 중";
        break;
      case 5:
        str = "검수 반려";
        break;
      case 6:
        str = "검수 완료";
        break;
      case 7:
        str = "검수 완료(일괄)";
        break;
      case 8:
        str = "삭제 완료";
        break;
      case 9:
        str = "삭제 완료(일괄)";
        break;
    }
    return str;
  };
  return (
    <div className=" lg:flex">
      <AsideBar onSelectItem={selectItem} />

      {selectedItem && (
        <div className="flex-1">
          <div className="mt-6 ml-3">
            {" "}
            {selectedItem ? selectedItem.name : "테스트"}{" "}
          </div>
          <div className="mx-3 mt-6 lg:grid lg:grid-cols-2 lg:gap-x-5 ">
            <div>
              <div className="w-full border rounded-lg shadow-xl aspect-h-2 aspect-w-3 border-white-600 h-[330px] mb-5">
                <div className="font-[500] pt-[30px] pl-[30px] text-[18px]">
                  전체 작업 진행률
                </div>
                <div>
                  <div className="flex justify-center ">
                    <div className="w-full lg:w-1/2 max-w-[280px] mx-auto">
                      <div className="h-auto lg:h-[280px]">
                        <RadialBar
                          datas={
                            opProgressData
                              ? opProgressData
                              : opProgressDefaultData
                          }
                        />
                        <div style={titleStyle}>작업 진행률</div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 max-w-[280px] mx-auto">
                      <div className="h-auto lg:h-[280px]">
                        <RadialBar
                          datas={
                            insProgressData
                              ? insProgressData
                              : insProgressDefaultData
                          }
                        />
                        <div style={titleStyle}>검수 진행률</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full border rounded-lg shadow-xl aspect-h-2 aspect-w-3 border-white-600 h-[416px] mb-5">
                <div className="font-[500] pt-[30px] pl-[30px] text-[18px]">
                  작업 상태별 파일 수
                </div>
                <div className="justify-center pr-[30px] pl-[30px]">
                  <BarChart
                    datas={
                      workStatusFileData
                        ? workStatusFileData
                        : workStatusFileDefaultData
                    }
                  />
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-xl border border-white-600 lg:block h-[766px] w-full lg:gap-y-8 mb-5">
              <div className="font-[500] pt-[30px] pl-[30px] text-[18px]">
                일별 작업 현황
              </div>
              <div className="mt-3 ">
                <div>
                  <div className="lineChart">
                    <div className="title tc-333">파일 수</div>
                    <div className="flex items-center legend">
                      <div className="circle work-color"></div>
                      <span>작업</span>
                      <div className="circle inspect-color"></div>
                      <span>검수</span>
                    </div>
                  </div>
                  <LineChart
                    datas={
                      dailyWorkloadWorkPieceData
                        ? dailyWorkloadWorkPieceData
                        : dailyWorkloadWorkPieceDefaultData
                    }
                  />
                </div>
                <div>
                  <div className="lineChart">
                    <div className="title tc-333">작업자 수</div>
                    <div className="flex items-center legend">
                      <div className="circle work-color"></div>
                      <span>작업자</span>
                      <div className="circle inspect-color"></div>
                      <span>검수자</span>
                    </div>
                  </div>
                  <LineChart
                    datas={
                      dailyWorkloadWorkerData
                        ? dailyWorkloadWorkerData
                        : dailyWorkloadWorkerDefaultData
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
