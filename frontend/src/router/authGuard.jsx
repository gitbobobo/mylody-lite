// src/AuthGuard.js
import React, { useEffect } from "react";
import { Navigate } from "react-router";
import LoadingTips from "../components/LoadingTips";
import { useUserStore } from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOptions } from "../api/user";
import { getSystemInfoOptions } from "../api/system";

const AuthGuard = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const { isPending: isSystemPending, data: systemInfo } = useQuery(
    getSystemInfoOptions()
  );
  // 不存在用户数据时，显示进度条，并尝试从服务端获取用户数据
  const { isPending, isError, data } = useQuery(
    getCurrentUserOptions(!!systemInfo)
  );
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  if (!user) {
    if (isSystemPending || isPending) {
      return <LoadingTips />;
    } else if (isError) {
      if (systemInfo["can_register"]) {
        return <Navigate to="/signup" />;
      }
      return <Navigate to="/login" />;
    }
  }

  // 如果用户已认证，渲染子组件
  return children;
};

export default AuthGuard;
