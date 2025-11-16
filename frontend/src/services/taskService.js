// services/taskService.js
import API from '../api';

export const fetchTasks = async (params) => {
  try {
    const response = await API.get('/tasks', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTask = async (id) => {
  try {
    const response = await API.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

export const createTask = async (payload) => {
  try {
    const response = await API.post('/tasks', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id, payload) => {
  try {
    const response = await API.put(`/tasks/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const patchTask = async (id, payload) => {
  try {
    const response = await API.patch(`/tasks/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error patching task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};