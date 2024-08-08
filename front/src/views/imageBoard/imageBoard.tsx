import React, { useState, useEffect } from "react";
import axios from "axios";
import { commonBoard } from "@/common/types/ImageBoard/ImageBoard.types";
import { ImageBoard } from "@/services/index";
import ImageList from "./components/imageList";

const List: React.FC = () => {
  const [createImages, setCreateImages] = useState<commonBoard["ImageBoard"][]>(
    []
  );
  const [selectImages, setSelectImages] = useState<commonBoard["ImageBoard"][]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

  const createImage = async () => {
    const random = Math.floor(Math.random() * 10) + 1;
    // if (createImages.length > 0) {
    //   alert("이미 생성 한 이미지가 있습니다.");
    //   return;
    // }

    try {
      const image = await axios.get(
        `https://picsum.photos/v2/list?page=${random}&limit=100`
      );
      setCreateImages((prevImages) => [...prevImages, ...image.data]);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
      alert("이미지를 불러오는 중에 오류가 발생했습니다.");
    }
  };

  const insertImage = async () => {
    if (!createImages.length) {
      alert("생성 한 이미지가 없습니다.");
      return;
    }

    await ImageBoard.insertImageBoard(createImages);
    setCreateImages([]);
  };

  const selectImage = async () => {
    const payload = {
      limit: 10,
      page: 1,
    };

    const result = await ImageBoard.getImageBoards(payload);

    setSelectImages(result);
  };

  const moveScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      nextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", moveScroll);
    return () => window.removeEventListener("scroll", moveScroll);
  });

  const nextPage = async () => {
    const nextPage = currentPage + 1;
    const payload = {
      limit: 10,
      page: nextPage,
    };

    try {
      const result = await ImageBoard.getImageBoards(payload);
      setSelectImages((prevImages) => [...prevImages, ...result]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading next page:", error);
    }
  };

  const deleteImage = async () => {
    await ImageBoard.deleteImageBoards();
    setCreateImages([]);
    setSelectImages([]);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <div className="flex">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              이미지 게시판
            </h2>
            <button
              type="button"
              className="px-3 py-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={createImage}
            >
              이미지 생성
            </button>

            <button
              type="button"
              className="px-3 py-2 ml-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={insertImage}
            >
              DB 이미지 넣기
            </button>

            <button
              type="button"
              className="px-3 py-2 ml-2 text-sm font-semibold text-white bg-yellow-600 rounded-md shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              onClick={selectImage}
            >
              이미지 불러오기
            </button>

            <button
              type="button"
              className="px-3 py-2 ml-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={deleteImage}
            >
              이미지 삭제
            </button>

            <div className="mt-1 ml-2 text-lg font-bold tracking-tight text-gray-900">
              생성 한 이미지 개수 : {createImages.length}
            </div>
          </div>

          <ImageList images={selectImages} />
        </div>
      </div>
    </div>
  );
};

export default List;
