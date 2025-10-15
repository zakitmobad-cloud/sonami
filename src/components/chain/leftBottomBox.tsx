import { Link } from "react-router-dom";
import { Box, Grid, Typography, Divider, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
export default function LeftBottomBox() {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const matches450 = useMediaQuery((theme) => theme.breakpoints.down(450));

  const { t } = useTranslation();

  const downloadWhitePaper = () => {
    window.open("/whitepaper.pdf", "_blank");
  };
  return (
    <LeftBottomBoxLayout sx={{ px: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          pt: { xs: "0px ", md: "32px" },
          px: { xs: "15px", md: "30px" },
        }}
      >
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ mt: "36px" }}
        >
          <Grid sx={{ flex: 1 }}>
            <Link to='/' style={{ textDecoration: "none" }}>
              <Grid
                container
                wrap='nowrap'
                alignItems='center'
                sx={{ gap: "15px" }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='8'
                  height='15'
                  fill='none'
                  viewBox='0 0 8 15'
                >
                  <path
                    stroke='url(#paint0_linear_16_3116)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m7 13.5-6-6 6-6'
                  ></path>
                  <defs>
                    <linearGradient
                      id='paint0_linear_16_3116'
                      x1='4'
                      x2='4'
                      y1='1.5'
                      y2='13.5'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#0404AE'></stop>
                      <stop offset='0.48' stopColor='#2575DD'></stop>
                      <stop offset='1' stopColor='#0404AE'></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <Typography
                  variant='subtitle1'
                  sx={{
                    background:
                      "linear-gradient(180deg, #0404AE 0%, #2575DD 48%, #0404AE 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text", // For Firefox (not always needed)
                    color: "transparent",
                    lineHeight: "22px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    fontSize: matches450 ? "12px" : "16px",
                  }}
                >
                  {matches450
                    ? t("chain.leftBottomBox.back")
                    : t("chain.leftBottomBox.backToHome")}
                </Typography>
              </Grid>
            </Link>
          </Grid>
          <Grid>
            <Typography
              variant='subtitle1'
              sx={{
                background:
                  "linear-gradient(180deg, #0404AE 0%, #2575DD 48%, #0404AE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text", // For Firefox (not always needed)
                color: "transparent",
                lineHeight: "22px",
                fontWeight: 500,
                fontSize: matches450 ? "12px" : "16px",
                textTransform: "uppercase",
                pb: "4px",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={downloadWhitePaper}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-2px",
                  width: "100%",
                  height: "1px",
                  background:
                    "linear-gradient(180deg, #0404AE 0%, #2575DD 48%, #0404AE 100%)",
                }}
              />

              {t("chain.leftBottomBox.whitePaper")}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant='h1'
          sx={{
            mt: "33px",
            color: (theme) =>
              theme.palette.mode === "dark" ? "text.primary" : "primary.main",
            fontSize: "30px",
            lineHeight: "36px",
            fontWeight: 500,
            textTransform: "uppercase",
            whiteSpace: "break-spaces",
          }}
        >
          {t("chain.leftBottomBox.title")}
        </Typography>

        <Typography
          variant='body1'
          sx={{
            mt: "30px",
            fontFamily: "Inter",
            color: (theme) =>
              theme.palette.mode === "dark" ? "text.primary" : "#000",
            fontSize: "17px",
            lineHeight: "28px",
            fontWeight: 700,
          }}
        >
          {t("chain.leftBottomBox.description")}
        </Typography>

        {!matchesSM && (
          <Grid
            sx={{
              mx: "auto",
              mt: "33px",
              mb: { lg: "160px", xs: "30px" },
              width: "30%",
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
      </Box>
    </LeftBottomBoxLayout>
  );
}
