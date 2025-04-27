const fs = require('fs');
const { Builder, By } = require('selenium-webdriver');

(async function replayClicks() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Переход на целевую страницу
        await driver.get('https://translate.google.com/');
        await sleep(5000);
        // Чтение сохранённых селекторов из файла
        const data = JSON.parse(fs.readFileSync('selectors.json', 'utf-8'));

        // Перебор каждого селектора и воспроизведение нажатий
        for (const item of data) {
            try {
                // Использование XPath или CSS Selector для поиска элементов
                let element;
                if (item.xpath) {
                    element = await driver.findElement(By.xpath(item.xpath));
                } else if (item.cssSelector) {
                    element = await driver.findElement(By.css(item.cssSelector));
                }

                if (element) {
                    await element.click(); // Выполнение клика по элементу
                    console.log(`Элемент найден и нажат: ${item.xpath || item.cssSelector}`);
                }else{
                console.log(`Элемент не найден и нажат: ${item.xpath || item.cssSelector}`);
                }
            } catch (error) {
                console.error(`Ошибка при обработке элемента: ${item.xpath || item.cssSelector}`, error);
            }
        }
    } catch (error) {
        console.error('Ошибка выполнения:', error);
    } finally {
        // Закрытие браузера
       // await driver.quit();
    }


})();

 function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }