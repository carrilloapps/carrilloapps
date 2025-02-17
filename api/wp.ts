import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://mi.carrillo.app/wp-json",
  headers: {
    "Content-Type": "application/json",
  },
});

//apiClient.interceptors.request.use(
//  (config) => {
//    const token = localStorage.getItem("jwtToken");
//    if (token) {
//      config.headers.Authorization = `Bearer ${token}`;
//    }
//    return config;
//  },
//  (error) => {
//    return Promise.reject(error);
//  }
//);

apiClient.interceptors.response.use(
  (response) => {
//    console.log("Respuesta recibida:", response);
    return response;
  },
  (error) => {
    console.error("Error en la respuesta:", error);
    return Promise.reject(error);
  }
);

interface AuthResponse {
  token: string;
}

export const authenticateUser = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const response = await apiClient.post<AuthResponse>("/jwt-auth/v1/token", {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    throw error;
  }
};

export default apiClient;
