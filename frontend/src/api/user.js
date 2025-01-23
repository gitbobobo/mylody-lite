import { queryOptions } from "@tanstack/react-query";
import config from "../common/config";
import { useUserStore } from "../stores/useUserStore";

/// 计算 SHA-256 散列值
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

/// 获取当前用户信息
export const getCurrentUserOptions = (enabled) => {
  return queryOptions({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      console.log("fetch user data");
      const token = localStorage.getItem(config.keys.token);
      if (!token) {
        throw new Error("Cannot find token");
      }
      const response = await fetch(config.server.url + "/api/auth/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Cannot get user data");
      }
      return response.json();
    },
    staleTime: 5 * 1000,
    retry: false,
    enabled,
  });
};

/// 用户登录
export const login = async ({ email, password }) => {
  const hashedPassword = await hashPassword(password);
  const data = { email, password: hashedPassword };
  const response = await fetch(config.server.url + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

/// 用户注册
export const register = async ({ name, email, password }) => {
  const hashedPassword = await hashPassword(password);
  const data = { name, email, password: hashedPassword };
  const response = await fetch(config.server.url + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Register failed");
  }
};

/// 忘记密码
export const forgotPassword = async ({ email }) => {
  const data = { email };
  const response = await fetch(config.server.url + "/api/auth/forgot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Forgot password failed");
  }
};

/// 重置密码
export const resetPassword = async ({ password, code }) => {
  const hashedPassword = await hashPassword(password);
  const data = { password: hashedPassword, token: code };
  const response = await fetch(config.server.url + "/api/auth/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Reset password failed");
  }
};
