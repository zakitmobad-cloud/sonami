import { useMediaQuery, Box } from "@mui/material";

export default function Social() {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  const socialData = [
    {
      label: "twitter",
      icon: "/dev/twitter.svg",
      url: "https://x.com/",
    },
    {
      label: "twitter",
      icon: "/dev/telegram.svg",
      url: "https://telegram.org/",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: matchesSM ? "row" : "column",
        gap: "13px",
        //  background: "linear-gradient(#03CDEF 77%, #8077FB 100%)",
        background:
          "linear-gradient(180deg, rgba(3, 205, 239, 0.94) 0%, rgba(128, 119, 251, 0.77) 100%), url(/dev/blur.png)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        borderRadius: "15px",
        clipPath: matchesSM
          ? "polygon(20% 0, 80% 0, 100% 100%, 0 100%)"
          : "polygon(0 0,100% 20%,100% 80%,0 100%)",
        py: matchesSM ? "8px" : "45px",
        px: matchesSM ? "40px" : "8px",
        // pr: "10px",
        //borderTopRightRadius: "150px",
        //borderBottomRightRadius: "150px",
      }}
    >
      {socialData.map((item, i) => (
        <a
          href={item.url}
          target='_blank'
          key={i}
          style={{
            textDecoration: "none",
            width: "44px",
            height: "44px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={item.icon} alt={item.label} />
        </a>
      ))}
    </Box>
  );
}
