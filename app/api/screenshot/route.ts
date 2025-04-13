import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer-core"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Connect to Browserless
    const browser = await puppeteer.connect({
      browserWSEndpoint: "wss://chrome.browserless.io?token=S7fJaYl2KzueLn445f8cf618918b77a6316fe2916e",
    })

    const page = await browser.newPage()

    // Set viewport for screenshot
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    })

    // Navigate to the URL
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })

    // Take screenshot
    const screenshot = await page.screenshot({ encoding: "base64", fullPage: false })

    // Get page title
    const title = await page.title()

    // Get favicon
    let favicon = ""
    try {
      const faviconElement = await page.$('link[rel="icon"], link[rel="shortcut icon"]')
      if (faviconElement) {
        favicon = await page.evaluate((el) => el.href, faviconElement)
      } else {
        // Try to get favicon from the domain
        const domain = new URL(url).origin
        favicon = `${domain}/favicon.ico`
      }
    } catch (error) {
      console.error("Error getting favicon:", error)
    }

    await browser.close()

    return NextResponse.json({
      screenshot: `data:image/png;base64,${screenshot}`,
      title,
      favicon,
    })
  } catch (error) {
    console.error("Error taking screenshot:", error)
    return NextResponse.json({ error: "Failed to take screenshot" }, { status: 500 })
  }
}
