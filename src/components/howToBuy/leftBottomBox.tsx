import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Button,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
import { useTranslation } from "react-i18next";

export default function LeftBottomBox() {
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
    <LeftBottomBoxLayout
      sx={{
        background: (theme) =>
          matchesSM ? "unset" : "url(/dev/main-vector.png)",
        p: 0,
      }}
    >
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
            xs: "15px 0px",
            md: matchesSM ? "24px 0px 35px 0px" : "56px 0px 35px 0px",
          },
          px: { xs: "0px", md: matchesSM ? "0px" : "17px" },
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
              px: { xs: "15px", md: "24px" },
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

            <Grid sx={{ mt: "34px" }}>
              <Button
                variant='text'
                fullWidth={false}
                disableElevation
                sx={{
                  visibility: step.buttonText ? "visible" : "hidden",
                  px: 0,
                  width: "fit-content",
                  fontSize: "14px",
                  fontWeight: 500,

                  borderBottom: (theme) =>
                    `1px solid ${
                      theme.palette.mode === "dark" ? "text.primary" : "#000"
                    }`,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "text.primary" : "#000",
                  pb: "4px",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {step.buttonText || "Hidden"}
              </Button>
            </Grid>

            {step.icons && (
              <Grid
                sx={{
                  mt: "20px",
                  flex: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent:
                    step.icons.length === 1 ? "flex-end" : "center",
                  alignItems: "flex-end",
                }}
              >
                <AvatarGroup spacing='small'>
                  {step.icons.map((icon) => (
                    <Avatar
                      src={icon}
                      sx={{
                        width: 62,
                        height: 62,
                        "&.MuiAvatar-root": {
                          border: 0,
                          borderRadius: 0,
                        },
                      }}
                    />
                  ))}
                </AvatarGroup>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </LeftBottomBoxLayout>
  );
}
