import React, { useState } from "react";
import axios from "axios";

//todo ile ilgili fonksiyonları custom hooksta topladık
const useAxios = () => {
  const [todos, setTodos] = useState<TodoType[]>([]); //TodoType array olarak kabul ediyor
  const url: string = import.meta.env.VITE_BASE_URL;
  const getTodos = async () => {
    const { data } = await axios.get<TodoType[]>(url); //gelen response a göre belirledik bu ne işe yarıyor gelen datanın fieldlarına erişebiliyoruz
    // console.log(data)
    setTodos(data);
  };
  const addTodo: AddFn = async (text) => {
    const newTodo = {
      task: text,
      isDone: false,
    };
    const { data } = await axios.post<TodoType>(url, newTodo);
    if (data) {
      getTodos();
    }
  };

  const toggleTodo: ToggleFn = async (item) => {
    const updateTodo = {
      id: item.id,
      task: item.task,
      isDone: !item.isDone,
    };
    const { data } = await axios.put<TodoType>(`${url}/${item.id}`, updateTodo);
    if (data) {
      getTodos();
    }
  };
  const deleteTodo: DeleteFn = async (id) => {
    try {
      const res = await axios.delete<TodoType>(`${url}/${id}`);
      console.log(res);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  return { todos, getTodos, addTodo, deleteTodo, toggleTodo };
};

export default useAxios;
