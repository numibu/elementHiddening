'use strict';

let createProperties = {id: "123", title:'контексное меню'};

let menu = chrome.contextMenus.create(createProperties, ()=>{alert(menu)});

//chrome.contextMenus.onClicked.addListener(function callback)

chrome.contextMenus.onClicked.addListener((info, tab)=>{
	alert(info);
	alert(tab);
});



