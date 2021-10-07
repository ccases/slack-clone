const Headers = {
  "access-token": localStorage.getItem("access-token"),
  expiry: localStorage.getItem("expiry"),
  uid: localStorage.getItem("uid"),
  client: localStorage.getItem("client"),
};

export default Headers;
