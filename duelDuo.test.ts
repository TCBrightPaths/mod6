
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('Draw button displays choices div', async () => {
    const choices = await driver.findElement(By.id('choices')).click()
    const displayed = await choices.isDisplayed()
    expect(displayed).toBe(true)
})

test('Add to Duo button displays div with id=player id', async () => {
    const playerID = await driver.findElement(By.id('player-id')).click()
    const displayed = await playerID.isDisplayed()
    expect(displayed).toBe(true)
})