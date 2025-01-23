// src/AuthGuard.js
import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useUserStore } from "../stores/useUserStore";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
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
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}>
          <LinearProgress sx={{ height: 4, width: "30%", borderRadius: 2 }} />
        </Box>
      );
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
