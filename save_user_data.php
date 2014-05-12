<?php
//Receive variables from JavaScript
$vpnumber = $_POST["vpnumber"];
$choosentreatment = $_POST["choosentreatment"];

include 'connect.php';

//Insert variables into database
mysql_query("INSERT INTO user_data (vpnumber, choosentreatment) 
VALUES ('$vpnumber', '$choosentreatment');");

//Disconnect
mysql_close($con);

?>
