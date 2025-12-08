import { Route, BrowserRouter as Router, Routes, } from "react-router-dom";
import Hompage from "./pages/Hompage/Hompage.jsx";
import { fetchCategory } from "./redux/slice/categorySlice.js";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./redux/slice/productSlice.js";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import Layout from "./componets/Layout/Layout.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductInfor from "./pages/ProductPage/ProductInforPage/ProductInfor.jsx";
import LayoutAdmin from "./componets/Admin/LayoutAdmin.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import Pertional from "./pages/PertionalPage/Pertional.jsx";
import Payment from "./pages/PaymentPage/Payment.jsx";
import Order from "./pages/OrderPage/Order.jsx";
import BlogInfor from "./pages/Blog/BlogInfor/BlogInfor.jsx";
import BlogPage from "./pages/Blog/BlogPage/BlogPage.jsx";
import Fchat from "./componets/fchat/Fchat.jsx";
import WishlistPage from "./componets/wishlist/WishlistPage.jsx";
import MiniGames from "./pages/MiniGamesPage/MiniGames.jsx";
import Rewards from "./pages/RewardsPage/Rewards.jsx";
import MaintenancePage from "./pages/MaintenancePage/MaintenancePage.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import { SettingsProvider, useSettings } from "./contexts/SettingsContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import TestTheme from "./pages/TestTheme.jsx";

function AppContent() {
  const { user } = useSelector((state) => state.user);
  const { settings, loading, refetchSettings } = useSettings();
  const dispatch = useDispatch();
  const pollingIntervalRef = useRef(null);
  
  const fetchdataCategory = async () => {
    dispatch(fetchCategory());
  };
  const fetchProducts = async () => {
    dispatch(fetchProduct());
  };

  useEffect(() => {
    fetchdataCategory();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!user?.role || user.role === "admin") return;

    pollingIntervalRef.current = setInterval(() => {
      refetchSettings();
    }, 10000);

    return () => clearInterval(pollingIntervalRef.current);
  }, [user, refetchSettings]);

  if (loading) {
    return <div className="App">Đang tải...</div>;
  }

  return (
    <div className="App">
      <Router>
        {settings?.maintenanceMode && user?.role !== "admin" ? (
          <Routes>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="*" element={<MaintenancePage message={settings.maintenanceMessage} />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Hompage />

                </Layout>
              }
            />
          <Route
            path="category/:category"
            element={
              <Layout>
                <ProductPage />
              </Layout>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/product/:slug"
            element={
              <Layout>
                <ProductInfor />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout>
                <Pertional />
              </Layout>
            }
          />
          <Route
            path="/payment"
            element={
              <Layout>
                <Payment />
              </Layout>
            }
          />
          <Route
            path="/order"
            element={
              <Layout>
                <Order />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <BlogPage />
              </Layout>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Layout>
                <BlogInfor />
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <WishlistPage />
              </Layout>
            }
          />
          <Route
            path="/minigames"
            element={
              <Layout>
                <MiniGames />
              </Layout>
            }
          />
          <Route
            path="/rewards"
            element={
              <Layout>
                <Rewards />
              </Layout>
            }
          />
          <Route
            path="/test-theme"
            element={<TestTheme />}
          />
          <Route
            path="/admin"
            element={
              <LayoutAdmin>
                <AdminPage />
              </LayoutAdmin>
            }
          />
        </Routes>
        )}
        {!(settings?.maintenanceMode && user?.role !== "admin") && <Fchat />}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;
