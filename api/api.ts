import axios from "axios";

export const getProjects = async () => {
  try {
    const res = await axios.get("http://localhost:3000/getProjects");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCohortMembers = async (formData: FormData) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/updateCohortMembers",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateClockifyHours = async (formData: FormData) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/updateClockifyHours",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const downloadCSV = async (csvOption: string) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/downloadCSV",
      { csvOption },
      {
        responseType: "blob",
      }
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};
