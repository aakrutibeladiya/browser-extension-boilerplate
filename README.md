## features

- html template with moustache.js
- custom multi lang support(using i18n)
- simple folder structure based on chrome browser extension eco system
- example for background action api use, browser action popup and inject script with popup injection on third party web page

## folder structure

1. lib => all external libraries (css + js)
2. resources ==> assets (images)
3. src ==> entire source code for extension
   1. bg ==> background js (this works on background )(contains js only)
   2. browser_action ==> browser action popup(contains js ==> for js code and html ==> for basic skeleton)
   3. commonJS ==> 1. apiService => common fetch api code 2. dataProvider ==> common data provider functions for inject + bg 3. utils_global ==> common utility functions (ex:translation, render_html)
   4. contentScripts ==> all inject script (files are divided based on its functionalities)
   5. partials ==> all html partials (containing google + popup + inject)
      ==> name prefix is given according to its type
   6. config.js ==> all config data

## how to change CSS for extension

- extension works on 2 separate environment
- 1. browser_action popup
  - css is written in /css/main.css file
- 2. injected script or popup
  - all css is inline written in partials file

## how to change HTML for extension

- for sidebar/main popup skeleton /src/browser_action/browser_action.
- check for the partial file in "/src/partials".

## how to update translations/locale

- all label strings are available at "commonJs/utils_global.js update string according to lang key
