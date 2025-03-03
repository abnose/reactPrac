import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../configs/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchTasks, addTask, editTask } from "../../redux/manageTasks/slice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
const TaskCrud = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const defaultValues = {
    title: "",
    description: "",
    isCompleted: false,
  };
  const validationSchema = yup.object({
    title: yup
      .string()
      .required("This Field Is Required")
      .max(50, "Title must not exceed 50 characters"),
    description: yup.string().required("This Field Is Required"),
    isCompleted: yup.boolean(),
  });

  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await api.get(`/api/task/${id}`);
      return response?.data;
    },
    enabled: !!id,
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

  useEffect(() => {
    if (data) {
      setValue("description", data?.description);
      setValue("title", data?.title);
      setValue("isCompleted", data?.completed);
    }
  }, [data]);

  const onSubmit = async (data: any) => {
    const taskData = {
      title: data?.title,
      description: data?.description,
      completed: data?.isCompleted,
      ...(id ? { id: Number(id) } : {}),
    };

    if (id) {
      await dispatch(
        editTask({ updatedTask: { ...taskData }, navigate })
      ).unwrap();
    } else {
      await dispatch(addTask({ newTask: taskData, navigate })).unwrap();
    }
  };

  return (
    <Box className="w-full">
      {isLoading ? (
        <Box className="w-full h-[100vh] flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box className="w-full h-[100vh] flex justify-center items-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center dark:text-white">
            No Tasks Found
          </h1>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="w-full h-[100vh] flex gap-2 justify-center items-center">
            <div className="w-[90%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <Box className="grid grid-cols-1 gap-2 mb-3 mt-[10px]">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="title"
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
                  <Button
                    type="submit"
                    color={id ? "warning" : "success"}
                    variant="outlined"
                  >
                    {id ? "Edit" : "Add"}
                  </Button>
                </Box>
              </Box>
            </div>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default TaskCrud;
