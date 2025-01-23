import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

export default function ColorModeSelect(props) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  console.log(mode);
  const { t } = useTranslation();
  return (
    <Select
      value={mode}
      onChange={(event) => setMode(event.target.value)}
      SelectDisplayProps={{
        "data-screenshot": "toggle-mode",
      }}
      {...props}>
      <MenuItem value="system">{t("followSystem")}</MenuItem>
      <MenuItem value="light">{t("day")}</MenuItem>
      <MenuItem value="dark">{t("night")}</MenuItem>
    </Select>
  );
}
