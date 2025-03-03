import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../redux/manageTasks/slice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
let id: number;

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";

const Home = () => {
  const defaultValues = {
    title: "",
    description: "",
    isCompleted: true,
  };
  const validationSchema = yup.object({
    title: yup.string().required("This Field Is Required"),
    description: yup.string().required("This Field Is Required"),
    isCompleted: yup.boolean(),
  });
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, error } = useSelector(
    (state: RootState) => state?.task
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (taskId: number) => {
    id = taskId;
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDeleteTask = async () => {
    await dispatch(deleteTask({ taskId: id, closeModal })).unwrap();
  };

  const handleNavigation = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };

  const onSubmit = () => {};

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="w-full h-[100vh] flex gap-2 justify-center items-center ">
          <div className="w-[90%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Box className="grid grid-cols-1 gap-2 mb-3 mt-[10px]">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="title"
                    // disabled={doAdd.isLoading || doEdit.isLoading}
                    label={
                      <div className="flex gap-1">
                        <p style={{ fontSize: "14px", color: "red" }}>*</p>
                        <p>title</p>
                      </div>
                    }
                    inputProps={{
                      style: {
                        direction: "ltr",
                      },
                    }}
                    variant="outlined"
                    placeholder="title"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="description"
                    // disabled={doAdd.isLoading || doEdit.isLoading}
                    label={
                      <div className="flex gap-1">
                        <p style={{ fontSize: "14px", color: "red" }}>*</p>
                        <p>description</p>
                      </div>
                    }
                    inputProps={{
                      style: {
                        direction: "ltr",
                      },
                    }}
                    maxRows={4}
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="description"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
              <FormControlLabel
                control={
                  <Controller
                    name="isCompleted"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="completed"
              />
              <Box className="flex justify-end items-center">
                <Button type="submit" color="success" variant="outlined">
                  search
                </Button>
              </Box>
            </Box>
          </div>
        </Box>
      </form> */}
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
      {tasks?.length !== 0 ? (
        <Box className="w-full flex flex-col gap-2 justify-center items-center">
          {tasks?.map((item) => {
            return (
              <div
                key={item.id}
                className={`w-[90%] p-6 border border-gray-200 rounded-lg shadow-sm 
        ${
          item.completed
            ? "bg-green-100 dark:bg-green-900"
            : "bg-white dark:bg-gray-800"
        }
        ${
          item.completed
            ? "border-green-300 dark:border-green-700"
            : "border-gray-200 dark:border-gray-700"
        }`}
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
                <Box className="flex">
                  {/* <Switch checked={item?.completed} /> */}
                  <Typography>
                    {item.completed ? "completed" : "not completed"}
                  </Typography>
                  <Box className="ml-auto">
                    <IconButton
                      onClick={() => handleClickOpen(item.id)}
                      color="error"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleNavigation(item?.id)}
                      color="warning"
                      aria-label="edit"
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </Box>
                </Box>
              </div>
            );
          })}
        </Box>
      ) : status == "loading" ? (
        <Box className="w-full h-[100vh] flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="w-full h-[100vh] flex justify-center items-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center dark:text-white">
            No Tasks
          </h1>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Delete This Task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>close</Button>
          <Button onClick={handleDeleteTask} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
