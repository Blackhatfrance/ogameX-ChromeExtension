try{
    chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
        if(changeInfo.status == 'complete'){
            chrome.scripting.executeScript({
                files: ['getPagesSource.js'],
                target: {tabId: tab.id}
            });
        }
    });
}catch(e){
    console.log(e);
}

try{
    chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
        if(changeInfo.status == 'complete'){
            chrome.scripting.executeScript({
                files: ['contentScript.js'],
                target: {tabId: tab.id}
            });
        }
    });
}catch(e){
    console.log(e);
}
