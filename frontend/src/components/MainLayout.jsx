import * as React from "react";
import AppTheme from "./AppTheme";
import {
  CssBaseline,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/HomeRounded";
import ApiIcon from "@mui/icons-material/ApiRounded";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import MylodyAppBar from "./MylodyAppBar";
import { useNavigate, useLocation } from "react-router";

export default function MainLayout(props) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const tabIndex = {
    "/": 0,
    "/interface": 1,
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <MylodyAppBar />
      <Outlet />
      <Paper
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}>
        <BottomNavigation
          showLabels
          value={tabIndex[location.pathname]}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              navigate("/");
            } else {
              navigate("/interface");
            }
          }}>
          <BottomNavigationAction label={t("home")} icon={<HomeIcon />} />
          <BottomNavigationAction label={t("api")} icon={<ApiIcon />} />
        </BottomNavigation>
      </Paper>
    </AppTheme>
  );
}
