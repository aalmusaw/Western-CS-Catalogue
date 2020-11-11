var courses;
$(document).ready(function() {
    // load up the course options
    getCourseList();
    // call some listeners
    $('#wcs_course_list').change(toggleForm);
})

function toggleForm() {
    let ccode = $('#wcs_course_list').val();
    if (ccode !== '-') {
        $('form').show();
        let course = findCourseInList(ccode);
        $('#course_name').val(course.course_name);
        $('#course_weight').val(course.weight);
        $('#suffix').val(course.suffix);
    }
    else {
        $('form').hide();
        $('#course_name').val('');
        $('#course_weight').val('');
        $('#suffix').val('');
    }
}

function findCourseInList(ccode) {
    for (let course of courses) {
        if (ccode === course.course_code) {
            return course;
        }
    }
}

function getCourseList() {
    // re-initialize global array 
    courses = [];
    // load up the course options
    $.getJSON("../controllers/edit.php",
        {entity:"wcs_course"},
        function(response) {
            courses = response;
            for(let i = 0; i < response.length; i++) {
                let html = '<option value="' + response[i].course_code + '">' + response[i].course_code + ': '
                + response[i].course_name + '</option>';
                $('#wcs_course_list').append(html);
            }
            
        }
    );
    
}