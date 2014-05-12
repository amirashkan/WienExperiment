<?php
//Receive variables from JavaScript
$vpnumber = $_POST["vpnumber"];
$trial = $_POST["trial"];
$stagetime = $_POST["stagetime"];
$stagename = $_POST["stagename"];
$rt = $_POST["rt"];
$missedanagrams = $_POST["missedanagrams"];
$manipulation = $_POST["manipulation"];
$choosencategory = $_POST["choosencategory"];
$choosentreatment = $_POST["choosentreatment"];
$p1 = $_POST["p1"];
$p2 = $_POST["p2"];

include 'connect.php';

//Insert variables into database
mysql_query("INSERT INTO responses (vpnumber, trial, stagetime, stagename, rt, missedanagrams, manipulation, choosencategory, choosentreatment, p1, p2) 
VALUES ('$vpnumber', '$trial', '$stagetime', '$stagename', '$rt', '$missedanagrams','$manipulation','$choosencategory','$choosentreatment','$p1','$p2');");

//Disconnect
mysql_close($con);

?>
