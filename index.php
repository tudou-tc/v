<?php
//$url="https://v.qq.com/detail/x/xpu952oo5tr9yzl.html";  
$ww="404.html";
$www1="https://vip.bljiex.com/?v=";
$www2="https://www.cuan.la/?url=";
$www3="http://vip.jaoyun.com/?url=";
$www4="http://bofang.online/?url=";
$www5="https://www.xmaocloud.com/yuan/?url=";
$www6="https://www.seeso.cc/vip/m3u8.php?url=";
echo "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/><title>万能视频解析</title>\n";
echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">";
echo "\n</head>\n";
echo "<body>\n<p align=center>万能视频解析: <input id=\"url\" type=\"url\" /> <button onclick=\"check()\">解析</button></p>\n";
echo "<p align=center>选择解析接口:  <select align=center id=\"select1\" size=1 onchange=\"change()\">
<option value=\"".$www1."\">第一接口</option>
<option value=\"".$www2."\">第二接口</option>
<option value=\"".$www3."\">简傲云解析</option>
<option value=\"".$www4."\">第四接口</option>
<option value=\"".$www5."\">第五接口</option>
<option value=\"".$www6."\">第六接口</option>
</select></p>\n";
echo "<div align=center><iframe id=\"frame1\" name=\"frame1\" src=\"".$ww."\" width=\"900\" height=\"600\" allowfullscreen=\"true\"></iframe></div><p></p>\n";
//$fh=substr($fh,
echo "<div name=\"div_list\" class=\"div_list\" id=\"div_list\"></div>\n";
//获取列表结束，列表代码 $cd
echo "<div align=center><div style=\"text-align:center;width:900px;height: auto; word-wrap:break-word; word-break:keep-all;\">";
//echo $cd;
echo "</div></div>\n";
//<script> 脚本开始
echo "<script src=\"./function2.js\" type=\"text/javascript\">\n";
echo "</script>\n";
echo "<script>\n";
echo "function check5(){
	alert(\"check\");
    var inurl = document.getElementById(\"url\");
    var value = inurl.value;
    value = Trim(value);
    var srcurl = inurl.value;
    if (inurl.value == \"\") {
        //		alert(\"地址不能为空！\");
        return false;
    }
}\n";
echo "\n</script>\n";
//</script>脚本结束
echo "</body></html>";
?>