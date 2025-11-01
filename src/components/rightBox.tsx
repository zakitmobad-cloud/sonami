import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  linearProgressClasses,
  Divider,
  TextField,
  MenuItem,
  useTheme,
  InputAdornment,
  SxProps,
  useMediaQuery,
  Select,
  Button,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Trans, useTranslation } from "react-i18next";

import * as anchor from "@coral-xyz/anchor";

import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  SystemProgram,
  clusterApiUrl,
} from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

import idl from "@/lib/idl.json";
import { formatAmount, formatNumber } from "@/lib/utils";
import HowToBuyDialog from "./howToBuyModal";
import PresaleCountdown from "./PresaleCountdown";
import {
  initializeStageRaised,
  listenStageRaised,
  updateStageRaised,
} from "@/services/stageService";

const NETWORK = import.meta.env.VITE_NETWORK;
const PROGRAM_ID = new PublicKey(import.meta.env.VITE_PROGRAM_ID);
const PRESALE_STATE = new PublicKey(import.meta.env.VITE_PRESALE_STATE);
const USDC_MINT = new PublicKey(import.meta.env.VITE_USDC_MINT);
const TREASURY_USDC = new PublicKey(import.meta.env.VITE_TREASURY_USDC);
const TREASURY_SOL = new PublicKey(import.meta.env.VITE_TREASURY_SOL);

const mainnets = [
  { label: "Solana Mainnet", value: "sol", icon: "/dev/solana.png" },
];

const servers = [
  { label: "Solana Mainnet", value: "sol", icon: "/dev/solana.png" },
  { label: "USDC Mainnet", value: "usdc", icon: "/dev/usdc.png" },
];

