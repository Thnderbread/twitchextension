import browser from "webextension-polyfill"
import { fetchVodData } from "./fetchVodData"
import type { GetDataMessage, ResponseCallback } from "../types"

async function handleContentScriptMessage(
  { vodID }: GetDataMessage,
  response: ResponseCallback,
): Promise<boolean | undefined> {
  if (typeof vodID !== "string") {
    response({ error: new TypeError("Invalid data received") })
    return true
  } else {
    const [error, segments] = await fetchVodData(vodID)

    if (error !== null) {
      response({ error: error.message })
      return true
    } else {
      response({ data: segments, error: null })
      return true
    }
  }
}

browser.runtime.onMessage.addListener(
  (
    msg: GetDataMessage,
    sender: browser.Runtime.MessageSender,
    response: ResponseCallback,
  ) => {
    if (msg.action === "getData") {
      void handleContentScriptMessage(msg, response)
      return true
    } else {
      console.warn(`Unsupported action received: ${JSON.stringify(msg)}`)
      return true
    }
  },
)
