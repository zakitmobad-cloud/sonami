import { Grid, useMediaQuery } from "@mui/material";
import ActionButton from "./ActionButton";
import { useTranslation } from "react-i18next";
export default function ActionButtons() {
  const { t } = useTranslation();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  return (
    <Grid container direction={matchesSM ? "column" : "row"} spacing={2}>
      <Grid size={{ md: 4, xs: 12 }}>
        <ActionButton
          icon={<img src='/dev/chain.png' style={{ height: "40px" }} />}
          text={t("home.utilityButton1")}
          url='/chain'
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ActionButton
          icon={<img src='/dev/util.png' style={{ height: "40px" }} />}
          text={t("home.utilityButton2")}
          url='/utility'
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ActionButton
          icon={<img src='/dev/dev.png' style={{ height: "40px" }} />}
          text={t("home.utilityButton3")}
          url='/dev-updates'
        />
      </Grid>
    </Grid>
  );
}
