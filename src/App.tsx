import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incremented } from "./redux/counter/slice";
function App() {
  const [count, setCount] = useState(0);
  // console.log(store.dispatch);
  // const { counterSlice } = useSelector((counterSlice) => counterSlice);

  // useSelector(({ counterSlice }) => counterSlice)?.counterSlice;
  const dispatch = useDispatch();
  const data = useSelector((counterSlicer) => counterSlicer);
  dispatch(incremented());
  console.log(data.counterSlicer.value);
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
        <button onClick={() => dispatch(incremented())}>
          count is {data.counterSlicer.value}
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
