<?php

include 'connectdb.php';

$entity = $_GET['entity'];
if ($entity==='wcs_course') {
    $query = "SELECT * FROM wcs_course ORDER BY course_code";
    $result = mysqli_query($connection,$query);
    $cols = array('course_code', 'course_name', 'weight', 'suffix');
    $data = "[";
    while ($row = mysqli_fetch_assoc($result)) {
    $data = $data . json_encode($row) . ", ";
   }
   $data = substr($data, 0, -2) . "]";
   echo $data;

}

if (isset($_POST['code'])) {
    $query = 'UPDATE wcs_course SET course_name="' . $_POST['name'] . '", weight="' . $_POST['weight'] . 
    '", suffix="' . $_POST['suffix'] . '" WHERE course_code="' . $_POST['code'] . '"';
    $result = mysqli_query($connection,$query);
    if ($result) {
        echo 'Changes have been successfully saved.';
    }
    else {
        echo 'Changes could not be saved. Please contact the website developer.';
    }
}

mysqli_free_result($result);
mysqli_close($connection);















?>