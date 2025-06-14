let records = [];
let recording = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'record':
      if (recording) {
        records.push(message.data);
      }
      break;

    case 'getRecords':
      sendResponse(records);
      break;

    case 'clearRecords':
      records = [];
      break;

    case 'toggleRecording':
      recording = !recording;
      sendResponse(recording);
      break;

    case 'getRecordingState':
      sendResponse(recording);
      break;
  }
});
