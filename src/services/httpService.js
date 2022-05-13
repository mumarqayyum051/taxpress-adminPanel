import axios from "axios";

const headersConfig = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const _get = async (path) => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: headersConfig,
    })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const _post = async (path, body) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}${path}`, body, {
      headers: headersConfig,
    })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const _put = async (path, body) => {
  return await axios
    .put(`${process.env.REACT_APP_API_URL}${path}`, body, {
      headers: headersConfig,
    })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const _delete = async (path) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: headersConfig,
    })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
