import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Hompage from "./pages/Hompage/Hompage.jsx";
import { fetchCategory } from "./redux/slice/categorySlice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const fetchdataCategory = async () => {
    await dispatch(fetchCategory());
  };
  useEffect(() => {
    fetchdataCategory();
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
