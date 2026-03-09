import axios from "axios";
import type { Bin, CreateBinPayload } from "../../types/request-bin";

// const API_BASE_URL = "http://localhost:3000";

// const apiClient =



const createBin = async (url: string, authToken: string): Promise<Bin> => {
  try {
    const payload: CreateBinPayload = {
      bin_route: url,
      send_url: `/in/${url}`,
      view_url: `/bins/${url}`,
      token: authToken,
    };
    const response = await axios.post<Bin>(
      "https://69ade7f2b50a169ec8808476.mockapi.io/bins/bins",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create a new bin.", error);
    throw error;
  }
};

// const createBin = async () => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/bins`, {});
//     return response.data;
//   } catch (error) {
//     console.error("Failed to create a new bin.", error);
//     throw error;
//   }
// };

export { createBin };
