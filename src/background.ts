import queryString from 'query-string';

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const query = queryString.parse(details.url.split('?')[1]);
    if (query.route_url === '/') {
      chrome.windows.getCurrent((window_) => {
        chrome.tabs.query({ active: true, windowId: window_.id }, (tabs) => {
          const [tab] = tabs;
          if (tab === undefined || tab.id === undefined) {
            return;
          }
          console.log(tab.id);
          chrome.tabs.executeScript(tab.id, {
            code: "window.location.href = 'https://facebook.com/?sk=h_chr'",
          });
        });
      });
    }
  },
  {
    urls: ['https://*.facebook.com/ajax/navigation/*'],
    types: ['xmlhttprequest'],
  },
);
