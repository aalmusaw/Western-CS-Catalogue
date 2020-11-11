var toDelete;
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

    window.setTimeout(function(){
        toDelete = result;
    }, 3000)
    
}


function confirmDelete() {
    let course = $('#wcs_course').val();
    if (!course) {
        alert('Please select a course to delete.')
    }
    else {
        has_equivalent(course);
        console.log('has_equivalent() returned: ' + toDelete);
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
    }

}

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