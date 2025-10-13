import { Box, useMediaQuery } from "@mui/material";
import MarqueeBanner from "./marqueText";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  return (
    <Box
      sx={{
        // backgroundColor: (theme) =>
        //   matchesSM
        //     ? theme.palette.mode === "dark"
        //       ? theme.palette.background.paper
        //       : theme.palette.background.paper
        //     : theme.palette.mode === "dark"
        //     ? "background.paper"
        //     : "primary.light",
        // border: "2px solid #FFFFFF",
        background: (theme) =>
          matchesSM
            ? "url(/dev/main-mobile-vector.png)"
            : "url(/dev/main-vector.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",

        p: matchesSM ? "20px 10px 70px 10px" : 0,
        position: "relative",
      }}
    >
      {!matchesSM && (
        <Box
          sx={{
            position: "absolute",
            top: "2.5px",
            left: "19%",
            width: "calc(100% - 19%)",
          }}
        >
          <MarqueeBanner />
        </Box>
      )}
      {children}
    </Box>
  );
};
export default Layout;
