import qs from "qs";
import axios from "axios";

export function _ajax(options) {
  let { method, url, data } = options;
  method = method.toLowerCase();
  if (method === "post") {
    data = qs.stringify(data);
  }
  return new Promise((resolve, reject) => {
    axios({ method, url, data })
      .then(res => {
        resolve(res);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}
