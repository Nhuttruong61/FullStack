import axios from "./axios";

export const getActiveEvents = async () => {
  try {
    const res = await axios.get("/event/get-active-events");
    return res.data;
  } catch (e) {
    console.error("Error fetching active events:", e);
    return null;
  }
};

export const getEventById = async (id) => {
  try {
    const res = await axios.get(`/event/get-event/${id}`);
    return res.data;
  } catch (e) {
    console.error("Error fetching event:", e);
    return null;
  }
};

export const getAllEvents = async (page = 1, limit = 10, active = true) => {
  try {
    const res = await axios.get(`/event/get-events?page=${page}&limit=${limit}&active=${active}`);
    return res.data;
  } catch (e) {
    console.error("Error fetching events:", e);
    return null;
  }
};

export const createEvent = async (data) => {
  try {
    const res = await axios.post("/event/create-event", data);
    return res.data;
  } catch (e) {
    console.error("Error creating event:", e);
    throw e;
  }
};

export const updateEvent = async (id, data) => {
  try {
    const res = await axios.put(`/event/update-event/${id}`, data);
    return res.data;
  } catch (e) {
    console.error("Error updating event:", e);
    throw e;
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await axios.delete(`/event/delete-event/${id}`);
    return res.data;
  } catch (e) {
    console.error("Error deleting event:", e);
    throw e;
  }
};
