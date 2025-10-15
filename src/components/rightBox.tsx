import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  linearProgressClasses,
  Divider,
  Button,
  TextField,
  MenuItem,
  useTheme,
  InputAdornment,
  SxProps,
  useMediaQuery,
  Select,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Trans, useTranslation } from "react-i18next";
import { formatAmount, formatNumber } from "@/lib/utils";
import HowToBuyDialog from "./howToBuyModal";

const mainnets = [
  { label: "Solana Mainnet", value: "sol", icon: "/dev/solana.png" },
];

const servers = [
  { label: "Solana Mainnet", value: "sol", icon: "/dev/solana.png" },
  { label: "USDC Mainnet", value: "usdc", icon: "/dev/usdc.png" },
];
export default function RightBox() {
  const matches350 = useMediaQuery((theme) => theme.breakpoints.down(350));
  const muiTheme = useTheme();
  const { t } = useTranslation();
  const px = { xs: "10px", sm: "20px" };
  const userBalance = 0;
  const [selectedMainnet, setSelectedMainnet] = useState("sol");
  const [selectedServer, setSelectedServer] = useState("sol");
  const [openServerInput, setOpenServerInput] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [showBuyInstructionModal, setShowBuyInstructionsModal] =
    useState(false);
  const currency = "$";
  const stageRaised = formatAmount(15427953);
  const totalRaised = formatAmount(15500000);
  const listingPrice = 0.1;
  const stageNumber = 17;
  const targetRaisedInPercent = 28;
  const currentPrice = 0.0055;
  const nextPrice = 0.0056;

  const solToUSD = 175.49;
  const usdcToUSD = 1;
  const STEP = 0.1;

  const handleIncrease = () => {
    setInputAmount((prev) => {
      if (prev === "" || isNaN(Number(prev))) return STEP.toFixed(1);
      return (Number(prev) + STEP).toFixed(1);
    });
  };

  const handleDecrease = () => {
    setInputAmount((prev) => {
      if (prev === "" || isNaN(Number(prev))) return "";
      const newValue = Math.max(0, Number(prev) - STEP);
      return newValue === 0 ? "0" : newValue.toFixed(1);
    });
  };

  const InputCaretIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='24'
      fill='none'
      viewBox='0 0 25 24'
      style={{ marginRight: "13px" }}
    >
      <path
        fill={muiTheme.palette.text.primary}
        d='M17.796 15.704a1.125 1.125 0 0 1 0 1.594l-4.5 4.5a1.124 1.124 0 0 1-1.594 0l-4.5-4.5a1.127 1.127 0 1 1 1.594-1.594l3.704 3.702 3.704-3.705a1.126 1.126 0 0 1 1.592.003m-9-7.406L12.5 4.594l3.704 3.705a1.127 1.127 0 0 0 1.594-1.594l-4.5-4.5a1.124 1.124 0 0 0-1.594 0l-4.5 4.5a1.127 1.127 0 0 0 1.594 1.594z'
      ></path>
    </svg>
  );

  const inputSx: SxProps = {
    background: "rgba(255, 255, 255, 0.25)",
    minHeight: "60px",
    "& .MuiOutlinedInput-root": {
      minHeight: "inherit",
    },
    [`& .MuiOutlinedInput-input`]: {
      backdropFilter: "blur(2px)",
      py: "16px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontWeight: 700,
      fontSize: "14px",
      fontFamily: "Inter",
      color: muiTheme.palette.mode === "dark" ? "text.primary" : "primary.dark",
    },
    "& fieldset": {
      border: "1px solid #FFFFFF66",
    },
    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
      {
        WebkitAppearance: "none",
        margin: 0,
      },
    "& input[type=number]": {
      MozAppearance: "textfield", // Firefox
    },
  };
  return (
    <Box
      sx={{
        //border: matchesSM ? 0 : "2px solid #fff",
        width: "100%",
        // backgroundColor: (theme) =>
        //   theme.palette.mode === "dark" ? "background.paper" : "warning.main",

        background: "url(/dev/connect-wallet-vector.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        pt: "35.3px",
        pb: "68px",
      }}
    >
      {/*raised title */}
      <Grid
        container
        wrap='nowrap'
        justifyContent='space-between'
        alignItems='center'
        sx={{ px: px }}
      >
        <Grid>
          <Typography
            variant='subtitle2'
            sx={{
              fontWeight: 500,
              color: (theme) =>
                theme.palette.mode === "dark" ? "text.primary" : "primary.dark",
              textTransform: "uppercase",
              lineHeight: "23px",
            }}
          >
            {t("connectWallet.stageRaised")}
          </Typography>
        </Grid>
        <Grid sx={{ flex: 1 }}>
          <Typography
            variant='subtitle2'
            align='right'
            sx={{
              fontWeight: 500,

              color: (theme) =>
                theme.palette.mode === "dark" ? "text.primary" : "primary.dark",
              textTransform: "uppercase",
              lineHeight: "23px",
            }}
          >
            {t("connectWallet.listingPrice")}
          </Typography>
        </Grid>
      </Grid>
      {/* raised values */}
      <Grid
        container
        wrap='nowrap'
        justifyContent='space-between'
        alignItems='flex-end'
        spacing={1}
        sx={{ px: px, mt: "16px" }}
      >
        {/* rasied values */}
        <Grid sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant='subtitle1'
              sx={{
                fontSize: { xs: "16px", sm: "18px" },
                fontWeight: 500,
                color: (theme) =>
                  theme.palette.mode === "dark" ? "text.primary" : "#000",
                textTransform: "uppercase",
                lineHeight: "19px",
              }}
            >
              {`${currency}${stageRaised}`}
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{
                opacity: 0.4,
                fontWeight: 500,
                color: (theme) =>
                  theme.palette.mode === "dark" ? "text.primary" : "#000",
                textTransform: "uppercase",
                lineHeight: "19px",
              }}
            >
              /{`${currency}${totalRaised}`}
            </Typography>
          </Box>
        </Grid>
        {/* listing price */}
        <Grid>
          <Typography
            variant='subtitle1'
            align='right'
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              fontWeight: 500,
              color: (theme) =>
                theme.palette.mode === "dark" ? "text.primary" : "#000",
              textTransform: "uppercase",
              lineHeight: "19px",
            }}
          >
            {`${currency}${listingPrice}`}
          </Typography>
        </Grid>
      </Grid>
      {/* progress */}
      <Grid container direction='column' sx={{ px: px, mt: "25px" }}>
        {/* heading */}
        <Grid sx={{ width: "100%" }}>
          <Grid
            container
            wrap='nowrap'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid>
              <Typography
                variant='subtitle2'
                sx={{
                  fontWeight: 500,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "primary.dark",
                  textTransform: "uppercase",
                  lineHeight: "23px",
                }}
              >
                {t("connectWallet.stage")} {stageNumber}
              </Typography>
            </Grid>
            <Grid sx={{ flex: 1 }}>
              <Typography
                variant='subtitle2'
                align='right'
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "primary.dark",
                  lineHeight: "23px",
                }}
              >
                {t("connectWallet.targetRaised", {
                  percentage: targetRaisedInPercent,
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* progress */}
        <Grid sx={{ width: "100%", mt: "8px" }}>
          <LinearProgress
            variant='determinate'
            value={targetRaisedInPercent}
            sx={{
              height: "12px",
              background: "#D9D9D9",

              [`& .${linearProgressClasses.bar}`]: {
                transformOrigin: "left",
                transform: "none !important", // remove MUI transform
                width: `${targetRaisedInPercent}%`,
                background:
                  "linear-gradient(90deg, #77FB0D 0%, #FFF800 52.4%, #FB7A00 100%)",
              },
            }}
          />
        </Grid>
        {/* price */}
        <Grid sx={{ width: "100%", mt: "8px" }}>
          <Grid
            container
            wrap='nowrap'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid>
              <Typography
                variant='subtitle2'
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "primary.dark",
                  lineHeight: "23px",
                }}
              >
                {t("connectWallet.currentPrice")} {currency}
                {currentPrice}
              </Typography>
            </Grid>
            <Grid>
              <Typography
                variant='subtitle2'
                align='right'
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "primary.dark",
                  display: "flex",
                  alignItems: matches350 ? "flex-end" : "center",
                  flexDirection: matches350 ? "column" : "row",
                  gap: "4px",
                  lineHeight: "23px",
                }}
              >
                {t("connectWallet.nextPrice")}

                <Box
                  component='span'
                  sx={{
                    display: "flex",
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "text.primary"
                        : nextPrice > currentPrice
                        ? "#006D1A"
                        : "#EF0307",
                  }}
                >
                  {currency}
                  {nextPrice}{" "}
                  {nextPrice > currentPrice ? (
                    <ArrowUpwardIcon fontSize='small' />
                  ) : (
                    <ArrowDownwardIcon fontSize='small' />
                  )}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* AuditedBy */}
      {/* <Grid
        container
        alignItems='center'
        justifyContent='space-between'
        sx={{ px: px, mt: "18px" }}
      >
        <Grid>
          <Typography
            variant='subtitle2'
            sx={{
              fontFamily: "Inter",
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === "dark" ? "text.primary" : "primary.dark",
              lineHeight: "23px",
            }}
          >
            {t("connectWallet.auditedBy")}
          </Typography>
        </Grid>
        <Grid>
          <Grid container wrap='nowrap' gap={"8px"}>
            <Grid sx={{ flex: 1, display: "flex" }}>
              <Box
                sx={{
                  width: "100%",
                  p: "11px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  backgroundColor: "#000",
                }}
              >
                <img
                  src='/dev/audited1.png'
                  style={{ width: "100%", height: "20px" }}
                />
              </Box>
            </Grid>
            <Grid sx={{ flex: 1, display: "flex" }}>
              <Box
                sx={{
                  width: "100%",
                  p: "11px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  backgroundColor: "#000",
                }}
              >
                <img
                  src='/dev/audited2.png'
                  style={{ width: "100%", height: "20px" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      {/* hash */}
      <>
        {/* divider */}
        <Box sx={{ width: "100%", px: px, mt: "15px" }}>
          <Divider sx={{ borderColor: "#C1A059" }} />
          <Divider sx={{ borderColor: "#FBD88E" }} />
        </Box>
        {/* hash */}
        <Typography
          variant='subtitle2'
          align='center'
          sx={{
            fontFamily: "Inter",
            fontWeight: 700,
            color: (theme) =>
              theme.palette.mode === "dark" ? "text.primary" : "primary.dark",
            overflow: "hidden",
            py: "15px",
            whiteSpace: "nowrap",
            lineHeight: "23px",
          }}
        >
          <Trans
            i18nKey='connectWallet.hash'
            components={{ highlight: <span style={{ color: "#0000FD" }} /> }}
          />
        </Typography>
        {/* divider */}
        <Box sx={{ width: "100%", px: px }}>
          <Divider sx={{ borderColor: "#C1A059" }} />
          <Divider sx={{ borderColor: "#FBD88E" }} />
        </Box>
      </>
      {/* input */}
      <>
        <Box sx={{ width: "100%", px: px, mt: "20px" }}>
          <TextField
            select
            fullWidth
            variant='outlined'
            defaultValue={selectedMainnet}
            value={selectedMainnet}
            onChange={(e) => setSelectedMainnet(e.target.value)}
            slotProps={{
              select: {
                IconComponent: InputCaretIcon,
              },
            }}
            sx={inputSx}
          >
            {mainnets.map((item, i) => (
              <MenuItem value={item.value} key={i}>
                <img
                  src={item.icon}
                  style={{ marginRight: "8px", width: "28px", height: "28px" }}
                />{" "}
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/* conversion inputs */}
        <Box sx={{ width: "100%", px: px, mt: "20px" }}>
          <Grid container gap='20px'>
            <Grid sx={{ flex: 1 }}>
              <TextField
                fullWidth
                type='number'
                variant='outlined'
                value={inputAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericRegex = /^\d*\.?\d*$/;
                  if (numericRegex.test(value)) setInputAmount(value);
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Select
                          open={openServerInput}
                          onOpen={() => setOpenServerInput(true)}
                          onClose={() => setOpenServerInput(false)}
                          value={selectedServer}
                          onChange={(e) => setSelectedServer(e.target.value)}
                          variant='standard'
                          disableUnderline
                          id='serverInput'
                          IconComponent={() => (
                            <Box
                              component='label'
                              htmlFor='#serverInput'
                              sx={{ display: "flex", flexDirection: "column" }}
                              onClick={() => setOpenServerInput((o) => !o)}
                            >
                              <KeyboardArrowUpIcon
                                fontSize='small'
                                sx={{
                                  color: muiTheme.palette.text.primary,
                                  cursor: "pointer",
                                }}

                                //={handleIncrease}
                              />
                              <KeyboardArrowDownIcon
                                fontSize='small'
                                sx={{
                                  color: muiTheme.palette.text.primary,
                                  mt: "-8px",
                                  cursor: "pointer",
                                }}
                                // onClick={handleDecrease}
                              />
                            </Box>
                          )}
                          sx={{
                            "& .MuiSelect-select": {
                              display: "flex",
                              alignItems: "center",
                              pr: "4px !important",
                              p: 0,
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                          }}
                        >
                          {servers.map((server) => (
                            <MenuItem key={server.value} value={server.value}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <img
                                  src={server.icon}
                                  alt={server.label}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                  }}
                                />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={inputSx}
              />
            </Grid>
            <Grid sx={{ flex: 1 }}>
              <TextField
                fullWidth
                variant='outlined'
                value={
                  inputAmount && !isNaN(parseFloat(inputAmount))
                    ? selectedServer === "sol"
                      ? formatNumber(Number(inputAmount) / solToUSD)
                      : selectedServer === "usdc"
                      ? formatNumber(Number(inputAmount) / usdcToUSD)
                      : ""
                    : ""
                }
                slotProps={{
                  input: {
                    readOnly: true,
                    endAdornment: selectedServer &&
                      servers.find((s) => s.value === selectedServer) && (
                        <InputAdornment position='end'>
                          <img
                            src={
                              servers.find((s) => s.value === selectedServer)
                                .icon
                            }
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                            }}
                          />
                        </InputAdornment>
                      ),
                  },
                }}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </Box>
        {/* balance and usdToEth */}
        <Box sx={{ width: "100%", px: px, mt: "12px" }}>
          <Grid container gap='20px'>
            {/* balance */}
            <Grid sx={{ flex: 1 }}>
              <Grid
                container
                spacing={1}
                justifyContent='space-between'
                alignItems='center'
              >
                <Grid>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 700,
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? "text.primary"
                          : "primary.dark",
                      lineHeight: "23px",
                    }}
                  >
                    {t("connectWallet.balance")}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 700,
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? "text.primary"
                          : "primary.dark",
                      lineHeight: "23px",
                    }}
                  >
                    {userBalance} SOL
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ flex: 1 }}>
              {selectedServer && (
                <Grid
                  container
                  spacing={1}
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: 700,
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "text.primary"
                            : "primary.dark",
                        lineHeight: "23px",
                      }}
                    >
                      1 {selectedServer.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: 700,
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "text.primary"
                            : "primary.dark",
                        lineHeight: "23px",
                      }}
                    >
                      {currency}
                      {formatAmount(
                        selectedServer === "sol"
                          ? solToUSD
                          : selectedServer === "usdc"
                          ? usdcToUSD
                          : 0
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
        {/* sample values */}
        <Box sx={{ width: "100%", px: px, mt: "15px" }}>
          <Grid container wrap='nowrap' gap='10px'>
            {[250, 1000, 5000, 50000].map((item, i) => (
              <Grid key={i} sx={{ display: "flex", flex: 1 }}>
                <Box
                  sx={{
                    width: "100%",
                    p: "10px 10px 10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(2px)",
                    border: "1px solid #FFFFFF66",
                    borderRadius: "4px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontWeight: 500,
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "text.primary"
                        : "primary.dark",
                    cursor: "pointer",
                  }}
                  onClick={() => setInputAmount(`${item}`)}
                >
                  {currency}
                  {item}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
      {/* connect wallet button */}
      <Box sx={{ width: "100%", px: px, mt: "30px" }}>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          sx={{
            background:
              "linear-gradient(180deg, #E9ED00 0%, #ACDD25 48%, #08D745 100%)",
            borderRadius: "4px",
            border: "2px solid #fff",
            fontWeight: 500,
            px: "19px",
            py: "16px",
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "background.default"
                : "primary.dark",
            fontSize: "16px",
            lineHeight: "23px",
          }}
        >
          {t("connectWallet.connectWallet")}
        </Button>
      </Box>

      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        sx={{ width: "100%", px: px, mt: "31px" }}
        gap='4px'
      >
        <Grid>
          {/* <Typography
            variant='subtitle2'
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              textDecoration: "underline",
              textTransform: "uppercase",
              color: "text.primary",
              cursor: "pointer",
            }}
          >
            {t("connectWallet.dontHaveWallet")}
          </Typography> */}
        </Grid>
        <Grid>
          <Typography
            variant='subtitle2'
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              textDecoration: "underline",
              textTransform: "uppercase",
              color: "text.primary",
              cursor: "pointer",
            }}
            onClick={() => setShowBuyInstructionsModal(true)}
          >
            {t("connectWallet.howToBuy")}
          </Typography>
          <HowToBuyDialog
            open={showBuyInstructionModal}
            onClose={() => setShowBuyInstructionsModal(false)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
