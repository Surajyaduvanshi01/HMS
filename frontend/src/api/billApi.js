import API from "./axios";

export const getBills = async () => {
  const { data } = await API.get(
    "/bills"
  );

  return data;
};

export const createBill = async (
  billData
) => {
  const { data } = await API.post(
    "/bills",
    billData
  );

  return data;
};
