import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MylodyAppBar from "../components/MylodyAppBar";
import AppTheme from "../components/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/HomeRounded";
import ApiIcon from "@mui/icons-material/ApiRounded";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

export default function App(props) {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <MylodyAppBar />
          <Typography variant="h4" component="h1" sx={{ mb: 2, mt: 16 }}>
            Mylody Lite
          </Typography>
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
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}>
              <BottomNavigationAction label={t("home")} icon={<HomeIcon />} />
              <BottomNavigationAction label={t("api")} icon={<ApiIcon />} />
            </BottomNavigation>
          </Paper>
        </Box>
      </Container>
    </AppTheme>
  );
}
