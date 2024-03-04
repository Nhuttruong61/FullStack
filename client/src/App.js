import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Hompage from "./pages/Hompage/Hompage.jsx";
import { fetchCategory } from "./redux/slice/categorySlice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "./redux/slice/productSlice.js";
function App() {
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
          <Route path="/" element={<Hompage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
