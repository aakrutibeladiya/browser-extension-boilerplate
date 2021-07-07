// * fetch api helper

// var config = chrome.runtime.getBackgroundPage().config;
const api = {
  get: function (query, header = {}) {
    return new Promise(function (resolve, reject) {
      let opts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      };
      fetch(config.api_app_url + query, opts)
        .then((response) => response.json())
        .then(function (data) {
          resolve(data);
        })
        .catch((error) => {
          let err = {
            resError: error,
            message: "Server not responding!",
          };
          reject(err);
        });
    });
  },
  post: function (url_path, body, header = {}) {
    return new Promise(function (resolve, reject) {
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
        body: JSON.stringify(body),
      };
      fetch(config.api_app_url + url_path, opts)
        .then((response) => response.json())
        .then(function (data) {
          resolve(data);
        })
        .catch((error) => {
          let err = {
            resError: error,
            message: "Server not responding!",
          };
          reject(err);
        });
    });
  },
};
