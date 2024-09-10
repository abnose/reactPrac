import { useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incremented, incrementedWithDelay } from "./redux/counter/slice";
import { AppDispatch, RootState } from "./redux/store";
import { multiply } from "./redux/multiply/slice";

interface IState {
  text: string;
  id: number;
  isCompleted: boolean;
}

interface IAction {
  type: "add" | "remove" | "completed";
  payload: any;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const reducerHandler = (state: IState[], action: IAction) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    case "add":
      return [
        ...state,
        {
          text: payload,
          isCompleted: false,
          id: getRandomInt(5000),
        },
      ];
    case "remove":
      const filterItem = state?.filter((item) => item.id !== payload);
      return [...filterItem];
    case "completed":
      const completedItem = state?.map((item) => {
        if (item.id == payload) {
          item.isCompleted = true;
        }
        return item;
      });
      console.log(completedItem);
      return [...completedItem];
    default:
      return { ...state };
  }
};

function App() {
  const [text, setText] = useState("");
  const count = useSelector((state: RootState) => state?.counter?.value);
  const dispatch = useDispatch<AppDispatch>();
  const mCount = useSelector((state: RootState) => state?.multiplyer?.value);

  const [state, dispatchReducer] = useReducer(reducerHandler, []);

  console.log(state);

  return (
    <>
      <div className="mainContainer">
        <h1 className="header">To Do App</h1>
        <div className="addToDo">
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button
            onClick={() => {
              if (text.trim() !== "") {
                dispatchReducer({ type: "add", payload: text });
                setText("");
              }
            }}
          >
            Add
          </button>
        </div>
        <div className="subContainer">
          <div className="completedCon">
            <h3>completed</h3>
            {state.length ? (
              state?.map((item) => (
                <>
                  {item.isCompleted && (
                    <div
                      key={item.id}
                      className="card"
                      style={{
                        background: item.isCompleted
                          ? "rgba(85, 3, 3, 0.301)"
                          : "",
                      }}
                    >
                      <p className="text">{item.text}</p>
                      {!item.isCompleted && (
                        <button
                          onClick={() => {
                            dispatchReducer({
                              type: "completed",
                              payload: item.id,
                            });
                          }}
                          className="completed"
                        >
                          completed
                        </button>
                      )}
                      <button
                        onClick={() => {
                          console.log("clicked");
                          dispatchReducer({ type: "remove", payload: item.id });
                        }}
                        className="remove"
                      >
                        remove
                      </button>
                    </div>
                  )}
                </>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="notCompletedCon">
            <h3>not completed</h3>
            {state.length ? (
              state?.map((item) => (
                <>
                  {!item.isCompleted && (
                    <div
                      key={item.id}
                      className="card"
                      style={{
                        background: item.isCompleted
                          ? "rgba(85, 3, 3, 0.301)"
                          : "",
                      }}
                    >
                      <p className="text">{item.text}</p>
                      {!item.isCompleted && (
                        <button
                          onClick={() => {
                            dispatchReducer({
                              type: "completed",
                              payload: item.id,
                            });
                          }}
                          className="completed"
                        >
                          completed
                        </button>
                      )}
                      <button
                        onClick={() => {
                          console.log("clicked");
                          dispatchReducer({ type: "remove", payload: item.id });
                        }}
                        className="remove"
                      >
                        remove
                      </button>
                    </div>
                  )}
                </>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
