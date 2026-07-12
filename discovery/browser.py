from playwright.sync_api import sync_playwright


class BrowserManager:

    def __init__(self):
        self.playwright = None
        self.browser = None


    def start(self):

        self.playwright = sync_playwright().start()

        self.browser = self.playwright.chromium.launch(
            headless=False
        )

        return self.browser.new_page(
            locale="en-GB"
        )


    def close(self):

        self.browser.close()
        self.playwright.stop()