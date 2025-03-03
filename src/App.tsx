import Home from "./pages/home/Home";
import TaskCrud from "./pages/taskCrud/TaskCrud";

import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { Routes, Route } from "react-router-dom";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state?.tasks?.value);

  return (
    <>
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskCrud />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
