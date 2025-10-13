import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function FAQ({
  odd = false,
  title,
  description,
}: {
  odd: boolean;
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        background: odd
          ? "url(/dev/faq-top-background.png)"
          : "url(/dev/faq-bottom-background.png)",
        backgroundSize: "100% 100%",
        // backdropFilter: "blur(14px)",
        pl: { xs: "10px", md: "24px" },
        pr: "10px",
        pt: odd ? "26px" : open ? "95px" : "55px",
        pb: odd ? "75px" : open ? "85px" : "26px",
        mt: odd ? "20px" : "0px",
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
