
$(document).ready(function() {
    getWesternCourseList();
    // call some listeners
    $('#Delete').click(confirmDelete);
})


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


function has_equivalent(course_code) {
    $.get("../controllers/delete.php",
        {
            entity:"is_equivalent",
            code: course_code

        },
        function(response) {
            if (response === "true") return true;
            else if (response === "false") return false;
            }
    );
    
}


function confirmDelete() {
    let course = $('#wcs_course').val();
    if (course) {
        alert('Please select a course to delete.')
    }
    else {
        if (has_equivalent(course)) {
            let to_delete = confirm('The course you are about to delete is associated \
            with an outside course. Do you still wish to proceed?');
            if (to_delete) {
                submitDelete();
            }
    
        }
        else {
            let to_delete = confirm('You are about to delete this course permanently. Would you like to proceed?');
            if (to_delete) {
                submitDelete();
            }
        }
    }

}

function submitDelete() {
    let course_code = $('#wcs_course').val();
    $.post('../controllers/delete.php',
    {
        wcs_course: course_code 
    },
    function(response) {
        confirm(response);
        window.location.reload();

    }
    )
}