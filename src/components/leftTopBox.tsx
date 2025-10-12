import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Circle as CircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import Social from "@/components/social";

export default function LeftTopBox({
  headingText,
  buttonText,
  mainnetText,
  stackingRewardText,
}) {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const muiTheme = useTheme();

  return (
    <Box
      sx={{
        // backgroundColor: (theme) =>
        //   matchesSM
        //     ? theme.palette.mode === "dark"
        //       ? theme.palette.background.default
        //       : theme.palette.primary["300"]
        //     : theme.palette.mode === "dark"
        //     ? "background.paper"
        //     : "primary.light",
        background: (theme) =>
          matchesSM
            ? theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.primary["300"]
            : "url(/dev/header-vector.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        p: matchesSM ? "0px 15px" : "15px",
        pb: matchesSM ? 0 : "52px",
        //border: matchesSM ? 0 : "2px solid #FFFFFF",
        position: "relative",
        zIndex: "19px",
      }}
    >
      {!matchesSM && (
        <Box
          sx={{
            position: "absolute",
            right: "-48px",
            top: "-17px",
            width: "62px",
            height: "62px",
            rotate: "10deg",
            background: "#fff",
            borderRadius: "16px",
            zIndex: 20,
          }}
        >
          <img src='/dev/sol.png' style={{ rotate: "-9.3deg" }} />
        </Box>
      )}
      {/* {!matchesSM && (
        <Box
          sx={{
            position: "absolute",
            right: "-48px",
            top: "-17px",
            width: "62px",
            height: "62px",
            rotate: "10deg",
            background: "#627EEA",
            borderRadius: "16px",
            zIndex: 19,
          }}
        >
          <img
            src='/dev/sol.png'
            style={{ rotate: "-9.3deg", width: "62px", height: "62px" }}
          />
        </Box>
      )} */}
      <Grid
        container
        justifyContent={"space-between"}
        spacing={1}
        alignItems='center'
        wrap='nowrap'
      >
        <Grid size={{ xs: 8, sm: 9, md: matchesSM ? 9 : "grow" }}>
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
            {headingText}
          </Typography>
        </Grid>
        {matchesSM ? (
          <Grid size={{ xs: 5.35 }}>
            <img
              src='/dev/bear.png'
              style={{
                width: "100%",
                height: "100%",
                zIndex: muiTheme.zIndex.appBar - 1,
                marginTop: "-30px",
                transform: "matrix(-1, 0, 0, 1, 0, 0)",
              }}
            />
          </Grid>
        ) : (
          <Grid>
            <Button
              variant='contained'
              sx={{
                backgroundColor: "text.primary",
                color: "background.default",
                fontWeight: 500,
                fontSize: "15px",
                //lineHeight: "18px",
                boxShadow: "none",
                borderRadius: "100px",
                pl: "15px",
                pr: "30px",
                py: "11.7px",
                zIndex: 18,
              }}
              startIcon={
                <CircleIcon sx={{ fontSize: "20px", color: "#88EA79" }} />
              }
              endIcon={<KeyboardArrowDownIcon sx={{ color: "text.primary" }} />}
            >
              {mainnetText}
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        direction={matchesSM ? "column" : "row"}
        justifyContent={"space-between"}
        alignItems={matchesSM ? "center" : "flex-end"}
        gap={1}
        sx={{
          mt: matchesSM ? "-16.5px" : "10px",
        }}
      >
        <Grid sx={{ width: { xs: "100%", sm: "unset" } }}>
          <Button
            variant='contained'
            sx={{
              background: "linear-gradient(180deg, #EF0307 0%, #FB77B7 100%)",
              color: "#fff",
              fontWeight: 500,
              fontSize: { xs: "13px", sm: "14px" },
              width: { xs: "100%", sm: "unset" },
              boxShadow: "none",
              borderRadius: "100px",
              py: "4px",
            }}
          >
            {buttonText}
          </Button>
        </Grid>
        <Grid sx={{ flex: 1, width: { xs: "100%", sm: "unset" } }}>
          <Typography
            variant='h1'
            align={matchesSM ? "center" : "right"}
            sx={{
              background:
                "linear-gradient(180deg, #0404AE 0%, #2575DD 48%, #0404AE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text", // For Firefox (not always needed)
              color: "transparent",
              fontSize: "20px",
              lineHeight: "25px",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            {stackingRewardText}
          </Typography>
        </Grid>
      </Grid>

      {matchesSM && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "40px" }}>
          <Social />
        </Box>
      )}
    </Box>
  );
}
