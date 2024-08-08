import { commonBoard } from "@/common/types/ImageBoard/ImageBoard.types";

type boardLimit = {
  limit: number;
  page: number;
};

export type ImageBoardData = {
  getImageBoards(payload: boardLimit): Promise<commonBoard["ImageBoard"][]>;
  insertImageBoard(
    items: commonBoard["ImageBoard"][]
  ): Promise<commonBoard["ImageBoard"][]>;
  deleteImageBoards(): Promise<void>;
};
