import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, Dialog, IconButton } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "./contexts/ThemeContext";
import i18n from "./i18n/config";
import AppRoutes from "./Routes";
import PresaleCountdown from "./components/PresaleCountdown";
import { Close as CloseIcon } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";

const AppComponent = () => {
  const [presaleModal, setPresaleModal] = useState(false);

  const modal = (
    <Dialog
      open={presaleModal}
      onClose={() => setPresaleModal(false)}
      maxWidth='sm'
      fullWidth
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#222",
          py: "50px",
        }}
      >
        <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
          <IconButton onClick={() => setPresaleModal(false)}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <PresaleCountdown targetDate='2025-11-02T00:00:00' />
      </Box>
    </Dialog>
  );
  return (
    <>
      {modal}
      <AppRoutes />
    </>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <BrowserRouter>
          <Toaster position='bottom-center' />

          <AppComponent />
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
};
export default App;
