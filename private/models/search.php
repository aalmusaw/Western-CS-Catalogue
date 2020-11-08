<?php

include 'connectdb.php';
$entity = $_GET['entity'];
if ($entity==='wcs_course') {
    // need these lines in case someone submits invalid query parameters purposely
    if ($_GET['order_by'] === 'course_code') {
        $order_by = 'course_code';
    }
    else if ($_GET['order_by'] === 'course_name') {
        $order_by = 'course_name';
    }
    if ($_GET['order_dir'] === 'asc') {
        $order_dir = 'ASC';
    }
    else if ($_GET['order_dir'] === 'desc') {
        $order_dir = 'DESC';
    }
    $query = 'SELECT * FROM wcs_course ORDER BY ' . $order_by . ' ' . $order_dir;
    $result = mysqli_query($connection,$query);
    $cols = array('course_code', 'course_name', 'weight', 'suffix');
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<tr>';
        for ($i = 0; i < count($cols); i++) {
            echo '<td>';
            echo $row[$cols[$i]];
            echo '</td>';
        }
        echo '</tr>';
   }
   mysqli_free_result($result);

}
else if ($entity==='university') {
    $query = 'SELECT name FROM university ORDER BY province_abv;';
    $result = mysqli_query($connection,$query);
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<option value="';
        echo $row["name"];
        echo '"> ';
        echo $row["name"];
        echo '</option>';
   }
   mysqli_free_result($result);

}

$connection.close();















?>