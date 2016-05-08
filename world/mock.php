<?php
$r=array();
for($i=0;$i<20;$i++){
    $r[] = array(
        'lat' => rand(-180,180),
        'lng' => rand(-180,180)
    );
}
echo json_encode($r);
exit();