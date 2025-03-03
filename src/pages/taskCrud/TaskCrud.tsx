import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";

const TaskCrud = () => {
  const defaultValues = {
    title: "",
    description: "",
  };
  const validationSchema = yup.object({
    title: yup.string().required("نمی تواند خالی باشد"),
    description: yup.string().required("نمی تواند خالی باشد"),
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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <Box>
                <Button color="success" variant="outlined">
                  Add
                </Button>
                <Button color="warning" variant="outlined">
                  edit
                </Button>
              </Box>
            </Box>
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default TaskCrud;
