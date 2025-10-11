import { Container, Box, Grid, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import MarqueeBanner from "@/components/marqueText";
import Header from "@/components/Header";
import LeftTopBox from "@/components/leftTopBox";
import LeftBottomBox from "@/components/leftBottomBox";
import ActionButtons from "@/components/ActionButtons";
import RightBox from "@/components/rightBox";
import BottomArea from "@/components/bottomArea";
import Social from "@/components/social";
const Index = () => {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  const { t } = useTranslation();

  const px = { xs: matchesSM ? "10px" : 1, xl: 4.75 };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: (theme) =>
          matchesSM
            ? theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.primary["300"]
            : theme.palette.mode === "dark"
            ? ""
            : "url(/dev/light-background.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        sx={{
          maxWidth: "1600px !important",
          px: "0 !important",
        }}
      >
        {matchesSM && <MarqueeBanner />}
        <Box sx={{ width: "100%", px: px, pt: "12px" }}>
          <Header />
        </Box>

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
              headingText={t("home.leftTopBox.heading")}
              buttonText={t("home.leftTopBox.button")}
              mainnetText={t("home.leftTopBox.mainnet")}
              stackingRewardText={t("home.leftTopBox.stackingReward")}
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
        <Box sx={{ width: "100%", py: "20px", px: px }}>
          <BottomArea />
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
