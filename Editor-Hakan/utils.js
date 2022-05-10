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

function resetMemory() {
    if (window.confirm("Yerel Depolamada yeni kayededilenler silinecektir ve default haline getirilecektir?")) {
        localStorage.setItem('data', '[]');
        //updateHistoryOptions();
        window.location.reload();
    }
}


function getHistoryListMOCK() {
    return [
        {
            name: "sample-1",
            html: "<h1>Test1</h1><h2>Test2</h2><h3>Test3</h3>",
            css: "h1{color:red}"
        },
        {
            name: "history-1", html: "<div class=\"w3-container w3-flat-clouds\">\n" +
                "<h2>London</h2>\n" +
                "<p>London   over 9 million inhabitants.</p>" +
                "</div><input type='checkbox'> checkbox<hr><br>input:<input type='text' placeholder='test1'>", js: ""
        },
        {name: "history-2", js: "console.log('debug-1');alert(new Date())"}
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

function getDataWindows(selectorType = '') {
    let all = selector(".sub-window .content[name]") || [];
    if (selectorType) {
        var find;
        all.forEach(i => i.getAttribute('name') === selectorType ? (find = i) : null);
        return find;
    }
    return all;
}

function saveHistory() {
    let fileName = prompt("Please enter name:", "Sample-1");
    if (fileName == null || fileName == "") {
        fileName = "temp1" + '-' + timeStamp()
    }
    var result = {"name": fileName + ' ' + getDate()};
    getDataWindows().forEach(function (line1) {
        var attrName = line1.getAttribute('name');
        Object.assign(result, {[attrName]: line1.innerText});
    });
    var oldVal = getHistoryList();
    // get old value add new value
    oldVal.push(result);
    window.localStorage.setItem("data", JSON.stringify(oldVal));
    updateHistoryOptions(false);
}

function isDialogOpened() {
    return !!$("body .modal").length;
}

function modalOpen(title, text) {
    var btn = "<div onclick='$(this).parent().parent().parent().remove();' class='btn btn-sm btn-warning float-right'>X</div>";
    var title = "<div class='title'><div>" + title + "</div>" + btn + "</div>";
    var modal = "<div class='modal'><div class='modal-body'>" + title + "<h4>" + text + "</div></div>";
    $("body").append(modal);
}

























