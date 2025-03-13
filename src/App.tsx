import { useEffect } from "react";
import Header from "./components/layout/Header/Header";
import AppRoutes from "./routes";
import { useWallet } from "@suiet/wallet-kit";
import Footer from "./components/layout/Footer/Footer";

const App = () => {
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected) {
      console.log("Connected wallet:", wallet.name);
      console.log("Account address:", wallet.account?.address);
    }
  }, [wallet.connected, wallet.account, wallet.name]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <AppRoutes />
        </div>
      </main>
      <Footer />
      <div className="background-overlay"></div>
    </div>
  );
};

export default App;
