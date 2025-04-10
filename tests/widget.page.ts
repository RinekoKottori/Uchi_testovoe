import {Page, expect, list} from "@playwright/test";


const WidgetPageSelectors = {
    WRAPPER: '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY: '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT: 'header h5',
    BUTTON_OPEN: '[data-test=openWidget]',
    BUTTON_WRITE_TO_US: '[class^=btnText__fCHf9]',
    ARTICLE_POPULAR_TITLE: '[class^=popularTitle__8Pi-v]',
    ARTICLE_POPULAR_LIST: '[class^=popularTitle__8Pi-v] + ul[class^=articles__dgKpa]',
    ARTICLE_POPULAR_LIST_ITEM: '[class^=popularTitle__8Pi-v] + ul[class^=articles__dgKpa] > li.article__6zuSl',

    BUTTON_CLOSE: '[class^=closeBtn__UZ4Ws]',
    HELP_MENU: ' div:nth-child(19)'
} as const

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    async getPopularArticles() {
        const list = this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
        await expect(list).toHaveCount(5, {timeout: 10000});
        return list.all();
    }

    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }

    clickButtonClose() {
        return this.page.locator(WidgetPage.selector.BUTTON_CLOSE).click();
    }

   async getClassHelper(){
       const locator = this.page.locator(WidgetPage.selector.HELP_MENU);
       const classList = await locator.getAttribute('class');
       expect(classList).toBeNull();
   }

}

