import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </I18nextProvider>
);

export default App;
