import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
import { useTranslation } from "react-i18next";

export default function LeftBottomBox() {
  const muiTheme = useTheme();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const { t } = useTranslation();

  const steps = t("devUpdates.leftBottomBox.steps", {
    returnObjects: true,
  }) as {
    title: string;
    date: string;
    description: string;
  }[];
  return (
    <LeftBottomBoxLayout>
      {!matchesSM && (
        <Box
          sx={{
            position: "absolute",
            //right: "-48px",
            top: "27px",
            right: "-40px",

            zIndex: 120,
          }}
        >
          <img
            src='/dev/plant.png'
            style={{
              rotate: "45deg",
              width: "108px",
              height: "73px",
              userSelect: "none",
            }}
            draggable={false}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          zIndex: 1,
          backgroundColor: "transparent",
          m: {
            xs: "15px 0px",
            md: matchesSM ? "24px 0px 35px 0px" : "56px 0px 35px 0px",
          },

          pb: steps.length < 3 && !matchesSM ? "90px" : "0px",
          px: { xs: "0px", md: matchesSM ? "0px" : "17px" },
          maxHeight: "390px",
          overflowY: "auto",
          "::-webkit-scrollbar": { width: "16px" },
          "::-webkit-scrollbar-track": {
            backgroundColor: muiTheme.palette.background.paper,
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor:
              muiTheme.palette.mode === "dark"
                ? muiTheme.palette.background.default
                : muiTheme.palette.primary["600"],
            borderRadius: "0px",
          },
        }}
      >
        {!matchesSM && (
          <Box
            sx={{
              position: "absolute",
              //right: "-48px",
              height: "95%",
              top: "15px",
              right: "5%",
              zIndex: 0,
            }}
          >
            <img
              src='/dev/snake.png'
              style={{
                userSelect: "none",
                height: "inherit",
                //rotate: "-180deg",
              }}
              draggable={false}
            />
          </Box>
        )}
        {!matchesSM && (
          <Box
            sx={{
              position: "absolute",
              //right: "-48px",
              top: "5%",
              left: "20px",
              height: "95%",
              zIndex: 0,
              opacity: 0.5,
            }}
          >
            <img
              src='/dev/fish.png'
              style={{
                userSelect: "none",
                //rotate: "-180deg",
              }}
              draggable={false}
            />
          </Box>
        )}
        {!matchesSM && (
          <Box
            sx={{
              position: "absolute",
              //right: "-48px",
              bottom: "0px",
              left: "20%",
              zIndex: 0,
              opacity: 0.5,
              //height: "95%",
            }}
          >
            <img
              src='/dev/plant.png'
              style={{
                userSelect: "none",
                //rotate: "-180deg",
              }}
              draggable={false}
            />
          </Box>
        )}
        {steps.map((step, i) => (
          <Grid
            key={i}
            sx={{
              width: "100%",
              border: `2px solid ${muiTheme.palette.background.paper}`,
              borderTop:
                i > 0 ? 0 : `2px solid ${muiTheme.palette.background.paper}`,
              backgroundColor: `${muiTheme.palette.background.paper}80`,
              backdropFilter: "blur(14px)",
              p: { xs: "30px 15px", md: "35px 35px" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "24px" }}>
              <Typography
                variant='subtitle2'
                sx={{
                  fontSize: "21px",
                  fontWeight: 500,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "text.primary" : "#000",
                  textTransform: "uppercase",
                  lineHeight: "25px",
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "text.primary" : "#000",
                  textTransform: "uppercase",
                  lineHeight: "25px",
                }}
              >
                {step.date}
              </Typography>
            </Box>
            <Typography
              variant='body1'
              sx={{
                fontWeight: 600,
                mt: "11px",
                fontFamily: "Inter",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "text.primary" : "#000",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              {step.description}
            </Typography>
          </Grid>
        ))}
      </Box>
    </LeftBottomBoxLayout>
  );
}
