const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Abrir la página de GitHub
        // await driver.get('https://github.com/login');
        await driver.get('https://www.wikipedia.org');

        // Realizar acciones y verificar resultados
        // Aquí puedes escribir tu código para realizar las acciones necesarias y verificar los resultados.

        /* // Logearse
        let EmailBox = await driver.findElements(By.name('login_field'));
        await EmailBox.sendKeys('selenium', Key.RETURN);
        await driver.wait(until.titleIs('Email · selenium · GitHub')) */

        // Por ejemplo, buscar un repositorio
        let searchBox = await driver.findElement(By.name('search'));
        await searchBox.sendKeys('Russia', Key.RETURN);

        let Tools = await driver.findElement(By.id('vector-page-tools-dropdown-checkbox'));
        await Tools.click()

        let changeLanguage = await driver.findElement(By.id('p-lang-btn-checkbox'));
        await changeLanguage.click()


        // let changeLanguage = await driver.findElement(By.id('p-lang-btn-checkbox'));
        // await changeLanguage.click()
        // let English = await driver.wait(until.elementIsVisible(By.css('[title="Título del elemento"]')));
        // await English.click()

        // Realizar aserciones
        let pageTitle = await driver.getTitle();
        console.log('Título de la página:', pageTitle);

        // Capturar una captura de pantalla
        await driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFileSync(`./ScreenShots/screenshot${Math.random()}.png`, image, 'base64');
            }
        );
    } finally {
        await driver.quit();
    }
}

runTest();