export type opProgressData = {
  total: number;
  done: number;
  percentage: number;
};

export type workStatusFileCount = {
  progress: number[];
  status: string[];
};

export type dailyWorkload = {
  IN: number[];
  OP: number[];
  date: string[];
  type: string;
};

export type MenuItemType = {
  id: number;
  name: string;
  children: MenuItemType[];
};

export type TreeList = {
  deletedDate: string;
  id: number;
  isProjectCompleted: boolean;
  name: string;
  projectId: number;
  projectStatus: number;
  showContextMenu: boolean;
  taskCount: number;
  type: string;
  children: TreeChildren[];
};

export type TreeChildren = {
  id: number;
  isProjectCompleted: boolean;
  name: string;
  projectId: number;
  projectName: string;
  showContextMenu: boolean;
  taskId: number;
  type: string;
};
