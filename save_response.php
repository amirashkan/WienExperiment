<?php
//Receive variables from JavaScript
$vpnumber = $_POST["vpnumber"];
$trial = $_POST["trial"];
$rt = $_POST["rt"];
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
mysql_query("INSERT INTO user_data (vpnumber, trial, rt, ex0, ex1, ex2, ex3, ex4, ex5, ex6, ex7) 
VALUES ('$vpnumber', '$trial', '$rt', '$ex0','$ex1','$ex2','$ex3','$ex4','$ex5','$ex6', '$ex7');");

//Disconnect
mysql_close($con);

?>
