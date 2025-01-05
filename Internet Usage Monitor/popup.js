document.addEventListener("DOMContentLoaded", () => {
  const downloadElement = document.getElementById("download");
  const uploadElement = document.getElementById("upload");
  const downloadRateElement = document.getElementById("download-rate");
  const uploadRateElement = document.getElementById("upload-rate");

  let lastDownload = 0;
  let lastUpload = 0;
  let totalDownload;
  let totalUpload;
  let currentDownloadRate;
  let currentUploadRate;

  function updateUsage() {
    chrome.runtime.sendMessage({ type: "getUsage" }, (response) => {
      if (response) {
        totalDownload = response.download.toFixed(2);
        totalUpload = response.upload.toFixed(2);

        currentDownloadRate = (response.download - lastDownload).toFixed(2);
        currentUploadRate = (response.upload - lastUpload).toFixed(2);

        // Update last totals for the next rate calculation
        lastDownload = response.download;
        lastUpload = response.upload;

        // Save the latest values to storage
        chrome.storage.local.set({
          lastDownload: lastDownload,
          lastUpload: lastUpload,
        });

        // Update UI with totals and rates
        downloadElement.textContent = `${totalDownload} MB`;
        uploadElement.textContent = `${totalUpload} MB`;
        downloadRateElement.textContent = `${currentDownloadRate} MB/s`;
        uploadRateElement.textContent = `${currentUploadRate} MB/s`;
      }
    });
  }

  // Load last saved values from storage
  chrome.storage.local.get(["lastDownload", "lastUpload"], (data) => {
    totalDownload = data.lastDownload || 0;
    totalUpload = data.lastUpload || 0;
  });

  setInterval(updateUsage, 1000); // Update every second
});
