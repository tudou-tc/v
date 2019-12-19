window.onload = function() {
    let surl = getCS('v');
    document.getElementById("url").value = surl;
    check();
}

function check(jiexi=1){
    var inurl = document.getElementById("url");
    var value = inurl.value;
    if (value == "") {
        alert("地址不能为空！");
        return false;
    }
    if (value.indexOf("open.iqiyi.com") > 0) {
        let iframe = document.getElementById('frame1');
        iframe.src = value;
        return true;
    }
    var api = getv(); //解析接口
    api = api + value;
    var frame = document.getElementById("frame1");
    frame.src = api;
	if(jiexi==1)
	{
		getlist(value); //解析列表
	}
    return true;
}

function getv() {
    var obj = document.getElementById("select1"); //定位id
    var index = obj.selectedIndex; // 选中索引
    var value = obj.options[index].value; // 选中值
    return value;
}

function getCS(CS) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == CS) {
            return pair[1];
        }
    }
    return "";
}

//AJAX  发送请求
function getlist(url) {
    url = url.replace(/https:/, "http:");
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            show(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", "getlist.php?v=" + url, true);
    xmlhttp.send();
}

function show(text) {
    var urlext = "";
    var ht = text;
    var title = cutstr(text, "<title>", "</title>");
    var code = "";
    if (text.indexOf("v.qq.com") > 0) {
        text = "腾讯视频";
        urlext = "qq";
        if (ht.indexOf("\"mod_episode\"") > 0) //选集 无ul
        {
            code = cutstr(ht, "\"mod_episode\"", "</div>", -24, 6);
        } else if (ht.indexOf("\"figure_list\"") > 0) // 有ul / 往期
        {
            code = cutstr(ht, "\"figure_list\"", "</ul>", -23, 5);
        } else if (ht.indexOf("columnname=选集") > 0) //其他类型选集 有ul
        {
            code = cutstr(ht, "columnname=选集", "</ul>", 0, 5);
            code = cutstr(ht, "<ul", "</ul>", -3, 5);
        } else {
            //其他未知类型
            code = "<div>腾讯未知类型，请通知技术采集更新</div>";
        }
        code = code.replace(/src=/g, "preimg");
        code = code.replace(/r-lazyload=/g, "src=");
    } else if (text.indexOf("youku.com") > 0) {
        text = "优酷视频";
        urlext = "youku";
        code = cutstr(ht, "drama-content", "</code>", -100, 7);
        code = cutstr(code, "<code", "</code>", -5, 7);
        if (code == "") {
            code = "<div>youku未知类型，请通知技术采集更新</div>";
        }
    } else if (text.indexOf("iqiyi.com") > 0) {
        text = "爱奇艺视频";
        urlext = "iqiyi";
        var vType = cutstr(ht, "irCategory", ">", 5, 1);
        vType = cutstr(vType, "\"", "\""); //电影 / 电视剧 / 综艺 / ...
        var vTitle = cutstr(ht, "irTitle", ">", 5, 1);
        vTitle = cutstr(vTitle, "\"", "\""); // 标题
        var vImg = cutstr(ht, "og:image", ">", 5, 1);
        vImg = cutstr(vImg, "\"", "\""); // img
        var vUrl = cutstr(ht, "og:url", ">", 5, 1);
        vUrl = cutstr(vUrl, "\"", "\""); // url
        switch (vType) {
        case "电影":
            code = cutstr(ht, "qy-play-list", "</ul>", -23, 5);
            break;
        case "电视剧":
            {
                var vlist = cutstr(ht, "i71-playpage-sdrama-list", ">");
                vlist = cutstr(vlist, "initialized-data='", "'");
                obj = JSON.parse(vlist);
                var count = Object.keys(obj).length;
                var codes = "";
                for (var i = 0; i < count; i++) {
                    
					if(obj[i].subtitle!=""){
						codes = codes + "<div><a href = \"javascript:void(0);\" onclick =\"playiqiyi(this)\" _url=\"http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid="+obj[i].vid+"&amp;tvId="+obj[i].tvId+"\">"+obj[i].order + " - " + obj[i].subtitle + "</a><div>";
					}
                }
                code = codes;
            }
            break;
        case "综艺":
            code = cutstr(ht, "qy-play-list", "</ul>", -23, 5);
            break;
        default:
            break;
        }
    } else {
        document.getElementById("div_list").innerHTML = "<div>列表解析失败</div>";
        return;
    }
    if (title == "") {
        title = text;
    }
    title = title.replace(/腾讯/, "万能解析");
    title = title.replace(/优酷/, "万能解析");
    title = title.replace(/爱奇艺/, "万能解析");

    document.title = title;
    if (code == "") {
        document.getElementById("div_list").innerHTML = "<div align=center>" + title + "</div><div>列表获取失败</div>";
    } else {
        code = changelink(code, urlext); //替换链接
        code = "<div align=center>" + title + "<div><p/>" + code;
        document.getElementById("div_list").innerHTML = code;
    }
}

function cutstr(text, start, end, istar = 0, iend = 0) {
    var s = text.indexOf(start);
    if (s > -1) {
        var text2 = text.substr(s + istar + start.length);
        var s2 = text2.indexOf(end);
        if (s2 > -1) {
            result = text2.substr(0, s2 + iend);
        } else result = "";
    } else result = "";
    return result;
}
function cutstr2(text, start, end, istar = 0, iend = 0) {
	let bds = "";	//正则表达式
    let reg = new RegExp(bds,'gi');
    return reg.exec(text);
}

function changelink(txt, urlext = "qq") {
    switch (urlext) {
    case "qq":
		txt = txt.replace(/href=\"\/x/g,"onclick=\"playqq(this)\" href=\"javascript:void(0);\" _url=\"http://v.qq.com/x");
        break;
    case "youku":
        txt = txt.replace(/\"\/\//g, "\"./?v=http://");
        txt = txt.replace(/_src/g, "src");
        break;
    case "iqiyi":
        break;
    default:
        break;
    }
    return txt;
}

function playiqiyi(obj){
	document.getElementById("url").value = obj.getAttribute("_url");
	check();
}

function playqq(obj){
	document.getElementById("url").value = obj.getAttribute("_url");
	check();
}

