import {
  Box,
  Chip,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Button,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
import FAQ from "./faq";

export default function LeftBottomBox() {
  const muiTheme = useTheme();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const { t } = useTranslation();

  const faqs = t("faqs.faqs", {
    returnObjects: true,
  }) as {
    title: string;
    description: string;
  }[];
  return (
    <LeftBottomBoxLayout
      sx={{
        px: 0,
      }}
    >
      <Grid
        container
        direction={"column"}
        wrap='nowrap'
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "transparent",
          m: {
            xs: "15px 0px",
            md: matchesSM ? "24px 0px 35px 0px" : "66px 0px 35px 0px",
          },
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
        <Typography
          variant='h1'
          sx={{
            fontSize: {
              xs: "21px",
              sm: "36px",
              md: matchesSM ? "48px" : "21px",
            },
            //lineHeight: "25px",
            fontWeight: 500,
            textTransform: "uppercase",
            //width: { xs: "100%", sm: "90%", md: "100%" },
          }}
        >
          {t("faqs.title")}
        </Typography>
        {faqs.map((step, i) => (
          <FAQ
            key={i}
            odd={i % 2 === 0}
            title={step.title}
            description={step.description}
          />
        ))}
      </Grid>
    </LeftBottomBoxLayout>
  );
}
