import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Hompage from "./pages/Hompage/Hompage.jsx";
import { fetchCategory } from "./redux/slice/categorySlice.js";
import { useEffect } from "react";
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
function App() {
  const { user } = useSelector((state) => state.user);
  console.log(user?.role);
  const dispatch = useDispatch();
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
  return (
    <div className="App">
      <Router>
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
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductInfor />
              </Layout>
            }
          />
        </Routes>

        {user && user?.role == "Admin" && (
          <Routes>
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

export default App;
