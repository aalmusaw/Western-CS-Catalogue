<?php

/**
 * This function sends option tags containing info
 * about Western courses.
 * 
 * @param $connection mysqli a connection to the mysql database
 */
function send_western_course_options($connection) {
    $query = "SELECT course_code FROM wcs_course ORDER BY course_code";
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<option value="' . $row['course_code'] . '">' . $row['course_code'] . "</option>";
    }
    mysqli_free_result($result);
}

/**
 * This function sends table rows containing 
 * course equivalencies. The client specifies which
 * western courses they are interested in, and we
 * send the equivalent courses along with
 * the university that offers the course and 
 * when the decision to approve the equivalency
 * was made.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $wcs string course_code value in wcs_course table
 */
function send_eqs_by_wcs_rows($connection, $wcs) {
    $query = "SELECT wcs_course.course_code as a, wcs_course.course_name as b, wcs_course.weight as c, university.name as d, 
    ocs_course.course_code as e, ocs_course.course_name as f, ocs_course.weight as g, is_equivalent.equiv_approval_date as h 
    FROM wcs_course INNER JOIN is_equivalent
    ON wcs_course.course_code = is_equivalent.wcourse_code INNER JOIN ocs_course 
    ON is_equivalent.ocourse_code = ocs_course.course_code INNER JOIN university
    ON is_equivalent.offered_by = university.university_id
    WHERE wcs_course.course_code='" . $wcs . "'";
    $result = mysqli_query($connection, $query);
    $cols = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<tr>';
        for ($i = 0; $i < count($cols); $i++) {
            echo '<td>';
            echo $row[$cols[$i]];
            echo '</td>';
        }
        echo '</tr>';
   }
   mysqli_free_result($result);
}

/**
 * This function sends table rows containing 
 * course equivalencies. The client specifies which
 * a date they are interested in, and we
 * send all courses made equivalent on or
 * before that date along with university and western
 * course info.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $date string in the format YYYY-MM-DD
 */
function send_eqs_by_date_rows($connection, $date) {
    $query = "SELECT wcs_course.course_code as a, wcs_course.course_name as b, wcs_course.weight as c, university.name as d, 
            ocs_course.course_code as e, ocs_course.course_name as f, ocs_course.weight as g, is_equivalent.equiv_approval_date as h 
            FROM wcs_course INNER JOIN is_equivalent
            ON wcs_course.course_code = is_equivalent.wcourse_code INNER JOIN ocs_course 
            ON is_equivalent.ocourse_code = ocs_course.course_code INNER JOIN university
            ON is_equivalent.offered_by = university.university_id
            WHERE is_equivalent.equiv_approval_date <= '" . $date . "'";
            $result = mysqli_query($connection, $query);
            $cols = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
            while ($row = mysqli_fetch_assoc($result)) {
                echo '<tr>';
                for ($i = 0; $i < count($cols); $i++) {
                    echo '<td>';
                    echo $row[$cols[$i]];
                    echo '</td>';
                }
                echo '</tr>';
           }
           mysqli_free_result($result);
}



?>