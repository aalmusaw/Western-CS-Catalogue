/**
 *  This module contains all functions related to the
 *  add.html file.
 *  @module edit_functions 
 */
var courses; // global variable contains an array of Western courses
$(document).ready(function() {
    // load up the course options
    getCourseList();
    // call some listeners
    $('#wcs_course_list').change(toggleForm);
    $('#submitForm').click(submitData);
});

/**
 * Hides and shows the form to edit a Western course depending
 * on if the user has selected a course to edit.
 */
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

/**
 * Searches in the global array courses for a course containing the
 * the course_code and get the relevant Western course info to auto-fill
 * the form with the previous data.
 * @param {string} ccode the Western course code for which to search
 */
function findCourseInList(ccode) {
    for (let course of courses) {
        if (ccode === course.course_code) {
            return course;
        }
    }
}

/**
 * Make a GET request to the backend server and retrieve array of JSONs
 * containing all rows of western courses from the backend database.
 * Then, save the response as array of objects in the global variable courses.
 */
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

/**
 * Validate if the course weight is of the form X.XX
 */
function validWeight () {
    if ($('#course_weight').val() === '' || /^\d(\.\d{1,2})?$/.test($('#course_weight').val())) {
        return true;
    }
    else {
        alert("Invalid input for weight. Must be a decimal of the form X.XX or X.X");
    }
}

/**
 * Make a POST request to the server and submit the changes
 * the user has made to a Western course.
 */
function submitData() {
    if (validWeight) {
        $.post("../controllers/edit.php",
        {
            code: $('#wcs_course_list').val(),
            name: $('#course_name').val(),
            weight: $('#course_weight').val(),
            suffix: $('#suffix').val()
        },
        function(response) {
            confirm(response);
        }
        )
    }
}