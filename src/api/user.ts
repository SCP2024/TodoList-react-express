import request from "@/utils/request";
import qs from "qs";

import { UserQueryType, UserType } from "../type";

export async function getUserList(params?: UserQueryType) {
  console.log(`/api/users?${qs.stringify(params)}`);
  return request.get(`/api/users?${qs.stringify(params)}`);
}

export async function getUserDetail(id: string) {
  return request.get(`/api/users/${id}`);
}

export async function userAdd(params: UserType) {
  return request.post("/api/users", params);
}

export async function userDelete(id: string) {
  return request.delete(`/api/users/${id}`);
}

export async function userUpdate(id:string , params: UserType) {
  return request.put(`/api/users/${id}`, params);
}

export async function login(params: Pick<UserType, "name" | "password">) {
  return request.post("/api/login", params);
}

export async function logout() {
  return request.get("/api/logout");
}

export async function register(params: Pick<UserType, "name" | "password">) {
  return request.post("/api/register", params);
}
