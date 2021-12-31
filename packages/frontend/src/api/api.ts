import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export const PORT = 5000;

export const API_URL = `http://localhost:${PORT}/api`;

export async function api<T>(
  path: string,
  method: "POST" | "GET" | "DELETE" | "PUT",
  body?: object
): Promise<T> {
  const config: AxiosRequestConfig = {
    url: `${path}`,
    baseURL: `${API_URL}`,
    data: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
    method: method as Method,
  };
  const response: AxiosResponse = await axios(config);
  return response.data;
}
