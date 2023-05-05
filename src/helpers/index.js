import axios from "axios";

import predefined from "./predefined";

const URL_BASE = 'http://localhost:10016'
const response = { data: null, error: null, detalle: null };

export default {
  dopost,
  doget,
  doput,
  dodel,
  from,
  ...predefined
};

function doget(url, params) {
  return axios({
    method: "get",
    url,
    params,
  });
}

function dopost(url, data, params) {
  return axios({
    method: "post",
    url,
    params,
    data: JSON.stringify(data),
    headers: {
      'content-type': "application/json"
    }
  });
}

function doput(url, data, params) {
  return axios({
    method: "put",
    url,
    params,
    data: JSON.stringify(data),
    contentType: "application/json",
    processData: false,
  });
}

function dodel(url, data, params) {
  return axios({
    method: "delete",
    url,
    params,
    data: JSON.stringify(data),
    contentType: "application/json",
    processData: false,
  });
}

function from(controller) {
  const map = {
    get(params = {}) {
      return doget(`${URL_BASE}${controller}`, params);
    },
    post(data, params = {}) {
      return dopost(`${URL_BASE}${controller}`, data, params)
        .then((res) => (response.data = res))
        .catch((error) => (response.error = error));
    },
    put(data, params = {}) {
      return doput(`${URL_BASE}${controller}`, data, params);
    },
    del(data, params = {}) {
      return dodel(`${URL_BASE}${controller}`, data, params);
    },
  };

  return map;
}
