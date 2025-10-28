import { Grid, Typography, useMediaQuery } from "@mui/material";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
import { useTranslation } from "react-i18next";
import { formatAmount } from "@/lib/utils";

export default function LeftBottomBox() {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1250));
  const matchesXL = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  const { t } = useTranslation();

  const totalSupply = 82999999899;
  return (
    <LeftBottomBoxLayout>
      <Grid
        container
        direction='column'
        sx={{
          mt: "32px",
          pb: "18px",
          pl: matchesSM ? "20px" : "50px",
          pr: "20px",
        }}
      >
        <Grid sx={{ width: "100%", mt: "32px" }}>
          <img
            src='/dev/tokenomics.png'
            style={{
              width: matchesSM ? "100%" : "auto",
              //width: matchesSM ? "100%" : matchesXL ? "75%" : "80%",
              height: matchesSM ? "100%" : matchesXL ? "75%" : "80%",
              maxWidth: "650px",
            }}
          />
        </Grid>
        <Grid sx={{ width: "100%", mt: "40px" }}>
          <Typography
            variant='h1'
            align='right'
            sx={{
              fontSize: "21px",
              //lineHeight: "25px",
              fontWeight: 500,
              textTransform: "uppercase",
              //width: { xs: "100%", sm: "90%", md: "100%" },
            }}
          >
            {t("tokenomics.leftBottomBox.totalSupply")} :{" "}
            {formatAmount(totalSupply)}
          </Typography>
        </Grid>
      </Grid>
    </LeftBottomBoxLayout>
  );
}
