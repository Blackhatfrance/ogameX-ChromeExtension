function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
	//console.log(html)
	url = document.URL
	//alert(url)
    if (location.search.includes("&y=")) {
        const req = new XMLHttpRequest();
        const baseUrl = "https://ogamexdatabase.herokuapp.com/galaxy" + location.search;
        //alert(baseUrl)
        var data = new URLSearchParams();
        data.append('galaxy', html);
        req.open("POST", baseUrl, true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(data);
        return html;
    }
    if (url.includes("messages")) {
    	fetch('https://luna.ogamex.net/messages/messagedata?MessageCategoryType=FLEET_ESPIONAGE&page=1')
        .then(res => res.text())
        .then(function (res) {
        const req = new XMLHttpRequest();
        const baseUrl = "https://ogamexdatabase.herokuapp.com/msg";
        var data = new URLSearchParams();
        //alert(res)
        data.append('msg', res);
        req.open("POST", baseUrl, true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(data);
      }).catch(err => console.error(err));
        return "html";
    }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});