<?php

include 'connectdb.php';
include 'search_wcs_course.php';
include 'search_university.php';
include 'search_equiv.php';

// this variable decides the kind of request to serve
$entity = $_GET['entity'];

// the client wants data directly related to the wcs_course table
if ($entity==='wcs_course') {
    send_western_courses_table($connection, $_GET['order_by'], $_GET['order_dir']);
}

// the client wants data directly related to the university table
else if ($entity==='university') {
 // the client wants option tags
    if($_GET['droplist'] === 'university') {
        send_university_options($connection);
    }
    else if($_GET['droplist'] === 'province_abv') {
        send_university_province_options($connection);
    }
// the client wants table rows
    if(isset($_GET['uni_name'])) {
        send_detailed_university_row($connection, $_GET['uni_name']);
    }
    if(isset($_GET['prov'])) {
        send_uni_per_province_rows($connection, $_GET['prov']);
    }

    if(isset($_GET['by_eq'])) {
        send_uni_rows_by_eq($connection, $_GET['by_eq']);
    }

}
// the client wants data directly related to the ocs_course table
else if ($entity==='ocs_course') {
    if(isset($_GET['uni_name'])) {
        send_ocs_course_rows($connection, $_GET['uni_name']);
    }   
}

// the clients wants data directly related to the is_equivalent table
else if ($entity==='eq') {
    if(isset($_GET['dropbox'])) {
        if ($_GET['dropbox'] == 'wcs') {
            send_western_course_options($connection);
        }
    }
    if(isset($_GET['by'])) {
        if($_GET['by'] == 'wcs') {
            send_eqs_by_wcs_rows($connection, $_GET['wcs']);
        }
        else if($_GET['by'] == 'date') {
            send_eqs_by_date_rows($connection, $_GET['date']);
        }
    }
}

mysqli_close($connection);















?>