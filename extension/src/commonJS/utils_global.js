i18next
  .init({
    lng: "en",
    debug: true,
    resources: {
      en: {
        translation: {
          top_stores: "Top Stores",
          top_offers: "Top Offers",
          store_details: "Store Details",
          my_account: "My Account",
          refer_n_earn: "Refer & Earn",
          hello_from_google_popup: "Hello from Google popup",
        },
      },
      hi: {
        translation: {
          top_stores: "Top Stores",
          top_offers: "Top Offers",
          store_details: "Store Details",
          my_account: "My Account",
          refer_n_earn: "Refer & Earn",
        },
      },
    },
  })
  .then(function (t) {
    console.log(i18next.t("shop_now"));
    // initialized and ready to go!
    // document.getElementById("output").innerHTML = i18next.t("key");
  });

function set_user_lang() {
  chrome.storage.local.get(["extension_web_lang"], function (result) {
    if (result.extension_web_lang) {
      i18next.changeLanguage(result.extension_web_lang, (err, t) => {
        if (err) console.log("err", err);
        console.log("lang changed :", result.extension_web_lang, t("shop_now"));
      });
    }
  });
}

function render_template(input_data, template_name) {
  return new Promise(function (resolve, reject) {
    let opts = {
      method: "GET",
      headers: {
        mimeType: "text/plain; charset=x-user-defined",
        dataType: "text",
      },
    };
    fetch(
      chrome.runtime.getURL("src/partials/" + template_name + ".html"),
      opts
    )
      .then((response) => response.text())
      .then(function (template) {
        let html = Mustache.render(template, {
          ...input_data,
          translate,
          get_image_url,
        });
        resolve(html);
      });
  });
}

function translate() {
  return function (text, render) {
    return render(i18next.t(text));
  };
}

function get_image_url() {
  return function (text, render) {
    return render(config[text]);
  };
}

function get_constructed_cashback_string(rate_type, amount_type, current_cb) {
  let returnText = "";
  let amount = "";
  if (!current_cb) {
    return "";
  }
  if (amount_type === "percent") {
    amount = current_cb + "%";
  } else {
    amount = config.currency + current_cb;
  }
  if (rate_type === "upto") {
    returnText = "Up to " + amount;
  } else {
    returnText = amount + " Cashback";
  }
  return returnText;
}

function get_constructed_cashback(amount_type, current_cb) {
  // let returnText = "";
  let amount = "";
  if (!current_cb) {
    return "";
  }
  if (amount_type === "percent") {
    amount = current_cb + "%";
  } else {
    amount = config.currency + current_cb;
  }
  // if (rate_type === "upto") {
  //   returnText = amount;
  // } else {
  //   returnText = amount;
  // }
  return amount;
}
