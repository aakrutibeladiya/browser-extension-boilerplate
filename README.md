# Browser extension boilerplate

## features

- HTML template with moustache.js
- custom multi lang support(using i18n)
- simple and neat folder structure based on chrome browser extension eco system
- example for
  - chrome api use on background and content script files,
  - browser action popup,
  - inject script with popup injection on third party web page

## Holder structure

extension

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
4. \_locales => it is part of default localization but not in use
5. css => browser action popup CSS only
6. icon => extension icons

## How to change CSS for extension

- Extension works on 2 separate environment
- 1. browser_action popup
  - css is written in /css/main.css file
- 2. injected script or popup
  - all css is inline written in partials file

## How to change HTML for extension

- For sidebar/main popup skeleton /src/browser_action/browser_action.
- Check for the partial file in "/src/partials".

## How to update translations/locale

- All label strings are available at "commonJs/utils_global.js update string according to lang key.

## How to generate packaged/uglified code

- run "npm i" at root directory
- update gulpfile.js if you have changed folder names
- run "npm run gulp build"
