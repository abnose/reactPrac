import { useMemo, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incremented, incrementedWithDelay } from "./redux/counter/slice";
import { AppDispatch, RootState } from "./redux/store";
import { multiply } from "./redux/multiply/slice";
let showingTodo = [];
let initTodo = [];
interface IState {
  text: string;
  id: number;
  isCompleted: boolean;
}

interface IAction {
  type: "add" | "remove" | "completed" | "filter";
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
      const addedItem = [
        ...state,
        {
          text: payload,
          isCompleted: false,
          id: getRandomInt(5000),
        },
      ];
      initTodo = addedItem;
      return addedItem;
    case "remove":
      const filterItem = state?.filter((item) => item.id !== payload);
      initTodo = filterItem;
      return { ...state, ...filterItem };
    case "completed":
      const completedItem = state?.map((item) => {
        if (item.id == payload) {
          item.isCompleted = true;
        }
        return item;
      });
      initTodo = completedItem;
      return { ...state, ...completedItem };
    case "filter":
      const filterDataBy = initTodo?.filter(
        (item) => item.isCompleted == payload
      );
      return [...state, ...filterDataBy];
    default:
      return { ...state };
  }
};

function App() {
  const [type, setType] = useState("all");
  const [text, setText] = useState("");
  const count = useSelector((state: RootState) => state?.counter?.value);
  const dispatch = useDispatch<AppDispatch>();
  const mCount = useSelector((state: RootState) => state?.multiplyer?.value);

  const [state, dispatchReducer] = useReducer(reducerHandler, []);

  const handleRadioBtn = (event) => {
    setType(event);
  };

  useMemo(() => {
    console.log(type);
    switch (type) {
      case "all":
        return state;
      case "completed":
        // initTodo = state.filter((item) => item.isCompleted == true);
        dispatchReducer({ type: "filter", payload: true });
      case "notCompleted":
        // initTodo = state.filter((item) => item.isCompleted == false);
        dispatchReducer({ type: "filter", payload: false });
      default:
        return state;
    }
  }, [type]);

  console.log(state);

  showingTodo = state;
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
        <div className="filtersCon">
          <div
            className="filters"
            onChange={(event) => handleRadioBtn(event.target.value)}
          >
            <input type="radio" value="completed" name="gender" /> completed
            <input type="radio" value="notCompleted" name="gender" /> not
            completed
            <input type="radio" value="all" name="gender" /> all
          </div>
        </div>
        <div className="subContainer">
          {state.length ? (
            state?.map((item) => (
              <>
                <div
                  key={item.id}
                  className="card"
                  style={{
                    background: item.isCompleted ? "rgba(85, 3, 3, 0.301)" : "",
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
                      dispatchReducer({ type: "remove", payload: item.id });
                    }}
                    className="remove"
                  >
                    remove
                  </button>
                </div>
              </>
            ))
          ) : (
            <></>
          )}

          {/* <div className="completedCon">
            <h3>completed</h3>
            {showingTodo.length ? (
              showingTodo?.map((item) => (
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
            {showingTodo.length ? (
              showingTodo?.map((item) => (
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
