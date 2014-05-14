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
$gender = $_POST["gender"];

include 'connect.php';

//Insert variables into database
mysql_query("INSERT INTO demographics (vpnumber, birthday, education, student, studyfield, country, mothertongue, germanyears, diagnostik, gender) 
VALUES ('$vpnumber','$birthday', '$education', '$student', '$studyfield', '$country', '$mothertongue', '$germanyears', '$diagnostik', '$gender');");
echo mysql_insert_id();
//Disconnect
mysql_close($con);
?>

