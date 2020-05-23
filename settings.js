var defaultTimeInput = document.getElementById("default_time");
chrome.storage.sync.get({ default_time: "120" }, function (result) {
  defaultTimeInput.value = result.default_time;
});

var saveButton = document.getElementById("save");
saveButton.onclick = function (element) {
  var time = defaultTimeInput.value;
  chrome.storage.sync.set({ default_time: time }, function () {
    console.log("Saved", time);
  });
};
