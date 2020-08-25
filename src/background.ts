import queryString from 'query-string';

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const query = queryString.parse(details.url.split('?')[1]);
    if (query.route_url === '/') {
      chrome.windows.getCurrent((window_) => {
        chrome.tabs.query({ active: true, windowId: window_.id }, (tabs) => {
          const [tab] = tabs;
          chrome.tabs.executeScript(
            {
              code: `window.history.replaceState(null, '${
                tab.title ?? 'Facebook'
              }', '/?sk=h_chr');`,
            },
            () => {
              chrome.tabs.executeScript({ code: 'location.reload();' });
            },
          );
        });
      });
      return { cancel: true };
    }
  },
  {
    urls: ['https://*.facebook.com/ajax/navigation/*'],
    types: ['xmlhttprequest'],
  },
  ['blocking'],
);
