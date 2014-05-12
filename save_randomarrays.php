<?php
//Receive variables from JavaScript
$vpnumber = $_POST["vpnumber"];
$array = $_POST["randomarray"];

include 'connect.php';

//Insert variables into database
mysql_query("INSERT INTO randomarrays (vpnumber, array) 
VALUES ('$vpnumber', '$array');");

//Disconnect
mysql_close($con);

?>
