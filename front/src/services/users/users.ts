import api from "../api";
import { UserData } from "./users.types";

export const User: UserData = {
  getUsers: async () => {
    try {
      const response = await api.get("/api/member");
      return response.data;
    } catch (error) {
      console.error("error : ", error);
      throw new Error();
    }
  },
};
