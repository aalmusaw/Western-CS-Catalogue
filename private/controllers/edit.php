<?php

include 'connectdb.php';

$entity = $_GET['entity'];
// client wants all rows in wcs_course as array of JSONs
if ($entity==='wcs_course') {
    send_western_courses($connection);
}

// client wants to update western course info
if (isset($_POST['code'])) {
    update_western_course($connection, $_POST['code'], $_POST['name'], $_POST['weight'], $_POST['suffix']);
}

mysqli_close($connection);



/**
 * Sends an array of JSONs containing all rows in wcs_course
 * 
 * @param $connection mysqli a connection to the mysql database
 */
function send_western_courses($connection) {
    $query = "SELECT * FROM wcs_course ORDER BY course_code";
    $result = mysqli_query($connection,$query);
    $cols = array('course_code', 'course_name', 'weight', 'suffix');
    $data = "[";
    while ($row = mysqli_fetch_assoc($result)) {
    $data = $data . json_encode($row) . ", ";
   }
   $data = substr($data, 0, -2) . "]";
   echo $data;
   if($result !== false) {
    mysqli_free_result($result);
    }
}

/**
 * 
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $code string the course code of the course to update
 * @param $name string the course's new name
 * @param $weight string of format X.XX (DECIMAL), the course's new weight
 * @param $suffix string the course's new suffix 
 */
function update_western_course($connection, $code, $name, $weight, $suffix) {
    $query = 'UPDATE wcs_course SET course_name="' . $name . '", weight="' . $weight . 
    '", suffix="' . $suffix . '" WHERE course_code="' . $code . '"';
    $result = mysqli_query($connection,$query);
    if (mysqli_affected_rows($connection)>0) {
        echo 'Changes have been successfully saved.';
    }
    else {
        echo 'Changes could not be saved. You either did not change anything or you input is invalid.';
    }
}
















?>