define([], function() {
  var App = function() {

  };

  App.prototype = {

  	version: '0.1',

  	menu: null,
  	extensionId: chrome.runtime.id,

  	menuContex: ["page","selection","link","editable","image","video","audio"],
  	menuTitle: 'Обработать...',

  	init: function(){
  		this.menu = chrome.contextMenus.create({id: '123', title: this.menuTitle, contexts: this.menuContext});
  		chrome.contextMenus.onClicked.addListener(this.contextItemClick);
  		return this;
  	},


  	contextItemClick: function(info, tab){
  		console.log('cliced context meenu');
  		//chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, function(e){console.log(e);});
  	},

  	render: function(){
  		console.log($);
  	}


  };

  return App;
});