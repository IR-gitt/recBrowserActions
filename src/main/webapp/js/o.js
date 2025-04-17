const newWindow = window.open("https://example.com", "_blank");
document.addEventListener('click', function(event) {
    let element = event.target;
    let xpath = getElementXPath(element);
    console.log(xpath);
});

function getElementXPath(element) {
    if (element.id !== '') {
        return 'id("' + element.id + '")';
    }

    let path = [];
    while (element.nodeType === Node.ELEMENT_NODE) {
        let index = 1;
        let sibling = element.previousSibling;
        while (sibling) {
            if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === element.tagName) {
                index++;
            }
            sibling = sibling.previousSibling;
        }
        let tagName = element.tagName.toLowerCase();
        path.unshift(tagName + '[' + index + ']');
        element = element.parentNode;
    }
    return '/' + path.join('/');
}