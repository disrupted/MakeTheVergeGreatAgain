// ==UserScript==
// @name         color-coded comments for The Verge / Polygon
// @namespace    https://github.com/disrupted/MakeTheVergeGreatAgain
// @version      1.0
// @description  apply a color to all user comments which makes it easier to follow the discussions
// @updateURL    https://raw.githubusercontent.com/disrupted/MakeTheVergeGreatAgain/master/Color-Coded-Comments.user.js
// @downloadURL  https://raw.githubusercontent.com/disrupted/MakeTheVergeGreatAgain/master/Color-Coded-Comments.user.js
// @author       disrupted
// @include      *://www.theverge.com/*
// @include      *://www.polygon.com/*
// @require      https://git.io/vMmuf
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  GM_addStyle ("div.c-comments__header-author, div.c-comments__post-actions { opacity: 0.2; text-shadow: 0 0 5px #666; } span.c-comments__author a { color: #41464d; }");
  GM_addStyle ("div.c-comments__cbody, div.c-comments__header-author:hover, div.c-comments__post-actions:hover { opacity: 1; text-shadow: none; }");

  function colorComments (jNode) {
    console.log("[UserJS] color-coding comments section");
    var comments = document.getElementsByClassName("c-comments__comment");
    for (var i=0; i < comments.length; i++) {
      var depth = parseInt(comments[i].className.replace(/[^0-9\.]/g, ''), 10);
      if (/\d+$/.test(depth)) {
        switch (depth % 4) {
          case 1:
            comments[i].style.borderLeft = "3px solid #ff0000";
            break;
          case 2:
            comments[i].style.borderLeft = "3px solid #ffa900";
            break;
          case 3:
            comments[i].style.borderLeft = "3px solid #ffcb00";
            break;
          case 0:
            comments[i].style.borderLeft = "3px solid #fff800";
            break;
        }
      } else {
        comments[i].style.borderLeft = "3px solid #393092";
      }
    }
  }

  waitForKeyElements ("#comments div.c-comments__list .c-comments__comment", colorComments);
})();