<?php

include 'connectdb.php';
$entity = $_GET['entity'];
if ($entity==='university') {
    $query = 'SELECT name FROM university ORDER BY province_abv;';
    $result = mysqli_query($connection,$query);
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<option value="';
        echo $row["name"];
        echo '"> ';
        echo $row["name"];
        echo '</option>';
        echo '\r\n';
   }
   mysqli_free_result($result);

}















?>