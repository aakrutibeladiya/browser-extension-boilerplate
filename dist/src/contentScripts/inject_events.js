if("complete"===document.readyState||"interactive"===document.readyState){let e=new RegExp(config.app_reg);new RegExp(config.app_out_url);if(e.test(window.location.href)){let e=document.getElementsByTagName("body")[0],t=document.createElement("script"),n=chrome.runtime.getURL("src/contentScripts/get_token.js");t.setAttribute("type","text/javascript"),t.setAttribute("src",n),e.appendChild(t),e.removeChild(t),setTimeout(()=>{let e=new CustomEvent("LBP_GET_WINDOW_DATA");window.dispatchEvent(e)},2e3)}}chrome.runtime.sendMessage({from:"inject_events",action:"CHECK_THIS_WEBPAGE_FOR_AVAILABLE_STORES",data:{referrer:document.referrer}}),window.addEventListener("message",function(e){if("LBP_SEND_USER"===e.data.action){const{payload:t}=e.data;let n={user_id:t.user_id,lang:t.lang};chrome.runtime.sendMessage({from:"inject_events",action:"GET_ROOT_TOKEN",data:n})}},!1),chrome.runtime.onMessage.addListener(function(e,t,n){"show_demo_popup"===e.action&&render_demo_popup(e.data)});