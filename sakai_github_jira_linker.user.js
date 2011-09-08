// ==UserScript==
// @name           Sakai Github Jira Linker
// @version        0.1
// @namespace      http://denbuzze.com/
// @description    Add links from github to the Sakai Jira instance
// @match          http://*.github.com/*
// @match          https://*.github.com/*
// @include        http://*github.com/*
// @include        https://*github.com/*
// ==/UserScript==
(function () {

  var SAKAIJIRA_URL = "https://jira.sakaiproject.org/browse/",
  // We don't want to use gi for regex since we want to make it case sensitive
    search_terms = /(SAKIII|KERN)-\d+/g,
    h = document.createElement('a'),
    s = [document.documentElement||document.body],
    i = 0,
    e, j, l, o, k;

  do {

    e = s[i];

    if (e.nodeType == 3) {

      search_terms.lastIndex = 0;
      l = search_terms.exec(e.nodeValue);
      if (l !== null) {
        k = l[0].length;
        if (search_terms.lastIndex > k) {
          e.splitText(search_terms.lastIndex - k);
          e = e.nextSibling;
        }
        if (e.nodeValue.length > k) {
          e.splitText(k);
          s[i++] = e.nextSibling;
        }
        o = h.cloneNode(true);
        // Create the actual link
        o.setAttribute("href", SAKAIJIRA_URL + l[0]);
        // Add text to the link
        o.appendChild(document.createTextNode(l[0]));
        e.parentNode.replaceChild(o, e);
      }

    } else {

      j = e.childNodes.length;
      while (j) s[i++] = e.childNodes.item(--j);

    }

  } while (i--);

})();