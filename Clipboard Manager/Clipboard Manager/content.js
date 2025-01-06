// Listen for copy (Ctrl+C)
document.addEventListener("copy", () => {
    const text = document.getSelection().toString();
    if (text) {
      console.log("Copied text:", text); // Debugging
      chrome.runtime.sendMessage({ action: "addCopiedItem", text }, (response) => {
        console.log(response); // Debugging
      });
    }
  });
  
  // Listen for paste (Ctrl+V)
  document.addEventListener("paste", () => {
    console.log("Paste detected"); // Debugging
    chrome.runtime.sendMessage({ action: "removeLastCopiedItem" }, (response) => {
      console.log(response); // Debugging
    });
  });
  