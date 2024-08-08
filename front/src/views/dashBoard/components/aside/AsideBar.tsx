import React, { useState, useEffect } from "react";
import { TreeList, TreeChildren } from "../../type/dashBoard.types";
import axios from "axios";

// const testTrees: TreeList[] = [
//   {
//     deletedDate: "",
//     id: 1,
//     isProjectCompleted: false,
//     name: "테스트",
//     projectId: 132,
//     projectStatus: 0,
//     showContextMenu: true,
//     taskCount: 1,
//     type: "parent",
//     children: [
//       {
//         id: 2,
//         isProjectCompleted: false,
//         name: "ㄱ",
//         projectId: 132,
//         projectName: "테스트",
//         showContextMenu: true,
//         taskId: 227,
//         type: "children",
//       },
//     ],
//   },
//   {
//     deletedDate: "",
//     id: 3,
//     isProjectCompleted: false,
//     name: "일곱",
//     projectId: 128,
//     projectStatus: 0,
//     showContextMenu: true,
//     taskCount: 1,
//     type: "parent",
//     children: [
//       {
//         id: 4,
//         isProjectCompleted: false,
//         name: "22",
//         projectId: 128,
//         projectName: "일곱",
//         showContextMenu: true,
//         taskId: 223,
//         type: "children",
//       },
//     ],
//   },
//   {
//     deletedDate: "",
//     id: 5,
//     isProjectCompleted: false,
//     name: "여섯",
//     projectId: 118,
//     projectStatus: 0,
//     showContextMenu: true,
//     taskCount: 2,
//     type: "parent",
//     children: [
//       {
//         id: 6,
//         isProjectCompleted: false,
//         name: "일괄 테스트",
//         projectId: 118,
//         projectName: "여섯",
//         showContextMenu: true,
//         taskId: 219,
//         type: "children",
//       },
//       {
//         id: 7,
//         isProjectCompleted: false,
//         name: "여섯",
//         projectId: 118,
//         projectName: "여섯",
//         showContextMenu: true,
//         taskId: 209,
//         type: "children",
//       },
//     ],
//   },
//   {
//     deletedDate: "",
//     id: 8,
//     isProjectCompleted: false,
//     name: "다섯",
//     projectId: 100,
//     projectStatus: 0,
//     showContextMenu: true,
//     taskCount: 1,
//     type: "parent",
//     children: [
//       {
//         id: 9,
//         isProjectCompleted: false,
//         name: "다섯",
//         projectId: 100,
//         projectName: "다섯",
//         showContextMenu: true,
//         taskId: 182,
//         type: "children",
//       },
//     ],
//   },
// ];

type MenuItemProps = {
  item: TreeList;
  selected: number | null;
  onSelect: (id: number) => void;
  onSelectItem: (id: TreeList) => void;
};

type AsideBarProps = {
  onSelectItem: (item: TreeList) => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  selected,
  onSelect,
  onSelectItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const selectParent = () => {
    // console.log("부모 클릭했다 : ", item);
    toggle();
    onSelect(item.id);
    onSelectItem(item);
  };

  const selectChild = (child: TreeChildren) => {
    // console.log("자식 클릭했다 : ", child);
    console.log(child);
  };

  return (
    <div className={`pl-2 py-1 ${selected === item.id ? "bg-blue-100" : ""}`}>
      <div
        onClick={selectParent}
        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200"
      >
        <div
          className={`transform ${
            isOpen ? "rotate-90" : ""
          } transition-transform w-2 h-2 inline-block mr-2`}
          style={{
            clipPath: "polygon(100% 50%, 0 0, 0 100%)",
            backgroundColor: "currentColor",
          }}
        ></div>
        {item.name}
      </div>
      {isOpen &&
        item.children.map((child) => (
          <div
            key={child.id}
            className="pl-2 ml-6 border-l-2 border-gray-200 cursor-pointer hover:bg-gray-100"
            onClick={() => selectChild(child)}
          >
            {child.name}
          </div>
        ))}
    </div>
  );
};

const AsideBar: React.FC<AsideBarProps> = ({ onSelectItem }) => {
  const [trees, setTrees] = useState<TreeList[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    treeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const treeList = async () => {
    setLoading(false);
    try {
      const res = await axios.get("/treedApi/dashboard/common/tree");

      setTrees(res.data);
      setSelected(res.data[0].id);
      onSelectItem(res.data[0]);
      setLoading(true);
    } catch (error) {
      console.error("Error :", error);
      setTrees([]);
      setSelected(0);
      setLoading(true);
    }
  };

  const selectId = (id: number) => {
    setSelected(id);
  };

  return (
    <div className="h-full mx-3 mt-6 overflow-auto bg-gray-100 lg:w-1/5">
      {loading && trees.length === 0 ? (
        <div>트리 데이터 없다</div>
      ) : (
        trees.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            selected={selected}
            onSelect={selectId}
            onSelectItem={onSelectItem}
          />
        ))
      )}
    </div>
  );
};

export default AsideBar;
