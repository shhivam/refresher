  // chrome.runtime.onInstalled.addListener(function() {
  //   chrome.storage.sync.set({color: '#3aa757'}, function() {
  //     console.log('The color is green.');
  //   });
  //   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //     chrome.declarativeContent.onPageChanged.addRules([{
  //       conditions: [new chrome.declarativeContent.PageStateMatcher({
  //         pageUrl: {hostEquals: 'developer.chrome.com'},
  //       })
  //       ],
  //           actions: [new chrome.declarativeContent.ShowPageAction()]
  //     }]);
  //   });
  // });


setInterval(handleRefresh, 15000)

function handleRefresh(){
	console.log("inside handleRefresh")
	chrome.storage.sync.get("refreshTabId", function(data) {
		if(!!data && !!data.refreshTabId){
			console.log("going to refresh", data.refreshTabId);
			chrome.tabs.reload(parseInt(data.refreshTabId));
		}
	});
}

chrome.tabs.onRemoved.addListener(function(tabId, removed) {
 	console.log("tab closed id:", tabId, removed);
 	chrome.storage.sync.get("refreshTabId", function(data) {
  		if(parseInt(data.refreshTabId) === tabId) {
  		  	chrome.storage.sync.remove("refreshTabId");
  			console.log("removed from local sync tabId", data.refreshTabId);
  		}
  	})
})