import API from "./axios";

export const getDashboardStats = async () => {
  const { data } = await API.get(
    "/analytics/dashboard"
  );

  return data;
};

export const getRevenueAnalytics =
  async () => {
    const { data } = await API.get(
      "/analytics/monthly-revenue"
    );

    return data;
  };

export const getGenderAnalytics =
  async () => {
    const { data } = await API.get(
      "/analytics/gender-distribution"
    );

    return data;
  };
