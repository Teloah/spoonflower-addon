const navigationListener = ({ tabId, ...details }) => {
  if (/https:\/\/.*\.spoonflower.com\//.test(details.url)) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["scripts/content.js"],
    });
  }
};

chrome.webNavigation.onCompleted.addListener(navigationListener);
chrome.webNavigation.onHistoryStateUpdated.addListener(navigationListener);

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/content.js"],
  });
});
