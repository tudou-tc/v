<?php
//ajax/index
header("Content-Type: text/html;charset=utf-8");
function getSSLPage($url) {
    $ch = curl_init();
	//curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	//curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1");
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSLVERSION,30); 
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
	//return $url;
}

function getcode0($durl){
  $ch = curl_init();
  $_USERAGENT_ = $_SERVER["HTTP_USER_AGENT"];
 // echo "<script>alert(".$_USERAGENT_.");</script>";
  curl_setopt($ch,CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0');
  curl_setopt($ch, CURLOPT_URL, $durl);
  curl_setopt($ch, CURLOPT_HEADER, 1);
  curl_setopt($ch, CURLOPT_TIMEOUT, 5);
  curl_setopt($ch, CURLOPT_USERAGENT, $_USERAGENT_);
 // curl_setopt($ch, CURLOPT_REFERER,_REFERER_);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);
	curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
	//curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  $r = curl_exec($ch);
  curl_close($ch);
   return $r;
}

function getcode($url){
	$code = fopen($url, 'r');
	if($code){
		while(!feof($code)) {
			echo fgets($code);
		}
	}
	return $code;
}

function getcode2($url){
	$code= file_get_contents($url);
	return $code;
}
//echo $url."\n";
$www=$_GET['v'];
//$cd = getSSLPage($www);
$cd=getcode2($www);
echo $cd;
?>