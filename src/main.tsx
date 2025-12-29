import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App.tsx";
import { SanFranciscoFAQ } from "./app/pages/SanFranciscoFAQ.tsx";
import { SanJoseFAQ } from "./app/pages/SanJoseFAQ.tsx";
import { SaratogaFAQ } from "./app/pages/SaratogaFAQ.tsx";
import { LosAltosFAQ } from "./app/pages/LosAltosFAQ.tsx";
import { MountainViewFAQ } from "./app/pages/MountainViewFAQ.tsx";
import { PaloAltoFAQ } from "./app/pages/PaloAltoFAQ.tsx";
import { SunnyvaleFAQ } from "./app/pages/SunnyvaleFAQ.tsx";
import { CupertinoFAQ } from "./app/pages/CupertinoFAQ.tsx";
import { SantaClaraFAQ } from "./app/pages/SantaClaraFAQ.tsx";
import { MilpitasFAQ } from "./app/pages/MilpitasFAQ.tsx";
import { CampbellFAQ } from "./app/pages/CampbellFAQ.tsx";
import { LosGatosFAQ } from "./app/pages/LosGatosFAQ.tsx";
import { PleasantonFAQ } from "./app/pages/PleasantonFAQ.tsx";
import { DublinFAQ } from "./app/pages/DublinFAQ.tsx";
import { SanRamonFAQ } from "./app/pages/SanRamonFAQ.tsx";
import { FremontFAQ } from "./app/pages/FremontFAQ.tsx";
import { NewarkFAQ } from "./app/pages/NewarkFAQ.tsx";
import { UnionCityFAQ } from "./app/pages/UnionCityFAQ.tsx";
import { HaywardFAQ } from "./app/pages/HaywardFAQ.tsx";
import { SanMateoFAQ } from "./app/pages/SanMateoFAQ.tsx";
import { BurlingameFAQ } from "./app/pages/BurlingameFAQ.tsx";
import { RedwoodCityFAQ } from "./app/pages/RedwoodCityFAQ.tsx";
import { MenloParkFAQ } from "./app/pages/MenloParkFAQ.tsx";
import { AthertonFAQ } from "./app/pages/AthertonFAQ.tsx";
import { WoodsideFAQ } from "./app/pages/WoodsideFAQ.tsx";
import { PortolaValleyFAQ } from "./app/pages/PortolaValleyFAQ.tsx";
import { FosterCityFAQ } from "./app/pages/FosterCityFAQ.tsx";
import { SanCarlosFAQ } from "./app/pages/SanCarlosFAQ.tsx";
import { BelmontFAQ } from "./app/pages/BelmontFAQ.tsx";
import { HillsboroughFAQ } from "./app/pages/HillsboroughFAQ.tsx";
import { WalnutCreekFAQ } from "./app/pages/WalnutCreekFAQ.tsx";
import { DanvilleFAQ } from "./app/pages/DanvilleFAQ.tsx";
import { LafayetteFAQ } from "./app/pages/LafayetteFAQ.tsx";
import { OrindaFAQ } from "./app/pages/OrindaFAQ.tsx";
import { MoragaFAQ } from "./app/pages/MoragaFAQ.tsx";
import { AlamedaFAQ } from "./app/pages/AlamedaFAQ.tsx";
import { BerkeleyFAQ } from "./app/pages/BerkeleyFAQ.tsx";
import { OaklandFAQ } from "./app/pages/OaklandFAQ.tsx";
import { DalyCityFAQ } from "./app/pages/DalyCityFAQ.tsx";
import { SouthSanFranciscoFAQ } from "./app/pages/SouthSanFranciscoFAQ.tsx";
import { PacificaFAQ } from "./app/pages/PacificaFAQ.tsx";
import { HalfMoonBayFAQ } from "./app/pages/HalfMoonBayFAQ.tsx";
import { NotFound } from "./app/pages/NotFound.tsx";
import { CascadeFAQ } from "./app/pages/CascadeFAQ.tsx";
import { SubmitTestimonialPage } from "./app/pages/SubmitTestimonialPage.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* Company FAQ */}
      <Route path="/faq" element={<CascadeFAQ />} />
      {/* Submit Testimonial */}
      <Route path="/submit-testimonial" element={<SubmitTestimonialPage />} />
      {/* San Francisco */}
      <Route path="/sfo" element={<SanFranciscoFAQ />} />
      {/* Santa Clara County */}
      <Route path="/san-jose" element={<SanJoseFAQ />} />
      <Route path="/saratoga" element={<SaratogaFAQ />} />
      <Route path="/los-altos" element={<LosAltosFAQ />} />
      <Route path="/mountain-view" element={<MountainViewFAQ />} />
      <Route path="/palo-alto" element={<PaloAltoFAQ />} />
      <Route path="/sunnyvale" element={<SunnyvaleFAQ />} />
      <Route path="/cupertino" element={<CupertinoFAQ />} />
      <Route path="/santa-clara" element={<SantaClaraFAQ />} />
      <Route path="/milpitas" element={<MilpitasFAQ />} />
      <Route path="/campbell" element={<CampbellFAQ />} />
      <Route path="/los-gatos" element={<LosGatosFAQ />} />
      {/* Alameda County - Tri-Valley */}
      <Route path="/pleasanton" element={<PleasantonFAQ />} />
      <Route path="/dublin" element={<DublinFAQ />} />
      {/* Contra Costa County */}
      <Route path="/san-ramon" element={<SanRamonFAQ />} />
      <Route path="/walnut-creek" element={<WalnutCreekFAQ />} />
      <Route path="/danville" element={<DanvilleFAQ />} />
      <Route path="/lafayette" element={<LafayetteFAQ />} />
      <Route path="/orinda" element={<OrindaFAQ />} />
      <Route path="/moraga" element={<MoragaFAQ />} />
      {/* Alameda County - Other */}
      <Route path="/fremont" element={<FremontFAQ />} />
      <Route path="/newark" element={<NewarkFAQ />} />
      <Route path="/union-city" element={<UnionCityFAQ />} />
      <Route path="/hayward" element={<HaywardFAQ />} />
      <Route path="/alameda" element={<AlamedaFAQ />} />
      <Route path="/berkeley" element={<BerkeleyFAQ />} />
      <Route path="/oakland" element={<OaklandFAQ />} />
      {/* San Mateo County */}
      <Route path="/san-mateo" element={<SanMateoFAQ />} />
      <Route path="/burlingame" element={<BurlingameFAQ />} />
      <Route path="/redwood-city" element={<RedwoodCityFAQ />} />
      <Route path="/menlo-park" element={<MenloParkFAQ />} />
      <Route path="/atherton" element={<AthertonFAQ />} />
      <Route path="/woodside" element={<WoodsideFAQ />} />
      <Route path="/portola-valley" element={<PortolaValleyFAQ />} />
      <Route path="/foster-city" element={<FosterCityFAQ />} />
      <Route path="/san-carlos" element={<SanCarlosFAQ />} />
      <Route path="/belmont" element={<BelmontFAQ />} />
      <Route path="/hillsborough" element={<HillsboroughFAQ />} />
      <Route path="/daly-city" element={<DalyCityFAQ />} />
      <Route path="/south-san-francisco" element={<SouthSanFranciscoFAQ />} />
      <Route path="/pacifica" element={<PacificaFAQ />} />
      <Route path="/half-moon-bay" element={<HalfMoonBayFAQ />} />
      {/* 404 - Must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
