import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ApiList() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {/* <MylodyAppBar /> */}
        <Typography variant="h4" component="h1" sx={{ mb: 2, mt: 16 }}>
          接口
        </Typography>
        {/* <SectionListTable /> */}
      </Box>
    </Container>
  );
}
