import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import Layout from "@/components/common/layout";
import LeftTopBox from "@/components/leftTopBox";
import LeftBottomBox from "@/components/chain/leftBottomBox";
import ActionButtons from "@/components/ActionButtons";
import RightBox from "@/components/rightBox";
import Social from "@/components/social";
const Index = () => {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  const { t } = useTranslation();

  const px = { xs: matchesSM ? "10px" : 1, xl: 4.75 };
  return (
    <Layout>
      <Grid
        container
        direction={matchesSM ? "column" : "row"}
        gap={matchesSM ? 0 : 2}
        sx={{ mt: matchesSM ? 0 : "38px", px: matchesSM ? 0 : px }}
      >
        <Grid
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            //gap: "4px",
          }}
        >
          <LeftTopBox
            headingText={t("faqs.leftTopBox.heading")}
            buttonText={t("faqs.leftTopBox.button")}
            mainnetText={t("faqs.leftTopBox.mainnet")}
            stackingRewardText={t("faqs.leftTopBox.stackingReward")}
          />
          {!matchesSM && (
            <>
              <LeftBottomBox />
              <Box sx={{ width: "100%", mt: "8px" }}>
                <ActionButtons />
              </Box>
            </>
          )}
        </Grid>
        <Grid size={{ xl: 4, lg: 4.5, md: matchesSM ? 12 : 5, xs: 12 }}>
          <Grid container wrap='nowrap'>
            <Grid sx={{ flex: 1 }}>
              <RightBox />
            </Grid>

            {!matchesSM && (
              <Box>
                <Social />
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
      {matchesSM && (
        <Box sx={{ width: "100%", pt: "20px", px: px }}>
          <LeftBottomBox />
        </Box>
      )}
    </Layout>
  );
};

export default Index;
