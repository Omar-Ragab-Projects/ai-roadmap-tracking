import { actionPromiseResponse } from "@/types/globalTypes";

const renderError = (error: any): actionPromiseResponse => {
  if (error instanceof Error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "error", message: "An error occured!" };
  }
};

export default renderError;
