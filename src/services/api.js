
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const fetchTodos = async () => {
  const { data } = await axios.get(`${API_URL}/todos`)
  return data
}

export const createTodo = async (todo) => {
  const { data } = await axios.post(`${API_URL}/todos`, todo)
  return data
}

export const updateTodo = async (id, updatedTodo) => {
  const { data } = await axios.put(`${API_URL}/todos/${id}`, updatedTodo)
  return data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/todos/${id}`)
}
