document.addEventListener("DOMContentLoaded", () => {
    const clipboardList = document.getElementById("clipboard-list");
  
    function updateList() {
      chrome.runtime.sendMessage({ action: "getCopiedItems" }, (response) => {
        clipboardList.innerHTML = "";
        response.copiedItems.forEach((item, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
  
          const copyButton = document.createElement("button");
          copyButton.textContent = "Copy";
          copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(item).then(() => {
              chrome.runtime.sendMessage({ action: "removeItem", index }, () => {
                updateList();
              });
            });
          });
  
          listItem.appendChild(copyButton);
          clipboardList.appendChild(listItem);
        });
      });
    }
  
    updateList();
  });
  