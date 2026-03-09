import axios from "axios";
import type { Bin } from "../../types/request-bin";

// const API_BASE_URL = "http://localhost:3000";

// const apiClient =



// const getAllBins = async (): Promise<Bin[] | null> => {
// 	try {
// 		const response = await
// 	}
//   axios.get("http://localhost:3000").then((response) => {
//     setBins(response.data).catch((err) => {
//       console.error(err);
//     });
//   });
// };


const createBin = async (url: string, authToken: string) => {
  try {
    const response = await axios.post(
      "https://69ade7f2b50a169ec8808476.mockapi.io/bins/bins",
    { bin_route: url, send_url: `/in/${url}`, view_url: `/bins/${url}`, token: authToken }
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
