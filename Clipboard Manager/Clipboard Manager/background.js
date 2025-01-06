let copiedItems = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addCopiedItem") {
    copiedItems.push(message.text);
    console.log("Added:", message.text); // Debugging
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Copied!",
      message: `"${message.text}" added to the clipboard manager!`,
    });
    sendResponse({ status: "success", copiedItems });
  } else if (message.action === "removeLastCopiedItem") {
    if (copiedItems.length > 0) {
      const removedItem = copiedItems.pop();
      console.log("Removed:", removedItem); // Debugging
    }
    sendResponse({ status: "success", copiedItems });
  } else if (message.action === "getCopiedItems") {
    sendResponse({ copiedItems });
  } else if (message.action === "removeItem") {
    copiedItems.splice(message.index, 1);
    sendResponse({ status: "success", copiedItems });
  }
});
