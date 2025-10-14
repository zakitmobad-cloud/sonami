import { Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function ActionButton({
  icon,
  text,
  url,
}: {
  icon: JSX.Element;
  text: string;
  url: string;
}) {
  const location = useLocation();

  return (
    <Grid
      container
      alignItems='center'
      component={Link}
      to={url}
      sx={{
        textDecoration: "none",
        p: "10px 5px 35px 23px",
        color: (theme) =>
          theme.palette.mode === "dark" ? "text.primary" : "#000",
        //   backgroundColor: (theme) =>
        //     theme.palette.mode === "dark" ? "#292929" : "primary.light",
        background:
          location.pathname === url
            ? "url(/dev/header-menu-vector-active.png)"
            : "url(/dev/header-menu-vector.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        //backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(13.5px)",
      }}
    >
      {icon}

      <Typography
        variant='h2'
        align='center'
        sx={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "22.4px",
          flex: 1,
        }}
      >
        {text}
      </Typography>
    </Grid>
  );
}
