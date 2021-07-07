function render_demo_popup(data) {
  render_template(data, "inject_demo_popup").then(function (
    activate_cashback_html
  ) {
    $("body").append(activate_cashback_html);
  });
}
