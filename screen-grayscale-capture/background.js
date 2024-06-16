chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'capture_screen') {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (screenshotUrl) => {
        chrome.runtime.sendMessage({ type: 'screenshot_taken', screenshotData: screenshotUrl });
      });
    }
  });
  