<?php
//Receive userData from JavaScript
$vpnumber = $_POST["vpnumber"];
$birthday = $_POST["birthday"];
$education = $_POST["education"];
$student = $_POST["student"];
$studyfield = $_POST["studyfield"];
$country = $_POST["country"];
$mothertongue = $_POST["mothertongue"];
$germanyears = $_POST["germanyears"];
$diagnostik = $_POST["diagnostik"];

include 'connect.php';

//Insert variables into database
mysql_query("INSERT INTO demographic (vpnumber, birthday, education, student, studyfield, country, mothertongue, germanyears, diagnostik) 
VALUES ('$vpnumber','$birthday', '$education', '$student', '$studyfield', '$country', '$mothertongue', '$germanyears', '$diagnostik');");
echo mysql_insert_id();
//Disconnect
mysql_close($con);
?>

