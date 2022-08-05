import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./features/header/header";
import Login from "./features/login/Login";
import Register from "./features/register/register";
import Dashboard from "./features/dashboard/dashboard";
import AddRecord from "./features/addRecord/addRecord";
import RecordOne from "./features/recordOne/recordOne";
import Investments from "./features/investments/investments";
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/addRecord" element={<AddRecord></AddRecord>}></Route>
        <Route path="/view/:id" element={<RecordOne></RecordOne>}></Route>
        <Route
          path="/investments"
          element={<Investments></Investments>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
