let dataUsage = {
    download: 0,
    upload: 0
  };
  
  // Monitor network activity
  chrome.webRequest.onCompleted.addListener(
    (details) => {
      const contentLengthHeader = details.responseHeaders?.find(header => header.name.toLowerCase() === 'content-length');
      const contentLength = contentLengthHeader ? parseInt(contentLengthHeader.value, 10) : 0;
  
      if (!isNaN(contentLength)) {
        // Increment download data usage (MB)
        dataUsage.download += contentLength / (1024 * 1024); // Convert bytes to MB
      }
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
  );
  
  // Respond to messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getUsage") {
      sendResponse(dataUsage);
    }
  });
  
  // Optional: Log data usage for debugging
  console.log('Current Data Usage:', dataUsage);
  