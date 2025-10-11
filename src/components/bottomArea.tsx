import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function BottomArea() {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        align='right'
        sx={{
          fontWeight: 500,
          fontSize: "10px",
          // opacity: 0.6,
          color: (theme) =>
            theme.palette.mode === "dark" ? "text.primary" : "#00000066",
        }}
      >
        {t("disclaimer")} <br />
        {t("disclaimerText")} <br /> {t("copyRight")}
      </Typography>
      <Grid container justifyContent='flex-end' gap='16px' sx={{ mt: "5px" }}>
        <Button
          variant='text'
          sx={{
            p: 0,
            fontSize: "10px",
            fontWeight: 500,
            textDecoration: "underline",
            textTransform: "uppercase",
            color: "text.primary",
          }}
        >
          {t("terms")}
        </Button>
        <Button
          variant='text'
          sx={{
            fontSize: "10px",
            fontWeight: 500,
            textDecoration: "underline",
            textTransform: "uppercase",
            color: "text.primary",
            p: 0,
          }}
        >
          {t("privacy")}
        </Button>
        <Button
          variant='text'
          sx={{
            fontSize: "10px",
            fontWeight: 500,
            textDecoration: "underline",
            textTransform: "uppercase",
            color: "text.primary",
            p: 0,
            minWidth: "unset",
          }}
        >
          {t("cookies")}
        </Button>
      </Grid>
    </Box>
  );
}
