<?php
//Receive variables from JavaScript
$vpnumber = $_POST["vpnumber"];
$trial = $_POST["trial_number"];
$ex0 = $_POST["ex0"];
$ex1 = $_POST["ex1"];
$ex2 = $_POST["ex2"];
$ex3 = $_POST["ex3"];
$ex4 = $_POST["ex4"];
$ex5 = $_POST["ex5"];
$ex6 = $_POST["ex6"];
$ex7 = $_POST["ex7"];

include 'connect.php';

//Insert variables into database
mysql_query("INSERT INTO user_data (vpnumber, choosentreatment) 
VALUES ('$vpnumber', '$choosentreatment');");

//Disconnect
mysql_close($con);

?>
