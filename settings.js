// all elements
var defaultTimeInput = document.getElementById("default_time");
var nameInput = document.getElementById("name");
var addButton = document.getElementById("add");
var nameList = document.getElementById("name_list");
var saveButton = document.getElementById("save");
var standupTime = document.getElementById("standup_time");

var localMembers = [];
var isDirty = false;

// event handlers

defaultTimeInput.onchange = function () {
  updateStandupTime();
  isDirty = true;
};

addButton.onclick = function (element) {
  var name = nameInput.value.trim();
  if (name === "") {
    return null;
  }
  localMembers.push({ name: name });
  renderMembers();
  nameInput.value = "";
  isDirty = true;
  updateSaveButton();
};

saveButton.onclick = function (element) {
  var time = defaultTimeInput.value;
  chrome.storage.local.set(
    { default_time: time, members: localMembers },
    function () {
      isDirty = false;
      updateSaveButton();
    }
  );
};

// definitions
function loadSavedTime() {
  chrome.storage.local.get({ default_time: "120" }, function (result) {
    defaultTimeInput.value = result.default_time;
  });
}

function loadMembers() {
  chrome.storage.local.get({ members: [] }, function (result) {
    localMembers = result.members;
    renderMembers();
  });
}

function removeMember(member) {
  localMembers = localMembers.filter((localMember) => {
    return localMember.name !== member.name;
  });
  renderMembers();
  isDirty = true;
  updateSaveButton();
}

function renderMembers() {
  nameList.innerHTML = "";
  localMembers.forEach((member) => {
    var listElem = document.createElement("li");
    listElem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    var closeButton = document.createElement("span");
    closeButton.innerText = "×";
    closeButton.className = "remove";
    closeButton.onclick = () => removeMember(member);

    listElem.innerText = member.name;
    listElem.append(closeButton);
    nameList.append(listElem);
  });
  updateStandupTime();
}

function updateStandupTime() {
  var time = localMembers.length * defaultTimeInput.value || 0;
  var minutes = Math.ceil(time / 60);
  standupTime.innerText = minutes;
}

function updateSaveButton() {
  if (isDirty) {
    saveButton.innerText = "Save";
    saveButton.disabled = false;
    saveButton.className = "btn btn-primary";
  } else {
    saveButton.innerText = "✓ Saved";
    saveButton.disabled = true;
    saveButton.className = "btn btn-secondary";
  }
}

loadSavedTime();
loadMembers();
updateSaveButton();
