<?php

include 'connectdb.php';

$entity = $_GET['entity'];
if ($entity==='wcs_course') {
    $query = "SELECT * FROM wcs_course ORDER BY course_code";
    $result = mysqli_query($connection,$query);
    $cols = array('course_code', 'course_name', 'weight', 'suffix');
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($data, json_encode($row));
   }
   echo json_encode($data);
   mysqli_free_result($result);

}
mysqli_close($connection);















?>