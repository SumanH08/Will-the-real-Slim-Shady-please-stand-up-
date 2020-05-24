let settingsButton = document.getElementById("settings");

settingsButton.onclick = function (element) {
  chrome.tabs.create({ url: "settings.html" });
};

let startButton = document.getElementById("start");
startButton.onclick = function (element) {
  let color = element.target.value;
  chrome.storage.local.get({ default_time: "120" }, function (result) {
    startButton.innerText = result.default_time;
  });
  chrome.tabs.executeScript({
    file: "insert.js",
  });
  chrome.tabs.insertCSS({ file: "style.css" });
  window.close();
};
