import { chromium } from 'playwright'

const base = process.env.TIMEOUT_URL || 'http://127.0.0.1:5173/'
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(base)
await page.getByText('隐形收腹').waitFor()
await page.getByRole('link', { name: '开始' }).first().click()
await page.getByRole('button', { name: '开始' }).click()
await page.getByRole('button', { name: '跳过' }).click()
await page.goto(base + 'calendar')
await page.getByText('日历打卡').waitFor()
await browser.close()
console.log('verify ok')
