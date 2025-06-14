 function getXPath(el) {
    if (el.id) {
      return `//*[@id="${el.id}"]`;
    } else if (el === document.body) {
      return '/html/body';
    }
    let ix = 0;
    const siblings = el.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling === el) {
        return getXPath(el.parentNode) + '/' + el.tagName.toLowerCase() + '[' + (ix + 1) + ']';
      }
      if (sibling.nodeType === 1 && sibling.tagName === el.tagName) {
        ix++;
      }
    }
  }

  function getCssSelector(el) {
    if (el.id) return `#${el.id}`;
    if (el.className) return el.tagName.toLowerCase() + '.' + el.className.trim().split(/\s+/).join('.');
    return el.tagName.toLowerCase();
  }

  document.addEventListener('click', function (event) {
    event.preventDefault();

    const xpath = getXPath(event.target);
    const cssSelector = getCssSelector(event.target);

    console.log('XPath:', xpath);
    console.log('CSS Selector:', cssSelector);
    alert('XPath: ' + xpath + '\nCSS Selector: ' + cssSelector);

    // Сохраняем в localStorage
    const collected = JSON.parse(localStorage.getItem('selectors') || '[]');
    collected.push({ xpath, cssSelector });
    localStorage.setItem('selectors', JSON.stringify(collected));

    // Переход по data-url
    if (event.target.dataset.url) {
      window.location.href = event.target.dataset.url;
    }
  });