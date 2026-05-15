import API from "./axios";

export const getDoctors = async () => {
  const { data } = await API.get(
    "/doctors"
  );

  return data;
};

export const addDoctor = async (
  doctorData
) => {
  const { data } = await API.post(
    "/doctors",
    doctorData
  );

  return data;
};
