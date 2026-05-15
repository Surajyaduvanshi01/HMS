import API from "./axios";

export const getAppointments =
  async () => {
    const { data } = await API.get(
      "/appointments"
    );

    return data;
  };

export const createAppointment =
  async (appointmentData) => {
    const { data } = await API.post(
      "/appointments",
      appointmentData
    );

    return data;
  };

export const updateAppointmentStatus =
  async (id, status) => {
    const { data } = await API.put(
      `/appointments/${id}/status`,
      { status }
    );

    return data;
  };
