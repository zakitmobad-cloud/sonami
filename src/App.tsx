import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "./contexts/ThemeContext";
import i18n from "./i18n/config";
import Index from "./pages/Index";
import Roadmap from "./pages/roadmap";
import HowToBuy from "./pages/howToBuy";
import Tokenomics from "./pages/tokenomics";
import FAQS from "./pages/faqs";
import Chain from "./pages/chain";
import Utility from "./pages/utility";
import DevUpdates from "./pages/devUpdates";

import NotFound from "./pages/NotFound";

const App = () => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/roadmap' element={<Roadmap />} />
          <Route path='/help' element={<HowToBuy />} />
          <Route path='/tokenomics' element={<Tokenomics />} />
          <Route path='/faqs' element={<FAQS />} />
          <Route path='/chain' element={<Chain />} />
          <Route path='/utility' element={<Utility />} />
          <Route path='/dev-updates' element={<DevUpdates />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </I18nextProvider>
);

export default App;
