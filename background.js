chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "linqr:toggle"})
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action !== "linqr:updateIcon") return;

  chrome.browserAction.setIcon({
    path: message.value
      ? { "48": "icons/enabled.svg" }
      : { "48": "icons/disabled.svg" },
    tabId: sender.tab.id,
  });
})