'use strict';

console.log('Start');

let createProperties = {id: 123, title:'pfujkjdjr'};

let menu = chrome.contextMenus.create(createProperties, ()=>{console.log('createContextMenu')});

console.log(chrome.runtime.lastError);

console.log('END');

