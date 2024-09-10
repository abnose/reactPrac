import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incremented, incrementedWithDelay } from "./redux/counter/slice";
import { AppDispatch, RootState } from "./redux/store";
import { multiply } from "./redux/multiply/slice";
function App() {
  const count = useSelector((state: RootState) => state?.counter?.value);
  const dispatch = useDispatch<AppDispatch>();
  console.log(count);

  const mCount = useSelector((state: RootState) => state?.multiplyer?.value);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            dispatch(incremented());
          }}
        >
          count is {count}
        </button>
        <button
          onClick={() => {
            dispatch(multiply());
          }}
        >
          count is {mCount}
        </button>
        <button
          onClick={() => {
            dispatch(incrementedWithDelay(5));
          }}
        >
          count with delay is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
