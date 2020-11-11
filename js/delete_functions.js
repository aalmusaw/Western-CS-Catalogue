
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
    let result;
    window.setTimeout(function() {
        $.get("../controllers/delete.php",
        {
            entity:"is_equivalent",
            code: course_code

        },
        function(response) {
            console.log('has_equivalent get response is: ' + response);
            if (response === "true") result = true;
            else if (response === "false") result = false;
            }
    );
    }, 2000)
    return result;
}


function confirmDelete() {
    let course = $('#wcs_course').val();
    if (!course) {
        alert('Please select a course to delete.')
    }
    else {
        let to_warn = has_equivalent(course);
        console.log('has_equivalent() returned: ' + to_warn);
        if (to_warn) {
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