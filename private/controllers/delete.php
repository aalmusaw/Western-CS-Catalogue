<?php

include 'connectdb.php';

// check if client wants data
if (isset($_GET['entity'])) {
    // client wants western courses
    if ($_GET['entity']==='wcs_course') {
        send_western_courses($connection);
    }
    // client wants to know if a course has equivalency
    else if($_GET['entity']==='is_equivalent') {
        decide_has_equivalency($connection, $_GET['code']);
    }
 }

// check if client wants to delete a western course
if (isset($_POST['wcs_course'])) {
    delete_western_course($connection, $_POST['wcs_course']);
}

mysqli_close($connection);

/**
 * Sends option tags containing Western course names and codes.
 * 
 * @param $connection mysqli a connection to the mysql database
 */
function send_western_courses($connection) {
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
 * Takes a Western course code and finds whether it has an equivalent outside course.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $code string western course code
 */
function decide_has_equivalency($connection, $code) {
    $query = 'SELECT COUNT(*) AS count FROM is_equivalent WHERE wcourse_code="' . $code . 
    '"';
    $result = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row['count'] === "0") {
        echo "false";
    }
    else {
        echo "true";
    }
}

/**
 * Takes a Western course code and deletes its associated row from the database.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $code string western course code
 */
function delete_western_course($connection, $code) {
    $query = 'DELETE FROM wcs_course WHERE course_code="' . $code . '"';
    $result = mysqli_query($connection, $query);
    if (mysqli_affected_rows($connection) === 0) {
        echo "An error has occured. Changes could not be saved.";
    }
    else {
        echo "Changes have been successfully saved.";
    }
}


















?>