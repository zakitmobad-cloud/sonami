import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Roadmap from "./pages/roadmap";
import HowToBuy from "./pages/howToBuy";
import Tokenomics from "./pages/tokenomics";
import FAQS from "./pages/faqs";
import Chain from "./pages/chain";
import Utility from "./pages/utility";
import DevUpdates from "./pages/devUpdates";

import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
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
  );
}
