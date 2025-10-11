import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  Button,
  Link,
  SwipeableDrawer,
  useMediaQuery,
  Grid,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  KeyboardArrowDown,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../contexts/ThemeContext";

const Header = () => {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const { mode, toggleTheme } = useThemeContext();
  const { t, i18n } = useTranslation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const menus = [
    {
      label: t("header.roadmap"),
      link: "/roadmap",
    },
    {
      label: t("header.howToBuy"),
      link: "/help",
    },
    {
      label: t("header.tokenomics"),
      link: "/tokenomics",
    },

    {
      label: t("header.faqs"),
      link: "/faqs",
    },
  ];

  const logo = (
    <img
      src='/logo.png'
      alt='Logo'
      style={{
        height: matchesSM ? "37px" : "52px",
        //width: "auto",
        marginRight: 16,
      }}
    />
  );

  const buyButton = (
    <Button
      variant='contained'
      color='primary'
      fullWidth
      sx={{
        background:
          "linear-gradient(180deg, #E9ED00 0%, #ACDD25 48%, #08D745 100%)",
        borderRadius: "14px",
        border: "2px solid #fff",
        fontWeight: 500,
        px: "19px",
        color: "#000",
      }}
    >
      {t("header.buy")}
    </Button>
  );

  const langInput = (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      size='small'
      sx={{
        ".MuiSelect-outlined": {
          p: "0px",
          pr: "4px !important",
        },
        ".MuiOutlinedInput-notchedOutline": {
          border: "unset",
        },
        fontSize: "12px",
        fontWeight: 500,
        ".MuiSvgIcon-root": {
          color: "inherit",
          mt: "-1px",
          p: "0px",
        },
      }}
      IconComponent={() => <KeyboardArrowDown fontSize='small' />}
    >
      <MenuItem value='en'>EN</MenuItem>
      <MenuItem value='es'>ES</MenuItem>
      <MenuItem value='fr'>FR</MenuItem>
    </Select>
  );

  const themeToggleButton = (
    <IconButton onClick={toggleTheme} aria-label='toggle theme' sx={{ p: 0 }}>
      {mode === "dark" ? (
        <Brightness7 fontSize='small' />
      ) : (
        <Brightness4 fontSize='small' />
      )}
    </IconButton>
  );
  const renderMenus = (
    <Grid
      container
      wrap='nowrap'
      sx={{
        //display: "flex",
        flexDirection: matchesSM ? "column" : "row",
        //alignItems: matchesSM ? "flex-start" : "center",
        justifyContent: matchesSM ? "flex-start" : "center",
        gap: 2,
        flex: 1,
      }}
    >
      {menus.map((page) => (
        <Link
          key={page.link}
          href={page.link}
          sx={{
            display: "flex",
            textDecoration: "none",
            // border: "2px solid #FFFFFF",
            p: "14px 14px 27px 14px",
            minWidth: "100px",
            color: "primary.main",
            background: "url(/dev/header-menu-vector.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            //backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(13.5px)",
            //   backgroundColor: (theme) =>
            //     theme.palette.mode === "dark" ? "#292929" : "primary.light",
          }}
        >
          <Typography
            variant='subtitle2'
            // align='center'
            sx={{
              fontWeight: 500,
              textTransform: "uppercase",
              lineHeight: "15px",
            }}
          >
            {page.label}
          </Typography>
        </Link>
      ))}
    </Grid>
  );

  const sidebar = (
    <SwipeableDrawer
      open={openSidebar}
      onClose={() => setOpenSidebar(false)}
      onOpen={() => setOpenSidebar(true)}
      slotProps={{
        paper: {
          sx: {
            width: "80%",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "background.paper"
                : "primary.light",
            p: "20px",
            position: "relative",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {langInput}
        {themeToggleButton}
        <IconButton onClick={() => setOpenSidebar(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: "40px" }}>
        <img
          src='/logo.png'
          alt='Logo'
          style={{
            height: "52px",
            width: "auto",
            marginRight: 16,
          }}
        />
      </Box>
      <Box sx={{ width: "100%", mt: "30px" }}>{renderMenus}</Box>
      <Box sx={{ mt: "30px", width: "100%" }}>{buyButton}</Box>
    </SwipeableDrawer>
  );
  return (
    <AppBar
      position='static'
      sx={{
        background: "transparent",
        boxShadow: "none",
        color: (theme) =>
          theme.palette.mode === "dark" ? "text.primary" : "primary.main",
      }}
    >
      <Toolbar sx={{ px: "0 !important" }}>
        {logo}
        {matchesSM ? <Box sx={{ flex: 1 }} /> : renderMenus}
        {matchesSM && sidebar}
        {matchesSM ? (
          <Button
            variant='contained'
            color='primary'
            sx={{
              bxShadow: "none",
              backgroundColor: "primary.light",
              borderRadius: "5px",
              fontWeight: 500,
              px: "10px",
              color: "#000",
              fontSize: "12px",
              zIndex: (theme) => theme.zIndex.appBar,
            }}
            startIcon={<MenuIcon fontSize='small' />}
            onClick={() => setOpenSidebar(true)}
          >
            {t("header.menu")}
          </Button>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {buyButton}
            {langInput}
            {/* {themeToggleButton} */}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
