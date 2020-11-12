<?php

/**
 * Inserts a new Western course into wcs_course table
 * unless the course code inserted already exists.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $code string the new course's code
 * @param $name string the new course's name
 * @param $weight string of format X.XX (DECIMAL), the new course's weight
 * @param $suffix string the new course's suffix 
 */
function insert_western_course($connection, $code, $name, $weight, $suffix) {
    $code = mysqli_real_escape_string($connection, $code);
    $name = mysqli_real_escape_string($connection, $name);
    $weight = mysqli_real_escape_string($connection, $weight);
    $suffix = mysqli_real_escape_string($connection, $suffix);
    $query = 'INSERT IGNORE INTO wcs_course VALUES ("cs' . $code . '", "'
    . $name . '", "' . $weight . '", "' . $suffix . '")' ;
    $result = mysqli_query($connection,$query);
    if (mysqli_affected_rows($connection) == 0) {
        echo "Changes have not been saved. You may have entered a 
        duplicate course code or there is an error on our end.";
    }
    else {
        echo "Changes have been successfully saved.";
    }
}

/**
 * Inserts a new equivalency between existing outside course and western course.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $wcode string Western course code.
 * @param $ocode string Outside course code.
 * @param $uni the university ID of the university offering $ocode.
 */
function insert_new_equivalency($connection, $wcode, $ocode, $uni) {
    $query = 'INSERT INTO is_equivalent VALUES ("' . $wcode . '", "' . $ocode . '", "'
            . $uni . '", CURDATE())';
        $result = mysqli_query($connection,$query);
        if (mysqli_affected_rows($connection) == 0) {
            echo "Changes could not be saved. Please contact the website developer.";
        }
        else {
            echo "Changes have been successfully saved.";
        }
}

/**
 * Updates an equivalency by changing the date of approval to today.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $wcode string Western course code.
 * @param $ocode string Outside course code.
 * @param $uni the university ID of the university offering $ocode.
 */
function update_equivalency($connection, $wcode, $ocode, $uni) {
    $query = 'UPDATE is_equivalent SET equiv_approval_date=CURDATE() WHERE ocourse_code="' . 
    $ocode . '" AND offered_by=' . $uni . ' AND wcourse_code="' . 
    $wcode . '"';
    $result = mysqli_query($connection,$query);
    if (mysqli_affected_rows($connection) > 0) {
        echo "This course equivalency already exists. The approval date has been updated.";
    }
    else {
        echo "Changes could not be saved. Please contact the website developer.";
    }
}
?>