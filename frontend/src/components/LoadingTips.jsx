import { Box, LinearProgress } from "@mui/material";

export default function LoadingTips() {
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
}
