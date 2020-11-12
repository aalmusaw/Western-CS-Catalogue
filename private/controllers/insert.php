<?php

include 'connectdb.php';
include 'insert_options.php';
include 'insert_new.php';

// client wants option tags
if (isset($_GET['entity'])) {
    if ($_GET['entity']==='wcs_course') {
        send_wcs_courses($connection);
    }
    else if ($_GET['entity']==='university') {
        send_university_options($connection);
    }
    else if ($_GET['entity']==='ocs_course') {
        send_ocourse_options($connection, $_GET['uni_id']);
    }
}

// client wants to add a new entry
if (isset($_POST['form'])) {
    // related to the Western Insert Form
    if ($_POST['form']==='WF') {
        insert_western_course($connection, $_POST['code'], $_POST['name'], $_POST['weight'], $_POST['suffix']);
    }

    // related to the Course Equivalency Insert Form
    else if($_POST['form']==='EF') {
        // check if the equivalency already exists
        $query = 'SELECT COUNT(*) AS count FROM is_equivalent WHERE ocourse_code="' . $_POST['ocode']
            . '" AND offered_by="' . $_POST['uni'] . '" AND wcourse_code="' . $_POST['wcode'] . '"';
        $result = mysqli_query($connection,$query);
        $row = mysqli_fetch_assoc($result);
        if($result !== false) {
            mysqli_free_result($result);
            }
        if ($row['count'] == 1) {
            update_equivalency($connection, $_POST['wcode'],  $_POST['ocode'], $_POST['uni']);
        }
        else {
            insert_new_equivalency(($connection, $_POST['wcode'],  $_POST['ocode'], $_POST['uni']);
        }
    }
}
mysqli_close($connection);

?>