import request from "@/utils/request";
import qs from "qs";

import { TodoListQueryType, TodoListType } from "@/type";

export async function getTodoList(params?: TodoListQueryType) {
  console.log(`/api/TodoLists?${qs.stringify(params)}`);
  return request.get(`/api/TodoLists?${qs.stringify(params)}`);
}

export async function TodoListAdd(params: TodoListType, status: string, user: string) {
  return request.post("/api/TodoLists", { ...params, status ,user});
}

export async function getTodoListDetail(id: string) {
  return request.get(`/api/TodoLists/${id}`);
}

export async function TodoListUpdate(id: string, params: TodoListType) {
  return request.put(`/api/TodoLists/${id}`, params);
}

export async function TodoListDelete(id: string) {
  return request.delete(`/api/TodoLists/${id}`);
}
