<?php

/**
 * This function sends option tags containing Univeristy
 * names and IDs.
 * 
 * @param $connection mysqli a connection to the mysql database
 */
function send_university_options($connection) {
    $query = "SELECT name FROM university ORDER BY province_abv";
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

/**
 * This function sends option tags containing province
 * codes of all available Universities.
 * 
 * @param $connection mysqli a connection to the mysql database
 * 
 */
function send_university_province_options($connection) {
    $query = "SELECT DISTINCT(province_abv) FROM university ORDER BY province_abv";
    $result = mysqli_query($connection,$query);
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<option value="';
        echo $row["province_abv"];
        echo '"> ';
        echo $row["province_abv"];
        echo '</option>';
   }
   mysqli_free_result($result);
}

/**
 * This function sends ONE table row containing all
 * information related to a single university.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $uni_name string the university name the client is interested in
 */
function send_detailed_university_row($connection, $uni_name) {
    $query = "SELECT * FROM university WHERE name='" . $uni_name . "'";
        $result = mysqli_query($connection,$query);
        $row = mysqli_fetch_assoc($result);
        echo '<tr>';
        echo '<td>' . $row['university_id'] . '</td>';
        echo '<td>' . $row['name'] . '</td>';
        echo '<td>' . $row['city'] . '</td>';
        echo '<td>' . $row['province_abv'] . '</td>';
        echo '<td>' . $row['nickname'] . '</td>';
        echo '</tr>';
        mysqli_free_result($result);
}

/**
 * This function sends the name and nickname of all
 * universities in the province the client sends
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $prov string the province in which some universities are located
 */
function send_uni_per_province_rows($connection, $prov) {
    $query = "SELECT name, nickname FROM university WHERE province_abv='" . $prov . "'";
    $result = mysqli_query($connection,$query);
    $cols = array('name', 'nickname');
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
 * This function sends table rows containing name and nickname
 * of Universities depending on if they offer Equivalent courses
 * or not (the client sends a boolean to indicate which they want).
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $prov string boolean (either "true" or "false") indicating if client
 *          wants to search for universities that offer equivalent courses.
 */
function send_uni_rows_by_eq($connection, $by_eq) {
    if ($by_eq=== 'true') {
        $query = "SELECT name, nickname FROM university WHERE university_id IN 
            (SELECT offered_by FROM ocs_course)";
        $result = mysqli_query($connection,$query);
        $cols = array('name', 'nickname');
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
    else {
        $query = "SELECT name, nickname FROM university WHERE university_id NOT IN 
            (SELECT offered_by FROM ocs_course)";
        $result = mysqli_query($connection,$query);
        $cols = array('name', 'nickname');
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
}

/**
 * This function sends table rows containing outside 
 * course info offered by a university determined by the client.
 * 
 * @param $connection mysqli a connection to the mysql database
 * @param $uni_name string the name of the university whose courses
 *          the client is interested in
 */
function send_ocs_course_rows($connection, $uni_name) {
    $query = "SELECT course_code, course_name, year, weight FROM ocs_course INNER JOIN university
    ON ocs_course.offered_by=university.university_id WHERE university.name='" . $uni_name . "'";
    $result = mysqli_query($connection,$query);
    $cols = array('course_code', 'course_name', 'year', 'weight');
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