import api from "../api";
import { ImageBoardData } from "./imageBoard.types";

export const ImageBoard: ImageBoardData = {
  getImageBoards: async (payload) => {
    try {
      const response = await api.get("/api/imageboard", { params: payload });
      return response.data;
    } catch (error) {
      alert(error);
      console.error("error : ", error);
      throw new Error();
    }
  },

  insertImageBoard: async (items) => {
    try {
      const response = await api.post(
        "/api/imageboard/insertImageBoard",
        items
      );
      return response.data;
    } catch (error) {
      alert(error);
      console.error("error : ", error);
      throw new Error();
    }
  },

  deleteImageBoards: async () => {
    try {
      const response = await api.delete("/api/imageboard/deleteImageBoard");
      return response.data;
    } catch (error) {
      alert(error);
      console.error("error : ", error);
      throw new Error();
    }
  },
};
