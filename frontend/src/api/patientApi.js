import API from "./axios";

export const getPatients = async (
  search = ""
) => {
  const { data } = await API.get(
    `/patients?search=${search}`
  );

  return data;
};

export const addPatient = async (
  patientData
) => {
  const { data } = await API.post(
    "/patients",
    patientData
  );

  return data;
};

export const deletePatient = async (
  id
) => {
  const { data } = await API.delete(
    `/patients/${id}`
  );

  return data;
};
