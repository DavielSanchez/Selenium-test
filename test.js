const { Builder, By, Key, until } = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');

async function runTest() {
    const driver = new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://orbi.edu.do/orbi/');

        let Counter = 0;
        const Photo = async() => {
            await driver.takeScreenshot().then(
                function(image, err) {
                    Counter = Counter + 1
                    require('fs').writeFileSync(`./ScreenShots/Step${Counter}.png`, image, 'base64');
                }
            );
        }

        ///// Iniciar session

        let Email = await driver.findElement(By.id('txtNombreUsuario'));
        await Email.sendKeys('Davielalexsanchez@gmail.com');

        let Password = await driver.findElement(By.id('txtContrasena'));
        await Password.sendKeys('Daviel01');

        let IniciarSession = await driver.findElement(By.id('btnSesion'));
        Photo()
        await IniciarSession.click()
        console.log('session iniciada')


        ///// Saltar el calendario

        let Bajar = await driver.wait(until.elementLocated(By.id('bajar')));
        await Bajar.click()

        let Next = await driver.wait(until.elementLocated(By.css("a[class='btn btn-block btn-lg btn-primary']")))
        Photo()
        await driver.executeScript("arguments[0].click();", Next);
        console.log('Calendario Saltado')

        ///// Cambiar el rol a Estudiante

        let Select = await driver.wait(elementLocated(By.id('drpduRolUsuario')));
        await Select.click()
        Photo()
        console.log('Cambiando Rol')

        let Role = await driver.wait(until.elementLocated(By.css("#drpduRolUsuario > option:nth-child(2)")))
        await Role.click()
        Photo()
        console.log('Rol Cambiado')

        let Bajar2 = await driver.wait(until.elementLocated(By.id('bajar')));
        await Bajar2.click()

        let Next2 = await driver.wait(until.elementLocated(By.css("a[class='btn btn-block btn-lg btn-primary']")))
        Photo()
        await driver.executeScript("arguments[0].click();", Next2);
        console.log('Calendario Saltado Otra vez')

        // ///// Abrir menu y entrar al area de caja

        let Menu = await driver.wait(until.elementLocated(By.css('a[href="#"]')));
        await driver.executeScript("arguments[0].click();", Menu);
        Photo()
        console.log('Menu Abierto')

        let Caja = await driver.wait(elementLocated(By.css('#mCaja > ul > li > a')))
        await driver.executeScript("arguments[0].click();", Caja);
        Photo()
        console.log('Caja')

        /////

        // ///// Abrir menu y entrar al area de Docencia

        let Menu2 = await driver.wait(until.elementLocated(By.css('a[href="#"]')));
        await driver.executeScript("arguments[0].click();", Menu2);
        Photo()
        console.log('Menu2 Abierto')

        let Docencia = await driver.wait(elementLocated(By.css('#mGestiónDocencia > ul > li > a')))
        await driver.executeScript("arguments[0].click();", Docencia);
        Photo()
        console.log('Docencia')

        /////

        // ///// Exportar mis calificaciones

        let Calificaciones = await driver.wait(until.elementLocated(By.css('#div-contenido > div.div-funcion > a:nth-child(7)')));
        await driver.executeScript("arguments[0].click();", Calificaciones);
        Photo()
        console.log('Calificaciones')

        /////






        /////
        let pageTitle = await driver.getTitle();
        console.log('Prueba superada');

    } finally {
        await driver.quit();
    }
}

runTest();