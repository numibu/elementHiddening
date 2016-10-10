'use strict';

console.log('Start');

var createProperties = { id: 123, title: 'pfujkjdjr' };

var menu = chrome.contextMenus.create(createProperties, function () {
  console.log('createContextMenu');
});

console.dir(chrome.runtime.lastError);

console.log('END');
