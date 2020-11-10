<?php
$host = "localhost";
$user= "root";
$pass = "cs3319";
$name = "aalmusawassign2db";
$connection = mysqli_connect($host, $user,$pass,$name);
if (mysqli_connect_errno()) {
     die("Database connection failed :" .
     mysqli_connect_error() .
     "(" . mysqli_connect_errno() . ")"
         );
    }
?>