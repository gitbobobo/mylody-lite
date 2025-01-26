import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { useTranslation } from "react-i18next";

function EmptyStateCard({ description, buttonTitle, onAddData }) {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh">
      <Card
        style={{
          minWidth: 300,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}>
        <CardContent>
          <InboxIcon style={{ fontSize: 80 }} />
          <Typography variant="h6" sx={{ my: 1 }}>
            {t("noData")}
          </Typography>
          {description && (
            <Typography variant="body1" sx={{ my: 1 }}>
              {description}
            </Typography>
          )}
          {buttonTitle && (
            <Button variant="contained" color="primary" onClick={onAddData}>
              {buttonTitle}
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default EmptyStateCard;
