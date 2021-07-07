//*  all event handlers for sidebar/popup
//* can be separated based on tabs and components
//TODO: show loader if data is not available
var config = chrome.extension.getBackgroundPage().config;
const top_stores_tab = {
  class: "nav-link active",
  id: "topStores-tab",
  "data-toggle": "pill",
  href: "#topStores",
  role: "tab",
  "aria-controls": "topStores",
  "aria-selected": "true",
  title: "top_stores",
};
const top_offers_tab = {
  class: "nav-link",
  id: "topOffers-tab",
  "data-toggle": "pill",
  href: "#topOffers",
  role: "tab",
  "aria-controls": "topOffers",
  "aria-selected": "true",
  title: "top_offers",
};

var top_stores = [];
set_user_lang(); // call before all partial insertion

document.addEventListener("DOMContentLoaded", function () {
  render_default_tabs();
  render_snack_bar();
});

function render_default_tabs() {
  render_home_screen();
  render_refer_n_earn({});
  render_account_tab({ member_since: "20/12/2020" });
}

function render_snack_bar() {
  render_template({}, "popup_snack_bar").then(function (dynamicHtml) {
    $(".page-content").append(dynamicHtml);
  });
}

function render_home_screen() {
  top_stores_tab.title = i18next.t(top_stores_tab.title);
  top_offers_tab.title = i18next.t(top_offers_tab.title);
  let top_nav_tab = [];
  top_nav_tab.push(top_stores_tab, top_offers_tab);
  render_top_nav_tabs(top_nav_tab);
  $("#topOffers").removeClass("show active");
}

function render_home_page() {
  render_popup_header({ login_url: "" });
  render_top_stores();
  render_top_offers();
}

function render_popup_header(user) {
  render_template(user, "popup_header_login").then(function (
    popup_header_html
  ) {
    $("#popup_header").append(popup_header_html);
  });
}

function render_top_nav_tabs(top_tab_data) {
  render_template({ top_tab_data }, "popup_nav_tab").then(function (
    popup_nav_tabs
  ) {
    $(".home-nav-tabs").append(popup_nav_tabs);
    $(".home-inner-nav a").click(function (e) {
      $(".home-inner-nav a").removeClass("active");
      $(this).addClass("active");
    });
    render_home_page();
  });
}

function render_store_details(store_details) {
  render_template(store_details, "popup_store_detail").then(function (
    popup_store_detail
  ) {
    $("#storeDetails").append(popup_store_detail);
  });
}

function render_top_stores() {
  render_template({ title: "top_stores" }, "popup_top_store_list_view").then(
    function (dynamicHtml) {
      $(".top-store-list").append(dynamicHtml);
    }
  );
}

function render_top_offers() {
  render_template({ title: "top_offers" }, "popup_top_offers_list_view").then(
    function (dynamicHtml) {
      $("#top_offers_tab").append(dynamicHtml);
    }
  );
}

function render_account_tab(member_info) {
  render_template(
    {
      ...member_info,
    },
    "popup_my_account"
  ).then(function (popup_my_account_html) {
    $("#my_account_tab").append(popup_my_account_html);
  });
}

function render_refer_n_earn(urls) {
  render_template(
    { ...urls, referral_cashback: config.referral_cashback },
    "popup_refer_n_earn"
  ).then(function (refer_n_earn_html) {
    $("#refer_n_earn_tab").append(refer_n_earn_html);
  });
}

function add_to_clipboard(text) {
  var copyElement = document.createElement("input");
  copyElement.style.position = "fixed";
  copyElement.style.opacity = "0";
  copyElement.value = text;
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(copyElement);
  copyElement.select();
  document.execCommand("copy");
  body.removeChild(copyElement);
  var toast = $("#snackbar").addClass("show");
  setTimeout(function () {
    toast.removeClass("show");
  }, 2000);
}
