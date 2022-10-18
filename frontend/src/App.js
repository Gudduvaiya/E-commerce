import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateComponent from "./components/PrivateComponent";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import UpdateModaal from "./components/UpdateModaal";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            {" "}
            {/* These are private routes means they dont appear untill we want */}
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="//update-product/:id" element={<UpdateModaal />} />
            <Route path="/logout" element={<h1>Log Out</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
