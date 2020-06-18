chrome.tabs.query({}, function(tabs) {
let tabsList = document.getElementById('tabsList');
	console.log("all tabs of the window", tabs);
	chrome.storage.sync.get("refreshTabId", function(data) {
		console.log("my refreshTabId", data.refreshTabId)
		tabs.forEach(function(tab) {
			let tempInput = document.createElement('input');
			tempInput.setAttribute("type", "radio");
			tempInput.setAttribute("name", "tab");
			tempInput.setAttribute("id", tab.id);
			if(parseInt(data.refreshTabId) === tab.id)
				tempInput.checked = true; 
			tempInput.onclick = setRefreshTabId;
			let tempLabel = document.createElement('label');
			tempLabel.setAttribute("for", tab.id);
			tempLabel.innerText = tab.title;
			tabsList.appendChild(tempInput);
			tabsList.appendChild(tempLabel);
			tabsList.appendChild(document.createElement('br'))
		});
	})
})

function setRefreshTabId(event) {
	chrome.storage.sync.set({"refreshTabId": event.target.id}, function() {
		console.log("successfully set the id in:::", event.target.id);
	});
}