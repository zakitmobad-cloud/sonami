import {
  Box,
  Chip,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
import { useTranslation } from "react-i18next";

export default function LeftBottomBox() {
  const muiTheme = useTheme();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const { t } = useTranslation();

  const steps = [
    {
      title: t("howToBuy.leftBottomBox.1.title"),
      description: t("howToBuy.leftBottomBox.1.description"),
      buttonText: t("howToBuy.leftBottomBox.1.download"),
      img: "/dev/how-to-buy-1.png",
      icons: ["/dev/how-to-buy-1-icon1.png"],
    },
    {
      title: t("howToBuy.leftBottomBox.2.title"),
      description: t("howToBuy.leftBottomBox.2.description"),
      img: "/dev/how-to-buy-2.png",
      icons: [
        "/dev/how-to-buy-2-icon1.png",
        "/dev/how-to-buy-2-icon2.png",
        "/dev/how-to-buy-2-icon3.png",
      ],
    },
    {
      title: t("howToBuy.leftBottomBox.3.title"),
      description: t("howToBuy.leftBottomBox.3.description"),
      buttonText: t("howToBuy.leftBottomBox.3.stack"),
      img: "/dev/how-to-buy-3.png",
    },
  ];
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

      <Grid
        container
        direction={matchesSM ? "column" : "row"}
        gap={matchesSM ? "30px" : "14px"}
        sx={{
          position: "relative",

          zIndex: 1,
          backgroundColor: "transparent",
          m: {
            xs: "15px 10px",
            md: matchesSM ? "24px 0px 35px 0px" : "56px 0px 35px 0px",
          },
          px: { xs: "5px", md: matchesSM ? "10px" : "17px" },
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
        {steps.map((step, i) => (
          <Grid
            key={i}
            //size={{ xs: 12, md: matchesSM ? 12 : 4 }}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              background: `url(${step.img})`,
              backgroundSize: "100% 100%",
              // backdropFilter: "blur(14px)",
              px: { xs: "10px", md: "20px" },
              pt: "26px",
              pb: "70px",
            }}
          >
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
              variant='body1'
              sx={{
                mt: "23px",
                fontFamily: "Inter",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "text.primary" : "#000",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              {step.description}
            </Typography>

            {step.buttonText && (
              <Button
                variant='text'
                fullWidth={false}
                sx={{
                  mt: "20px",
                  borderBottom: (theme) =>
                    `1px solid ${
                      theme.palette.mode === "dark" ? "text.primary" : "#000"
                    }`,
                  pb: "4px",
                  borderRadius: 0,
                }}
              >
                {step.buttonText}
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </LeftBottomBoxLayout>
  );
}
