function getSelector(el) {
  if (!el || el.nodeType !== 1) return null;

  const path = [];
  while (el.parentNode) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += '#' + el.id;
      path.unshift(selector);
      break;
    } else {
      let siblings = Array.from(el.parentNode.children).filter(e => e.nodeName === el.nodeName);
      if (siblings.length > 1) {
        const index = siblings.indexOf(el) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }
    path.unshift(selector);
    el = el.parentNode;
  }

  return path.join(' > ');
}

document.addEventListener('click', (event) => {
  chrome.runtime.sendMessage({ action: 'getRecordingState' }, (recording) => {
    if (!recording) return;

    const selector = getSelector(event.target);
    const data = {
      type: 'click',
      selector: selector,
      timestamp: Date.now()
    };
    chrome.runtime.sendMessage({ action: 'record', data });
  });
});
