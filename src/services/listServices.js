import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// MARKAH / ACTIVITY LIST
export const getUserLists = (volunteerId) => 
  api.get(`/volunteers/${volunteerId}/activity_lists`);

export const saveMarkah = (activityId, listId) => 
  api.post(`/activities/${activityId}/activity_lists`, { list_id: listId });

export const updateMarkah = (activityId, listId) => 
  api.put(`/activities/${activityId}/activity_lists`, { list_id: listId });

export const removeMarkah = (activityId, listId) => 
  api.delete(`/activity_lists/${listId}/activities/${activityId}`);

export const createActivityList = (volunteerId, name) => 
  api.post('/activity_lists', { volunteer_id: volunteerId, name });

export const deleteActivityList = (listId) =>
  api.delete(`/activity_lists/${listId}`);

export const renameActivityList = (listId, newName) => {
  return api.patch(`/activity_lists/${listId}/name`, { name: newName });
};

export default api;