//const connection = new Connection(NETWORK);
export default function RightBox() {
  const { connection } = useConnection();
  const { publicKey, connecting, connected, signTransaction } = useWallet();

  const matches350 = useMediaQuery((theme) => theme.breakpoints.down(350));
  const muiTheme = useTheme();
  const { t } = useTranslation();
  const px = { xs: "10px", sm: "20px" };
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });

  const [selectedMainnet, setSelectedMainnet] = useState("sol");
  const [selectedToken, setSelectedToken] = useState("sol");
  const [openServerInput, setOpenServerInput] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [showBuyInstructionModal, setShowBuyInstructionsModal] =
    useState(false);
  const currency = "$";
  const [stageRaised, setStageRaised] = useState(2320867);
  const totalRaised = 15500000;
  const listingPrice = 0.1;
  const stageNumber = 17;
  const [targetRaisedInPercent] = useState(28);
  const currentPrice = 0.0055;
  const nextPrice = 0.0056;

  const snmiToSol = 0.0001;
  const snmiToUsdc = 0.002;
  const STEP = 0.1;

  async function getBuyerStateAddress(presaleStateAddress, buyerWalletAddress) {
    const [buyerStatePda] = await PublicKey.findProgramAddress(
      [
        Buffer.from("buyer"),
        presaleStateAddress.toBuffer(),
        buyerWalletAddress.toBuffer(),
      ],
      PROGRAM_ID // Your program ID
    );
    return buyerStatePda;
  }

  // Fetch the account data
  async function getWalletTokens(
    connection,
    presaleStateAddress,
    buyerWalletAddress
  ) {
    const buyerStateAddress = await getBuyerStateAddress(
      presaleStateAddress,
      buyerWalletAddress
    );

    try {
      const buyerStateAccount = await connection.getAccountInfo(
        buyerStateAddress
      );

      if (!buyerStateAccount) {
        console.log("No purchases found for this wallet");
        return null;
      }

      // Deserialize the data according to your BuyerState structure
      const buyerData = deserializeBuyerState(buyerStateAccount.data);

      return {
        allocatedTokens: buyerData.allocatedTokens,
        claimedTokens: buyerData.claimedTokens,
        unclaimedTokens: buyerData.allocatedTokens - buyerData.claimedTokens,
        totalPurchases: buyerData.buys,
        spentSOL: buyerData.spent_lamports,
        spentUSDC: buyerData.spent_usdc,
        lastPurchase: buyerData.last_buy_ts,
      };
    } catch (error) {
      console.error("Error fetching buyer state:", error);
      return null;
    }
  }

  // Deserialize the BuyerState account data
  function deserializeBuyerState(data) {
    // Skip the 8-byte discriminator
    const dataWithoutDiscriminator = data.slice(8);

    // Deserialize according to your struct:
    // buys: u64, allocated_tokens: u64, claimed_tokens: u64,
    // spent_lamports: u64, spent_usdc: u64, last_buy_ts: i64
    const view = new DataView(dataWithoutDiscriminator.buffer);

    let offset = 0;
    const buys = Number(view.getBigUint64(offset, true));
    offset += 8;

    const allocatedTokens = Number(view.getBigUint64(offset, true));
    offset += 8;

    const claimedTokens = Number(view.getBigUint64(offset, true));
    offset += 8;

    const spentLamports = Number(view.getBigUint64(offset, true));
    offset += 8;

    const spentUSDC = Number(view.getBigUint64(offset, true));
    offset += 8;

    const lastBuyTs = Number(view.getBigInt64(offset, true));

    return {
      buys,
      allocatedTokens,
      claimedTokens,
      spent_lamports: spentLamports,
      spent_usdc: spentUSDC,
      last_buy_ts: lastBuyTs,
    };
  }

  // Example usage
  async function checkWalletTokens() {
    const presaleStateAddress = new PublicKey(PRESALE_STATE); // Your presale state address
    const walletToCheck = new PublicKey(publicKey); // The wallet you want to check

    const tokenInfo = await getWalletTokens(
      connection,
      presaleStateAddress,
      walletToCheck
    );

    if (tokenInfo) {
      console.log(`Wallet ${walletToCheck.toString()} token info:`);
      console.log(`- Total Allocated: ${tokenInfo.allocatedTokens} tokens`);
      console.log(`- Already Claimed: ${tokenInfo.claimedTokens} tokens`);
      console.log(`- Still Unclaimed: ${tokenInfo.unclaimedTokens} tokens`);
      console.log(`- Total Purchases: ${tokenInfo.totalPurchases}`);
      console.log(`- Spent SOL: ${tokenInfo.spentSOL / 1e9} SOL`);
      console.log(`- Spent USDC: ${tokenInfo.spentUSDC / 1e6} USDC`);
    } else {
      console.log("No purchase history found for this wallet");
    }
  }
  useEffect(() => {
    checkWalletTokens();
  }, []);
  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setUserBalance(null);
        return;
      }

      try {
        setLoading({
          active: true,
          action: "fetchBalance",
        });
        if (selectedToken === "sol") {
          // Get SOL balance
          const lamports = await connection.getBalance(publicKey);
          setUserBalance(lamports / 1e9);
        } else if (selectedToken === "usdc") {
          // Get USDC balance
          const tokenAccountAddress = await getAssociatedTokenAddress(
            USDC_MINT,
            publicKey
          );

          const tokenAccount = await getAccount(
            connection,
            tokenAccountAddress
          );
          const usdcBalance = Number(tokenAccount.amount) / 1_000_000; // USDC has 6 decimals
          setUserBalance(usdcBalance);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
        setUserBalance(0);
      } finally {
        setLoading({
          active: false,
          action: "",
        });
      }
    };

    fetchBalance();
  }, [publicKey, selectedToken, connection]);

  useEffect(() => {
    // Initialize Firestore doc with default value if missing
    initializeStageRaised();

    // Listen for realtime updates
    const unsubscribe = listenStageRaised((value) => setStageRaised(value));

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleupdateStageRaised = async (newValue) => {
    await updateStageRaised(newValue);
  };

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

  function calculateSnmi(amount: number, token: "sol" | "usdc") {
    if (token === "sol") {
      return amount / snmiToSol; // SNMI = amountInSOL / 0.0001
    } else {
      return amount / snmiToUsdc; // SNMI = amountInUSDC / 0.002
    }
  }

  async function buyWithUsdc(usdcAmount: number) {
    try {
      if (!publicKey || !signTransaction) {
        throw new Error("Wallet not connected");
      }
      if (Number(usdcAmount) > userBalance) {
        alert("Insufficient balance");
        return;
      }
      setLoading({
        active: true,
        action: "buyWithUsdc",
      });
      // Convert USDC amount (1 token = 0.019 USDC)
      const amount = new anchor.BN(usdcAmount * 1_000_000);

      // Derive PDAs
      const [buyerState] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("buyer"), PRESALE_STATE.toBuffer(), publicKey.toBuffer()],
        PROGRAM_ID
      );

      const buyerUsdc = await getAssociatedTokenAddress(USDC_MINT, publicKey);

      // Use the correct discriminator for buy_with_usdc
      const discriminator = Buffer.from([
        0x21, 0xd1, 0xd3, 0x7c, 0x37, 0x8e, 0x7a, 0xd4,
      ]);

      const data = Buffer.concat([
        discriminator,
        amount.toArrayLike(Buffer, "le", 8),
      ]);

      console.log("Buying with USDC:", {
        usdcAmount: usdcAmount,
        tokensReceived: (usdcAmount / 0.019).toFixed(2),
        rawAmount: amount.toString(),
        buyer: publicKey.toString(),
      });

      const instruction = new anchor.web3.TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },
          { pubkey: PRESALE_STATE, isSigner: false, isWritable: true },
          { pubkey: USDC_MINT, isSigner: false, isWritable: false },
          { pubkey: buyerUsdc, isSigner: false, isWritable: true },
          { pubkey: TREASURY_USDC, isSigner: false, isWritable: true },
          { pubkey: buyerState, isSigner: false, isWritable: true },
          {
            pubkey: anchor.utils.token.TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: anchor.web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: PROGRAM_ID,
        data: data,
      });

      const transaction = new anchor.web3.Transaction().add(instruction);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      console.log("Sending USDC transaction...");
      const signed = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature);

      console.log("✅ USDC PURCHASE SUCCESS! Transaction:", signature);

      handleupdateStageRaised(stageRaised + 1);

      setUserBalance((u) => u - Number(inputAmount));
      setInputAmount("");

      toast.success("Purchase successful!");
    } catch (err: any) {
      console.log("Error in buyWithUsdc:", err);
      if (err.logs) {
        console.log("Full logs:", err.logs);
      }
      console.log("USDC purchase failed: " + (err.message || "Unknown error"));
      toast.error("Purchase failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading({
        active: false,
        action: "",
      });
    }
  }
  async function buyWithSol(solAmount: number) {
    try {
      if (!publicKey || !signTransaction) {
        throw new Error("Wallet not connected");
      }
      if (Number(solAmount) > userBalance) {
        alert("Insufficient balance");
        return;
      }
      setLoading({
        active: true,
        action: "buyWithSol",
      });
      const lamports = new anchor.BN(solAmount * anchor.web3.LAMPORTS_PER_SOL);

      const [buyerState] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("buyer"), PRESALE_STATE.toBuffer(), publicKey.toBuffer()],
        PROGRAM_ID
      );

      // Use the correct discriminator
      const discriminator = Buffer.from([
        0x31, 0x39, 0x7c, 0xc2, 0xf0, 0x14, 0xd8, 0x66,
      ]);

      const data = Buffer.concat([
        discriminator,
        lamports.toArrayLike(Buffer, "le", 8),
      ]);

      console.log("Buying:", {
        solAmount: solAmount,
        lamports: lamports.toString(),
        buyer: publicKey.toString(),
        treasury: TREASURY_SOL.toString(), // Add this
        buyerState: buyerState.toString(),
      });

      // CORRECT account order - use treasury for Account #3
      const instruction = new anchor.web3.TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true }, // Account #1: buyer
          { pubkey: PRESALE_STATE, isSigner: false, isWritable: true }, // Account #2: presale_state
          { pubkey: TREASURY_SOL, isSigner: false, isWritable: true }, // Account #3: treasury_sol (FIXED!)
          { pubkey: buyerState, isSigner: false, isWritable: true }, // Account #4: buyer_state
          {
            pubkey: anchor.web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          }, // Account #5: system_program
        ],
        programId: PROGRAM_ID,
        data: data,
      });

      const transaction = new anchor.web3.Transaction().add(instruction);
      transaction.feePayer = publicKey;

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;

      // transaction.recentBlockhash = (
      //   await connection.getLatestBlockhash()
      // ).blockhash;

      console.log("Sign transaction freshly");
      const signed = await signTransaction(transaction);
      console.log("Sending transaction...");
      //const signature = await connection.sendRawTransaction(signed.serialize());
      const signature = await connection.sendRawTransaction(
        signed.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        }
      );

      //await connection.confirmTransaction(signature);
      // Confirm properly using the same blockhash context
      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed"
      );

      console.log("✅ SUCCESS! Transaction:", signature);

      // Check balances after transaction
      const buyerBalanceAfter = await connection.getBalance(publicKey);
      const treasuryBalanceAfter = await connection.getBalance(TREASURY_SOL);
      console.log(
        "Buyer balance after:",
        buyerBalanceAfter / anchor.web3.LAMPORTS_PER_SOL,
        "SOL"
      );
      console.log(
        "Treasury balance after:",
        treasuryBalanceAfter / anchor.web3.LAMPORTS_PER_SOL,
        "SOL"
      );
      handleupdateStageRaised(stageRaised + 1);
      setUserBalance((u) => u - Number(inputAmount));
      setInputAmount("");
      toast.success("Purchase successful!");
    } catch (err: any) {
      console.log("Error:", err);
      if (err.logs) {
        console.log("Full logs:", err.logs);
      }
      toast.error("Purchase failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading({
        active: false,
        action: "",
      });
    }
  }

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
              {`${currency}${formatAmount(stageRaised)}`}
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
              /{`${currency}${formatAmount(totalRaised)}`}
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
        <Box sx={{ width: "100%", px: px, mt: "25px" }}>
          <Divider sx={{ borderColor: "#C1A059" }} />
          <Divider sx={{ borderColor: "#FBD88E" }} />
        </Box>
        {/* hash */}
        {/* <Typography
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
        </Typography> */}
        <Typography
          variant='subtitle2'
          align='center'
          sx={{
            px: px,
            py: "15px",
            color: (theme) =>
              theme.palette.mode === "dark" ? "text.primary" : "primary.dark",
          }}
        >
          <PresaleCountdown targetDate='2025-11-06T00:00:00' small />
        </Typography>
        {/* divider */}
        <Box sx={{ width: "100%", px: px }}>
          <Divider sx={{ borderColor: "#C1A059" }} />
          <Divider sx={{ borderColor: "#FBD88E" }} />
        </Box>
      </>
      {/* input */}
      <>
        <Box sx={{ width: "100%", px: px, mt: "25px" }}>
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
                error={(Number(inputAmount) > userBalance) as boolean}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Select
                          open={openServerInput}
                          onOpen={() => setOpenServerInput(true)}
                          onClose={() => setOpenServerInput(false)}
                          value={selectedToken}
                          onChange={(e) => {
                            setSelectedToken(e.target.value);
                            setInputAmount("");
                          }}
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
                    ? formatAmount(
                        calculateSnmi(
                          Number(inputAmount),
                          selectedToken as "sol" | "usdc"
                        )
                      )
                    : ""
                }
                slotProps={{
                  input: {
                    readOnly: true,
                    // endAdornment: selectedToken &&
                    //   servers.find((s) => s.value === selectedToken) && (
                    //     <InputAdornment position='end'>
                    //       <img
                    //         src={
                    //           servers.find((s) => s.value === selectedToken)
                    //             .icon
                    //         }
                    //         style={{
                    //           width: "28px",
                    //           height: "28px",
                    //           borderRadius: "50%",
                    //         }}
                    //       />
                    //     </InputAdornment>
                    //   ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <img
                          src={"/dev/snmi.png"}
                          alt='snmi'
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
              {connected &&
                (loading.active && loading.action === "fetchBalance" ? (
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
                    {t("connectWallet.fetching")}
                  </Typography>
                ) : (
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
                        {formatAmount(userBalance)}{" "}
                        {selectedToken.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
            <Grid sx={{ flex: 1 }}>
              {selectedToken && (
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
                      1 {selectedToken.toUpperCase()}
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
                      {formatNumber(
                        selectedToken === "sol"
                          ? snmiToSol
                          : selectedToken === "usdc"
                          ? snmiToUsdc
                          : 0
                      )}
                      SNMI
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
      <Box
        sx={{
          width: "100%",
          px: px,
          mt: "30px",
          "& .wallet-adapter-dropdown": {
            width: "100%",
          },
        }}
      >
        {connected ? (
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
            disabled={
              loading.active &&
              (loading.action === "buyWithSol" ||
                loading.action === "buyWithUsdc")
            }
            onClick={() => {
              if (selectedToken && inputAmount) {
                if (selectedToken === "sol") buyWithSol(Number(inputAmount));
                else if (selectedToken === "usdc")
                  buyWithUsdc(Number(inputAmount));
              }
            }}
            startIcon={
              loading.active &&
              (loading.action === "buyWithSol" ||
                loading.action === "buyWithUsdc") ? (
                <CircularProgress size={20} color='inherit' />
              ) : null
            }
            id='buyButton'
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
              borderRadius: "4px",
              border: "2px solid #fff",
              fontWeight: 500,
              padding: "16px 19px",
              color:
                muiTheme.palette.mode === "dark"
                  ? muiTheme.palette.background.default
                  : muiTheme.palette.primary.dark,
              fontSize: "16px",
              lineHeight: "23px",
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
        )}
      </Box>

      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        sx={{ width: "100%", px: px, mt: "31px" }}
        gap='4px'
      >
        <Grid></Grid>
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
