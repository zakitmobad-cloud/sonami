import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  SwipeableDrawer,
  useMediaQuery,
  Grid,
  useTheme,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  KeyboardArrowDown,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = () => {
  const { connecting, connected } = useWallet();
  const location = useLocation();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));
  const muiTheme = useTheme();
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
    <Link to='/'>
      <img
        src='/logo.png'
        alt='Logo'
        style={{
          height: matchesSM ? "37px" : "52px",
          //width: "auto",
          marginRight: 16,
        }}
      />
    </Link>
  );

  const buyButton = connected ? (
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
      onClick={() => {
        let buyButton = document.getElementById("buyButton");
        if (buyButton) {
          buyButton.click();
        }
      }}
    >
      {t("header.buy")}
    </Button>
  ) : (
    <WalletMultiButton
      disabled={connecting}
      style={{
        width: "100%",
        fontFamily: muiTheme.typography.fontFamily,
        background:
          "linear-gradient(180deg, #E9ED00 0%, #ACDD25 48%, #08D745 100%)",
        borderRadius: "14px",
        border: "2px solid #fff",
        fontWeight: 500,
        padding: "16px 19px",
        color: "#000",
        fontSize: "12px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {connecting
        ? t("connectWallet.connecting")
        : connected
        ? t("connectWallet.connected")
        : t("connectWallet.connectWallet")}
    </WalletMultiButton>
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
          to={page.link}
          style={{
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",

              // border: "2px solid #FFFFFF",
              p: "14px 14px 27px 14px",
              minWidth: "100px",
              color: location.pathname === page.link ? "#fff" : "primary.main",
              background:
                location.pathname === page.link
                  ? "url(/dev/header-menu-vector-active.png)"
                  : "url(/dev/header-menu-vector.png)",
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
          </Box>
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
        {/* {langInput} */}
        {/* {themeToggleButton} */}
        <IconButton onClick={() => setOpenSidebar(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: "40px" }}>
        <Link to='/'>
          <img
            src='/logo.png'
            alt='Logo'
            style={{
              height: "52px",
              width: "auto",
              marginRight: 16,
            }}
          />
        </Link>
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
            {/* {langInput} */}
            {/* {themeToggleButton} */}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
