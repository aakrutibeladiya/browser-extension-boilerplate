//* bg events

//* on extension installed
chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: config.welcome_url });
  refresh_extension_data();
  remove_old_cashback_data();
});

//* event listener for incoming messages
chrome.runtime.onMessage.addListener(function (request, sender, send_response) {
  //* all message are handled here

  if (request.action === "GET_ROOT_TOKEN") {
    get_root_token(request.data, sender.url);
  }
});

chrome.runtime.onStartup.addListener(function () {
  refresh_extension_data();
});

chrome.tabs.onUpdated.addListener(function (tab_id, change_info, tab) {
  if (change_info.status == "complete" && tab.active) {
    let google_regex = new RegExp("google.com");

    if (google_regex.test(tab.url)) {
      chrome.tabs.sendMessage(tab.id, {
        from: "bg_support_functions",
        action: "show_demo_popup",
        data: {},
      });
    }
    set_browser_action_badge();
  }
});

chrome.tabs.onActivated.addListener(function (tab_id) {
  set_browser_action_badge();
});

function set_browser_action_badge() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    if (tabs[0].url) {
      chrome.browserAction.setBadgeText({ text: "👋" });
    }
  });
}
