import axios from "axios";

export const getBin = async (binRoute: string, token: string) => {
  const response = await axios.get(
    `https://69af2d05c8b37f4998379bb7.mockapi.io/bins/${binRoute}`,
    {
      headers: { Authorization: token },
    },
  );
  return response.data;
};
