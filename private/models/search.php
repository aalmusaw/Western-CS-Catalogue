<?php

include 'connectdb.php';
$entity = $_GET['entity'];
if ($entity==='wcs_course') {
    $query = "SELECT * FROM wcs_course ORDER BY " . $_GET['order_by'] . " " . $_GET['order_dir'];
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
else if ($entity==='university') {
    if($_GET['droplist'] === 'university') {
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
    else if($_GET['droplist'] === 'province_abv') {
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
    if(isset($_GET['uni_name'])) {
        $query = "SELECT * FROM university WHERE name='" . $_GET['uni_name'] . "'";
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

    if(isset($_GET['prov'])) {
        $query = "SELECT name, nickname FROM university WHERE province_abv='" . $_GET['prov'] . "'";
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

    if(isset($_GET['by_eq'])) {
        if ($_GET['by_eq'] === 'true') {
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

}
else if ($entity==='ocs_course') {
    if(isset($_GET['uni_name'])) {
        $query = "SELECT course_code, course_name, year, weight FROM ocs_course INNER JOIN university
        ON ocs_course.offered_by=university.university_id WHERE university.name='" . $_GET['uni_name'] . "'";
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
}

else if ($entity==='eq') {
    if(isset($_GET['dropbox'])) {
        if ($_GET['dropbox'] == 'wcs') {
            $query = "SELECT course_code FROM wcs_course ORDER BY course_code";
            $result = mysqli_query($connection, $query);
            while ($row = mysqli_fetch_assoc($result)) {
                echo '<option value="' . $row['course_code'] . '">' . $row['course_code'] . "</option>";
            }
            mysqli_free_result($result);
        }
    }
    if(isset($_GET['by'])) {
        if($_GET['by'] == 'wcs') {
            $query = "SELECT wcs_course.course_code as a, wcs_course.course_name as b, wcs_course.weight as c, university.name as d, 
            ocs_course.course_code as e, ocs_course.course_name as f, ocs_course.weight as g, is_equivalent.equiv_approval_date as h 
            FROM wcs_course INNER JOIN is_equivalent
            ON wcs_course.course_code = is_equivalent.wcourse_code INNER JOIN ocs_course 
            ON is_equivalent.ocourse_code = ocs_course.course_code INNER JOIN university
            ON is_equivalent.offered_by = university.university_id
            WHERE wcs_course.course_code='" . $_GET['wcs'] . "'";
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
    }
}

mysqli_close($connection);















?>