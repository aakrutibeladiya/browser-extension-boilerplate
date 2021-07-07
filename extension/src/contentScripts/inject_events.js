if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  //* get token event listener from get_token file
  let app_reg = new RegExp(config.app_reg);
  let out_reg = new RegExp(config.app_out_url);
  if (app_reg.test(window.location.href)) {
    let th = document.getElementsByTagName("body")[0];
    let injectSc = document.createElement("script");
    let filePath = chrome.runtime.getURL("src/contentScripts/get_token.js");
    injectSc.setAttribute("type", "text/javascript");
    injectSc.setAttribute("src", filePath);
    th.appendChild(injectSc);
    th.removeChild(injectSc);
    setTimeout(() => {
      let event = new CustomEvent("LBP_GET_WINDOW_DATA");
      window.dispatchEvent(event);
    }, 2000);
  }
}

//* first message call from inject to background to check URL
chrome.runtime.sendMessage({
  from: "inject_events",
  action: "CHECK_THIS_WEBPAGE_FOR_AVAILABLE_STORES",
  data: {
    referrer: document.referrer,
  },
});

window.addEventListener(
  "message",
  function receiveTokens(event) {
    if (event.data.action === "LBP_SEND_USER") {
      const { payload } = event.data;
      let user_tokens = {
        user_id: payload.user_id,
        lang: payload.lang,
      };

      chrome.runtime.sendMessage({
        from: "inject_events",
        action: "GET_ROOT_TOKEN",
        data: user_tokens,
      });
    }
  },
  false
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "show_demo_popup") {
    render_demo_popup(request.data);
  }
});
