import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";

export default function FAQ({
  index,
  odd = false,
  title,
  description,
}: {
  index: number;
  odd: boolean;
  title: string;
  description: string;
}) {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  const [open, setOpen] = useState(index === 0 ? true : false);
  return (
    <Box
      sx={{
        background: (theme) =>
          matchesSM
            ? `${theme.palette.background.paper}80`
            : odd
            ? "url(/dev/faq-top-background.png)"
            : "url(/dev/faq-bottom-background.png)",
        backgroundSize: "100% 100%",
        backdropFilter: "blur(14px)",
        border: (theme) =>
          matchesSM ? `2px solid ${theme.palette.background.paper}` : 0,
        pl: { xs: "10px", md: "24px" },
        pr: "10px",
        pt: matchesSM ? "20px" : odd ? "26px" : open ? "95px" : "55px",
        pb: matchesSM
          ? "20px"
          : odd
          ? open
            ? "75px"
            : "55px"
          : open
          ? "25px"
          : "46px",
        mt: matchesSM ? "20px" : odd ? "20px" : "0px",
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
          cursor: "pointer",
          width: "100%",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {title}
      </Typography>

      {open && (
        <Typography
          variant='body1'
          sx={{
            mt: "14px",
            fontFamily: "Inter",
            color: (theme) =>
              theme.palette.mode === "dark" ? "text.primary" : "#000",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
