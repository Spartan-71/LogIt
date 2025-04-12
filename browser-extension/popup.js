const input = document.getElementById("taskInput");
const saveBtn = document.getElementById("saveBtn");
const logList = document.getElementById("logList");

saveBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    browser.storage.local.get("logs").then((data) => {
      const logs = data.logs || [];
      logs.push({ text, time: new Date().toLocaleTimeString() });
      browser.storage.local.set({ logs }).then(() => {
        renderLogs(logs);
        input.value = "";
      });
    });
  }
});

function renderLogs(logs) {
    logList.innerHTML = "";
    logs.slice().reverse().forEach((log) => {
      const li = document.createElement("li");
      
      const taskText = document.createElement("span");
      taskText.textContent = log.text;
  
      const timeStamp = document.createElement("span");
      timeStamp.className = "time";
      timeStamp.textContent = log.time;
  
      li.appendChild(taskText);
      li.appendChild(timeStamp);
  
      logList.appendChild(li);
    });
  }
  

browser.storage.local.get("logs").then((data) => {
  renderLogs(data.logs || []);
});
