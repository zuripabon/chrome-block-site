import { browser } from "webextension-polyfill-ts"
import { IWebsite } from './websites';

const blockRequestHandler = () => {
	return {cancel: true};
}
 
const inject = (urls:IWebsite[]) =>  {
  if(browser.webRequest.onBeforeRequest.hasListener(blockRequestHandler)){
    browser.webRequest.onBeforeRequest.removeListener(blockRequestHandler);
  }

  browser.webRequest.onBeforeRequest.addListener(
    blockRequestHandler, 
    {
      urls: urls.map(({host, domain}) => `*://*.${host}.${domain || "com"}/*`)
    }, 
    ['blocking']
  );

}

export default inject;