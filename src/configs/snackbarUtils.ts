import { enqueueSnackbar } from "notistack";

export const showSnackbar = (
  message: string,
  variant: "success" | "error" | "warning" | "info" = "info"
) => {
  enqueueSnackbar(message, { variant });
};
