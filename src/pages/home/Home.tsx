import { Box, IconButton, Switch, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  editTask,
  deleteTask,
} from "../../redux/manageTasks/slice";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);

  console.log(tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <div className=" absolute left-1 top-1">
        <Tooltip title="Add Task">
          <Link to="/task" className="text-blue-500">
            <IconButton color="success" aria-label="add">
              <AddIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </div>
      <Box className="flex justify-center items-center w-full p-3">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center dark:text-white">
          Todo App
        </h1>
      </Box>
      <Box className="w-full flex gap-2 justify-center items-center">
        <div className="w-[90%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <Box className="flex">
            <Switch defaultChecked />
            <Box className="mr-auto">
              <IconButton color="error" aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton color="warning" aria-label="edit">
                <ModeEditIcon />
              </IconButton>
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Home;
