/**
 *  This module contains all functions related to the
 *  add.html file.
 *  @module delete_functions 
 */
var toDelete;
$(document).ready(function() {
    getWesternCourseList();
    // call some listeners
    $('#Delete').click(confirmDelete);
})

/**
 * Sends a GET request to the backend server and retrieves
 * a list of option tags with Western course info.
 */
function getWesternCourseList() {
    // load up the course options
    $.get("../controllers/delete.php",
        {
            entity:"wcs_course"
        },
        function(response) {
            $('#wcs_course').append(response);
            }
    );
}

/**
 * Sends a GET request to the backend server and retrieves
 * a boolean to decide if the course with the code given
 * is associated with an equivalent outside course.
 * @param {string} course_code western course code
 */
function has_equivalent(course_code) {
    $.get("../controllers/delete.php",
        {
            entity:"is_equivalent",
            code: course_code

        },
        function(response) {
            if (/.*true.*/.test(response)) toDelete = true;
            else if (/.*false.*/.test(response)) toDelete = false;
            }
    );
    
}

/**
 * Issue a warning to the user if the course to delete is associated with an equivalent
 * outside course. Also confirm with the user before the delete is made.
 */
function confirmDelete() {
    let course = $('#wcs_course').val();
    if (!course) {
        alert('Please select a course to delete.')
    }
    else {
        has_equivalent(course);
        // use timeout because has_equivalent(course) is async and might take time
        window.setTimeout(function() {
            if (toDelete) {
                let user_conf = confirm('The course you are about to delete is associated \
                with an outside course. Do you still wish to proceed?');
                if (user_conf) {
                    submitDelete();
                }
        
            }
            else {
                let user_conf = confirm('You are about to delete this course permanently. Would you like to proceed?');
                if (user_conf) {
                    submitDelete();
                }
            }
        }, 1000)
    }

}

/**
 * Make a POST request to the backend server to delete
 * the selected Western course.
 */
function submitDelete() {
    let courseCode = $('#wcs_course').val();
    $.post('../controllers/delete.php',
    {
        wcs_course: courseCode 
    },
    function(response) {
        confirm(response);
        window.location.reload();

    }
    )
}