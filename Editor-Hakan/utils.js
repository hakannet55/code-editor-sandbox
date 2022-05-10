var selector = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelectorAll(selector);
};

// target #targetName or .class
var fillTarget = function (targetQuery, html) {
    var target = selector(targetQuery);
    if (target && target.length) {
        target[0].innerHTML = html;
    }
}

function getHistoryListMOCK() {
    return [
        {
            name: "sample-1",
            html: "<h1>Test1</h1><h2>Test2</h2><h3>Test3</h3>",
            css: "h1{color:red}"
        }, {name: "history-1"},
        {name: "history-2"}
    ];
}

function getHistoryListCurrentAppHistory() {
    return [];
}

function setHistoryList(mock) {
    var data = mock ? getHistoryListMOCK() : getHistoryListCurrentAppHistory();
    var stringData = JSON.stringify(data);
    window.localStorage.setItem("data", stringData);
}

function getHistoryList() {
    var dataRaw = window.localStorage.getItem("data");
    try {
        dataRaw = JSON.parse(dataRaw);
    } catch (e) {
        alert(e);
    }
    return dataRaw || [];
}

function getDate() {
    var date = new Date();
    return date.getFullYear() + "-" + date.getDay() + "-" + date.getDate();
}

function timeStamp() {
    return [
        new Date().getDate(), new Date().getMinutes(), new Date().getMilliseconds()
    ].join('');
}

function getDataWindows() {
    return selector(".sub-window .content[name]") || [];
}

function saveHistory() {
    var result = {"name": "Test-1-" + getDate() + '-' + timeStamp()};
    getDataWindows().forEach(function (line1) {
        var attrName = line1.getAttribute('name');
        Object.assign(result, {[attrName]: line1.innerHTML});
    });
    var oldVal = getHistoryList();
    console.log(oldVal, result, oldVal.push(result));
    // get old value add new value
    oldVal.push(result);
    window.localStorage.setItem("data", JSON.stringify(oldVal));
}




























