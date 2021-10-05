import axios from "axios";

// export default function UserAPI() {
const BASEURL = "http://206.189.91.54//api/v1/";

export const signUp = (body) => {
  //ACCEPTS BODY (an object with email, password, and password confirmation)
  // RETURNS a promise (need ng then and catch parin)
  const url = BASEURL + "auth/";
  return axios.post(url, body);
};

export const logIn = (body) => {
  // ACCEPTS "body" (object w email and password)
  // example : UserAPI.signUp.then((response)=>console.log(response.header))
  const url = BASEURL + "auth/sign_in";
  return axios.post(url, body);
};

export const sendMsg = (header, body) => {
  // ACCEPTS "body" (object w receiver_id, receiver_class(usually "user") and body)
  const url = BASEURL + "messages";
  return axios.post(url, body, { headers: header });
};

export const getMsgs = (header, id, type) => {
  // ACCEPTS id = yung user_id ng kukunan mo ng messages (NOT EMAIL!), type is either "User" or "Channel"
  const url = BASEURL + `messages?receiver_class=${type}&receiver_id=${id}`;
  return axios.get(url, { headers: header });
};

export const createChannel = (header, body) => {
  // ACCEPTS "body" (object with "name" *eto yung channel name* and "user_ids" *array ng userIDS na ipapasok mo sa channel*)
  const url = BASEURL + `channels`;
  return axios.post(url, body, { headers: header });
};

export const getAllUsersChannels = (header) => {
  const url = BASEURL + `channels`;
  return axios.get(url, { headers: header });
};

export const getChannelDetails = (header, ID) => {
  // accepts yung channel ID
  const url = BASEURL + `channels/${ID}`;
  return axios.get(url, { headers: header });
};

export const addChannelMember = (header, channelID, userID) => {
  // isa isa add member to a channel, var names should be self explanatory
  const url = BASEURL + `channel/add_member`;
  return axios.post(
    url,
    { id: channelID, member_id: userID },
    { headers: header }
  );
};

export const listOfUsers = (header) => {
  // GETS ALL USERS (example: .then(res => setUsers(res.data.data))) wherein setUSers yung pang set mo ng state ng all users
  const url = BASEURL + `users`;
  return axios.get(url, { headers: header });
};

export const getRecent = (header) => {
  const url = BASEURL + `users/recent`;
  return axios.get(url, { headers: header });
};
// }
