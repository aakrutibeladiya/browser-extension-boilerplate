// * dataProvider functions from/to storage only
// * can be used in extension context
var config = chrome.extension.getBackgroundPage().config;

function refresh_extension_data() {
  add_extension_settings_to_storage();
}

function add_extension_settings_to_storage(callback = () => {}) {
  try {
    api.get("/public/exSettings").then((res) => {
      if (res.success && !res.error) {
        chrome.storage.local.set(
          {
            settings: res.data,
          },
          function () {
            callback(res.data);
          }
        );
      } else {
        throw "settings_api_error" + res.msg;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function get_settings_from_storage() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["settings"], function (result) {
      if (result.settings) {
        resolve(result.settings);
      } else {
        refresh_extension_data();
        reject();
      }
    });
  });
}

function save_user_lang(lang) {
  //call this fun on language  switch
  chrome.storage.local.set({ extension_web_lang: lang }, function () {
    console.log("language selection saved");
  });
}
