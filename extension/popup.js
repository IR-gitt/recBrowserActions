const toggleBtn = document.getElementById('toggleRecording');

function updateButtonState(recording) {
  toggleBtn.textContent = recording ? '⏸ Остановить запись' : '▶️ Начать запись';
}

chrome.runtime.sendMessage({ action: 'getRecordingState' }, (recording) => {
  updateButtonState(recording);
});

toggleBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'toggleRecording' }, (recording) => {
    updateButtonState(recording);
  });
});

document.getElementById('download').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'getRecords' }, (records) => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: 'user-actions.json'
    });
  });
});

document.getElementById('clear').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'clearRecords' });
  alert('Журнал очищен');
});

document.getElementById('send').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'getRecords' }, (records) => {
    fetch('http://localhost:8080/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(records)
    })
    .then(res => res.ok ? alert('Успешно отправлено') : alert('Ошибка при отправке'))
    .catch(err => alert('Ошибка сети: ' + err.message));
  });
});
