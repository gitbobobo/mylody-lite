import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ColorModeIconDropdown from "./ColorModeIconDropdown";
import Sitemark from "./SitemarkIcon";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import ApiIcon from "@mui/icons-material/ApiRounded";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backdropFilter: "blur(24px)",
  borderBottom: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  padding: "8px 12px",
  boxShadow: (theme.vars || theme).shadows[1],
}));

export default function AppAppBar() {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
      }}>
      <StyledToolbar variant="dense" disableGutters>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
          <Sitemark />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}>
            <Button
              variant={location.pathname === "/" ? "outlined" : "text"}
              color="info"
              size="small"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}>
              {t("home")}
            </Button>
            <Button
              variant={location.pathname === "/interface" ? "outlined" : "text"}
              color="info"
              size="small"
              startIcon={<ApiIcon />}
              onClick={() => navigate("/interface")}>
              {t("api")}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}>
          <ColorModeIconDropdown />
          <IconButton aria-label="logout" size="small" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
