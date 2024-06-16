document.getElementById('screenshot-button').addEventListener('click', async () => {
    chrome.runtime.sendMessage({ type: 'capture_screen' });
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'screenshot_taken') {
      const canvas = document.getElementById('screenshot-canvas');
      const context = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        convertToGrayscale(canvas);
        document.getElementById('download-button').style.display = 'block';
      };
      image.src = message.screenshotData;
    }
  });
  
  document.getElementById('download-button').addEventListener('click', () => {
    const canvas = document.getElementById('screenshot-canvas');
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = canvas.toDataURL();
    link.click();
  });
  
  function convertToGrayscale(canvas) {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;       // Red
      data[i + 1] = avg;   // Green
      data[i + 2] = avg;   // Blue
    }
    context.putImageData(imageData, 0, 0);
  }
  