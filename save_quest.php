<?php
//Receive variables from JavaScript
$vpnumber = $_POST["vpnumber"];
$quest = $_POST["quest"];
$q1 = $_POST["q1"];
$q2 = $_POST["q2"];
$q3 = $_POST["q3"];
$q4 = $_POST["q4"];
$q5 = $_POST["q5"];
$q6 = $_POST["q6"];
$q7 = $_POST["q7"];
$q8 = $_POST["q8"];

include 'connect.php';

//Insert variables into database
mysql_query("INSERT INTO questionnaires (vpnumber, questionnaire, q1, q2, q3, q4, q5, q6, q7, q8) 
VALUES ('$vpnumber', '$quest','$q1','$q2','$q3','$q4','$q5','$q6', '$q7','$q8');");

//Disconnect
mysql_close($con);

?>
