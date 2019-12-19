//跨域请求
function geturlcode(url)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
    // IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var text = xmlhttp.responseText;
			//var count = text.length;
			//document.getElementById("source").innerHTML=xmlhttp.responseText;
			//document.getElementById("source").innerHTML = count;
			return text;
		}
	}
	xmlhttp.open("GET","getlist.php?v="+url,true);
	xmlhttp.send();
}