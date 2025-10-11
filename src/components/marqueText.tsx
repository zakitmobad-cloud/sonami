import React, { useRef, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

type MarqueeBannerProps = {
  speed?: number; // pixels per second (higher = faster). default 120
  fontSize?: string | number;
  gap?: number; // pixels between repeated text
  gradient?: string;
};

const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  speed = 120,
  fontSize = "13px",
  gap = 40,
  gradient = "linear-gradient(180deg, #03CDEF 0%, #8077FB 92.31%), linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
}) => {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  const { t } = useTranslation();
  const text = t("home.marqueeText") || "";

  const rootRef = useRef<HTMLDivElement | null>(null);
  const singleRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const single = singleRef.current;
    const track = trackRef.current;
    if (!root || !single || !track) return;

    const update = () => {
      const w = single.offsetWidth;
      if (!w) return;
      const totalMove = w + gap;
      const duration = Math.max(2, totalMove / speed);

      root.style.setProperty("--marquee-duration", `${duration}s`);
      root.style.setProperty("--content-width", `${w}px`);
      root.style.setProperty("--gap", `${gap}px`);
      root.style.setProperty("--content-neg", `-${totalMove}px`);

      track.style.animation = "none";
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      track.offsetWidth;
      track.style.animation = `marquee ${duration}s linear infinite`;
    };

    update();

    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(update);
      ro.observe(single);
      ro.observe(root);
    } else {
      // ✅ This cast fixes the TypeScript 'never' issue
      const win = globalThis as unknown as Window;
      win.addEventListener("resize", update);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", update);
    };
  }, [text, speed, gap, fontSize]);
  return (
    <Box
      ref={rootRef}
      sx={{
        overflow: "hidden",
        width: "100%",
        background: "#000",
        //backgroundSize: "cover",
        clipPath: matchesSM
          ? "unset"
          : "polygon(4% 0, 100% 0, 100% 100%, 0 100%)",
        position: "relative",
      }}
    >
      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          // fallback initial animation; JS will reapply with correct duration
          animation: "marquee var(--marquee-duration, 10s) linear infinite",
          willChange: "transform",
          "@keyframes marquee": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(var(--content-neg))" },
          },
          // respect reduced-motion accessibility preference
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
          },
          py: "3px",
        }}
      >
        <Box
          ref={singleRef}
          sx={{
            flex: "0 0 auto",
            display: "inline-block",
            mr: `${gap}px`,
          }}
        >
          <Typography
            component='span'
            sx={{
              fontWeight: 700,
              color: "#fff",
              fontSize,
              letterSpacing: "0.02em",
            }}
          >
            {text}
          </Typography>
        </Box>

        {/* duplicate copy */}
        <Box
          sx={{
            flex: "0 0 auto",
            display: "inline-block",
            mr: `${gap}px`,
          }}
        >
          <Typography
            component='span'
            sx={{
              fontWeight: 700,
              color: "#fff",
              fontSize,
              letterSpacing: "0.02em",
            }}
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MarqueeBanner;
