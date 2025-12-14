export type actionPromiseResponse = {
  status: "success" | "error";
  message: string;
  payload?: any;
};
