const { Builder } = require('selenium-webdriver');
const fs = require('fs');

(async function captureSelectors() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Переход на целевую страницу
        await driver.get('https://translate.google.com/');

        // Массив для хранения селекторов
        const selectors = [];

        // Выполняем JavaScript-код для добавления обработчика кликов
        await driver.executeScript(`
            document.addEventListener('click', (event) => {
                event.preventDefault();

                function getXPath(el) {
                    if (el.id) {
                        return '//*[@id="' + el.id + '"]';
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
                    if (el.id) return '#' + el.id;
                    if (el.className) return el.tagName.toLowerCase() + '.' + el.className.split(' ').join('.');
                    return el.tagName.toLowerCase();
                }

                const xpath = getXPath(event.target);
                const cssSelector = getCssSelector(event.target);

                window.__selectors__ = window.__selectors__ || [];
                window.__selectors__.push({ xpath, cssSelector });

                console.log('XPath:', xpath);
                console.log('CSS Selector:', cssSelector);
                alert('XPath: ' + xpath + '\\nCSS Selector: ' + cssSelector);
            });
        `);

        console.log('Скрипт добавлен. Кликните по элементам на странице, чтобы собирать пути.');

        // Ждём нажатий и сохраняем результат
        setTimeout(async () => {
            const collectedSelectors = await driver.executeScript('return window.__selectors__ || []');

            // Записываем данные в файл
            fs.writeFileSync('selectors.json', JSON.stringify(collectedSelectors, null, 2));
            console.log('Селекторы сохранены в selectors.json:', collectedSelectors);
            await driver.quit();
        }, 30000);// Ожидание кликов в течение 30 секунд
    } catch (error) {
        console.error('Ошибка:', error);
    }
})();