<?php
ob_start();
header("Access-Control-Allow-Origin: *");
$pi = pathinfo($_GET['file']);
$filename = $pi['basename'];
$ext = $pi['extension'];
$dir = __DIR__.'/datos/'.$filename;
if(file_exists($dir)){
    header('Content-type: application/'.$ext);
    ob_end_clean();
    echo file_get_contents($dir);
}else{
    ob_end_clean();
    echo 'Error. No existe '.$filename;
}
exit();