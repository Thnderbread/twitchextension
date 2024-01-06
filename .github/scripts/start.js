#!/usr/bin/env node

import path from 'node:path'
import url from 'node:url'
import fs from 'node:fs/promises'

import { remote } from 'webdriverio'

import pkg from '../../package.json' assert { type: 'json' }

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

/**
 * start WebDriver session with extension installed
 */
async function startBrowser(browserName) {
  const capabilities = browserName === 'chrome'
    ? {
      browserName,
      'goog:chromeOptions': {
        args: [
          `--load-extension=${path.join(__dirname, '..', '..', 'dist')}`,
          `--remote-debugging-port=9222`,
          '--remote-debugging-host=0.0.0.0'
        ]
      }
    }
    : { browserName }
  const browser = await remote({
    // logLevel: 'error',
    capabilities
  })

  if (browserName === 'firefox') {
    const extension = await fs.readFile(path.join(__dirname, '..', '..', `web-extension-firefox-v${pkg.version}.xpi`))
    await browser.installAddOn(extension.toString('base64'), true)
  }

  await browser.url('https://www.twitch.tv/videos/1983719883')
}

const browserName = process.argv.slice(2).pop() || 'chrome'
console.log(`Run web extension in ${browserName}...`)
await startBrowser(browserName)
