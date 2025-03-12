import { Routes, Route, Navigate } from "react-router-dom";
import SwapPage from "./pages/Swap/SwapPage";
import DexPage from "./pages/Dex/DexPage";
import PoolsPage from "./pages/LPPools/PoolsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/swap" replace />} />
      <Route path="/swap" element={<SwapPage />} />
      <Route path="/dex" element={<DexPage />} />
      <Route path="/pools" element={<PoolsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
