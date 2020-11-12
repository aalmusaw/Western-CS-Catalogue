<?php

/**
 * Sends option tags containing wcs_course course_code and
 * course_name to client.
 * 
 * @param $connection mysqli a connection to the mysql database
 */
function send_wcs_courses($connection) {
    $query = "SELECT * FROM wcs_course ORDER BY course_code";
    $result = mysqli_query($connection,$query);
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<option value="' . $row['course_code'] . '">' . $row['course_code'] . ': ' 
        . $row['course_name'] . '</option>';
    }
    if($result !== false) {
        mysqli_free_result($result);
     }
}

/**
 * Sends option tags containing university names and IDs to client.
 * 
 * @param $connection mysqli a connection to the mysql database
 */
function send_university_options($connection) {
    $query = "SELECT university_id, name FROM university ORDER BY name";
    $result = mysqli_query($connection,$query);
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<option value="' . $row['university_id'] . '">' . $row['university_id'] . ': ' 
        . $row['name'] . '</option>';
    }
    if($result !== false) {
        mysqli_free_result($result);
        
    }
}

/**
 * Sends option tags containing ocs_course names and codes to client. 
 * It only sends courses offered by a single university.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $uni_id string of INT format containing university ID
 */
function send_ocourse_options($connection, $uni_id) {
    $query = 'SELECT course_code, course_name FROM ocs_course WHERE offered_by="' .  $uni_id
    . '" ORDER BY course_code';
    $result = mysqli_query($connection,$query);
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<option value="' . $row['course_code'] . '">' . $row['course_code'] . ': ' 
        . $row['course_name'] . '</option>';
    }
    if($result !== false) {
        mysqli_free_result($result);
        
    }
}

?>