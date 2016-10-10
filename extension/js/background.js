'use strict';

var createProperties = { id: "123", title: 'контексное меню' };

var menu = chrome.contextMenus.create(createProperties, function () {
	alert(menu);
});
