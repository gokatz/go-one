function doLog(...params) {
	console.log("go-one: ", ...params)
}

function runTillElementFoundOrTimeout(callback, matcher, { interval, timeout }) {
	const intervalRef = setInterval(() => {
		const element = matcher();
		if (element) {
			callback(element);
			clearInterval(intervalRef);
		}
	}, interval);
	
	setTimeout(() => {
		clearInterval(intervalRef);
	}, timeout)
}

function adsElementMatcher() {
	const mainModule = document.querySelector("#MainModule");
	const firstLevelContainer = mainModule.querySelector("div");
	const secondLevelContainer = firstLevelContainer.querySelector("div");
	const adsContainer = secondLevelContainer.querySelector(":scope > div:nth-child(4)");

	return adsContainer;
}

function removeAdsSection(element) {
	if(!element) {
		return;
	}

	doLog("Removing Outlook Ads...");
	element.parentElement.removeChild(element);
	doLog("Removed Outlook Ads!");
}

runTillElementFoundOrTimeout(removeAdsSection, adsElementMatcher, {
	interval: 10000, // 10 seconds
	timeout: 300000 // 5 minutes
})