<?php

/**
 * This function sends table rows containing info
 * about Western courses. The client chooses the
 * order in which rows are displayed.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $order_by string (either "course_code" or "course_name") by which we order the results
 * @param $order_dir string (either "asc" or "desc") indicating whether to sort increasingly or decreasingly
 */
function send_western_courses_table($connection, $order_by, $order_dir) {
    $query = "SELECT * FROM wcs_course ORDER BY " . $order_by . " " . $order_dir;
    $result = mysqli_query($connection,$query);
    $cols = array('course_code', 'course_name', 'weight', 'suffix');
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