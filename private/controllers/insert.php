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
    else if ($_GET['entity']==='university') {
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
    else if ($_GET['entity']==='ocs_course') {
        $query = 'SELECT course_code, course_name FROM ocs_course WHERE offered_by="' .  $_GET['uni_id']
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
}


if (isset($_POST['form'])) {
    if ($_POST['form']==='WF') {
        $code = mysqli_real_escape_string($connection, $_POST['code']);
        $name = mysqli_real_escape_string($connection, $_POST['name']);
        $weight = mysqli_real_escape_string($connection, $_POST['weight']);
        $suffix = mysqli_real_escape_string($connection, $_POST['suffix']);
        
        $query = "INSERT IGNORE INTO wcs_course VALUES (" . $code . ", "
        . $name . ", " . $weight . ", " . $suffix . ")" ;
        echo $query;
        $result = mysqli_query($connection,$query);
        if ($result) {
            echo "Changes have been successively saved.";
        }
        if (mysqli_affected_rows($connection) == 0) {
            echo "Changes have not been saved. You may have entered a 
            duplicate course code or there is an error on our end.";
        }
    }
    else if($_POST['form']==='EF') {
        $query = 'SELECT COUNT(*) AS count FROM is_equivalent WHERE ocourse_code="' . $_POST['ocode']
            . '" AND offered_by="' . $_POST['uni'] . '" AND wcourse_code="' . $_POST['wcode'] . '"';
        $result = mysqli_query($connection,$query);
        $row = mysqli_fetch_assoc($result);
        if($result !== false) {
            mysqli_free_result($result);
            }
        if ($row['count'] == 1) {
            $query = 'UPDATE is_equivalent SET equiv_approval_date=CURDATE() WHERE ocourse_code="' . 
            $_POST['ocode'] . '" AND offered_by=' . $_POST['uni'] . ' AND wcourse_code="' . 
            $_POST['wcode'] . '"';
            $result = mysqli_query($connection,$query);
            if ($result) {
                echo "This course equivalency already exists. The approval date has been updated.";
            }
            else {
                echo "Changes could not be saved. Please contact the website developer.";
            }
        }
        else {
            if (isset($_POST['date'])) {
                $query = 'INSERT INTO is_equivalent VALUES ("' . $_POST['wcode'] . '", "' . $_POST['ocode'] . '", "'
                . $_POST['uni'] . '", ' . $_POST['date'] . '")';
            }
            else {
                $query = 'INSERT INTO is_equivalent VALUES ("' . $_POST['wcode'] . '", "' . $_POST['ocode'] . '", "'
                . $_POST['uni'] . '", CURDATE())';
            }
            $result = mysqli_query($connection,$query);
            if (mysqli_affected_rows($connection) == 0) {
                echo "Changes could not be saved. Please contact the website developer.";
            }
            if($result){
                echo "Changes have been saved successfully.";
            }
            else {
                echo "Fatal Error!";
            }
                
            

        }
        

    }
}

mysqli_close($connection);















?>