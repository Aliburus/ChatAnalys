import axios from "axios";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

export const analyzeContent = async (content: string) => {
  const response = await axios.post("/api/analyze", { content });
  return response.data;
};
