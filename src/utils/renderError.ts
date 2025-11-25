const renderError = (
  error: any
): { status: "success" | "error"; message: string } => {
  if (error instanceof Error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "error", message: "An error occured!" };
  }
};

export default renderError;
