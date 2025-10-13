import {
  Box,
  Chip,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
import { useTranslation } from "react-i18next";

export default function LeftBottomBox() {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const { t } = useTranslation();
  const tags = t("home.leftBottomBox.tags", {
    returnObjects: true,
  }) as string[];
  return (
    <LeftBottomBoxLayout>
      <Grid
        container
        alignItems='center'
        //gap={"20px"}
        sx={{ position: "relative", width: "100%" }}
      >
        {!matchesSM && (
          <Box
            sx={{
              position: "absolute",
              top: { lg: 0, md: "10%" },
              width: "34.3%",
              left: "-30px",
            }}
          >
            <img src='/dev/bear.png' style={{ width: "100%" }} />
          </Box>
        )}
        <Grid size={{ md: matchesSM ? 0 : 4, xs: 0 }}></Grid>
        <Grid sx={{ flex: 1 }}>
          <Typography
            variant='h1'
            sx={{
              mt: matchesSM ? 0 : "65px",
              color: (theme) =>
                theme.palette.mode === "dark" ? "text.primary" : "primary.main",
              fontSize: "30px",
              lineHeight: "36px",
              fontWeight: 500,
              textTransform: "uppercase",
              whiteSpace: "break-spaces",
            }}
          >
            {t("home.leftBottomBox.title")}
          </Typography>

          <Grid container sx={{ mt: 1 }} spacing={1}>
            {tags.map((tag, index) => (
              <Grid key={index}>
                <Chip
                  variant='outlined'
                  label={tag}
                  sx={{
                    fontWeight: 500,
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "text.primary" : "#000",
                    borderColor: (theme) =>
                      theme.palette.mode === "dark" ? "text.primary" : "#000",
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Typography
            variant='body1'
            sx={{
              mt: 2,
              fontFamily: "Inter",
              color: (theme) =>
                theme.palette.mode === "dark" ? "text.primary" : "#000",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            {t("home.leftBottomBox.description")}
          </Typography>

          {!matchesSM && (
            <Grid
              sx={{
                mt: { xl: "90px", lg: "60px", md: "50px" },
                mb: { xl: "60px", lg: "40px", md: "30px" },
                width: "50%",
              }}
            >
              <Divider
                sx={{
                  borderWidth: "2px",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "text.primary" : "#439ED7",
                }}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </LeftBottomBoxLayout>
  );
}
