import { createContext } from "react";

const headerTemplate = {
  "access-token": "",
  client: "",
  uid: "",
  expiry: "",
};

const APIHeaders = createContext(headerTemplate);

export default APIHeaders;
