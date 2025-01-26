import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getSectionsOptions } from "../../api/section";
import { useQuery } from "@tanstack/react-query";
import EmptyTips from "../../components/EmptyTips";
import LoadingTips from "../../components/LoadingTips";

export default function SectionList() {
  const { t } = useTranslation();
  const { data, isPending } = useQuery(getSectionsOptions());
  if (!isPending) {
    console.log("fetch section data", data);
  }
  return (
    <>
      {isPending ? (
        <LoadingTips />
      ) : (
        <Container maxWidth="sm">
          {data && data.length > 0 ? (
            data.map((section) => (
              <Typography key={section.id}>{section.name}</Typography>
            ))
          ) : (
            <EmptyTips
              description={t("noSectionData")}
              buttonTitle={t("createSection")}
              onAddData={() => console.log("ssss")}
            />
          )}
        </Container>
      )}
    </>
  );
}
