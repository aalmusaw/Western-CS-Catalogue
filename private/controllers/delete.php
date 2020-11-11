<?php

include 'connectdb.php';

if (isset($_GET['entity'])) {
    if ($_GET['entity']==='wcs_course') {
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
    else if($_GET['entity']==='is_equivalent') {
        $code = $_GET['code'];
        $query = 'SELECT COUNT(*) AS count FROM is_equivalent WHERE wcourse_code="' . $code . 
        '"';
        $result = mysqli_query($connection, $query);
        $row = mysqli_fetch_assoc($result);
        if ($row['count'] === "0") {
            echo false;
        }
        else {
            echo true;
        }
    }
 }


if (isset($_POST['wcs_course'])) {
    $code = $_POST['wcs_course'];
    $query = 'DELETE FROM wcs_course WHERE course_code="' . $code . '"';
    $result = mysqli_query($connection, $query);
    if (mysqli_affected_rows($connection) === 0) {
        echo "An error has occured. Changes could not be saved.";
    }
    else {
        echo "Changes have been successfully saved.";
    }
}

mysqli_close($connection);















?>