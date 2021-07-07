window.addEventListener("LBP_GET_WINDOW_DATA", function getTokensInPage(event) {
  window.postMessage(
    {
      action: "LBP_SEND_USER",
      payload: {
        user_id: window.user ? window.user.id : 0,
        lang: window.lang,
      },
    },
    "*"
  );
});
