import axios from "./axios";

export const getBanner = async () => {
  try {
    const res = await axios.get("/slider/get-slider");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
