import { Container, Box, useMediaQuery } from "@mui/material";
import MarqueeBanner from "@/components/marqueText";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

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
        {children}
        <Box sx={{ width: "100%", py: "20px", px: px }}>
          <Footer />
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
