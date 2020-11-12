/**
 *  This module contains all functions related to the
 *  add.html file.
 *  @module insert_functions 
 */
$(document).ready(function() {
    toggleForms();
    // set up listeners
    $('#entity').change(toggleForms);
    $('#EFuniversity').change(function() {
        $('#EFocourse').empty();
        getOutsideCourseList($('#EFuniversity').val());
    });
    $('#WFsubmit').click(submitWF);
    $('#EFsubmit').click(submitEF);
})

/**
 * Switches back and forth between inserting a Western Course
 * and an equivalency. It also calls functions that load option
 * tags.
 */
function toggleForms() {
    if ($('#entity').val() === 'wcs_course') {
        $('#westernForm').show();
        $('#eqForm').hide();
    }
    else if ($('#entity').val() === 'eq') {

        $('#westernForm').hide();
        $('#eqForm').show();
        getWesternCourseList();
        getUniversityList();
    }
}

/**
 * Makes a GET request to the backend server and retrieves
 * option tags containing Western courses info
 */
function getWesternCourseList() {
    $.get("../controllers/insert.php",
        {
            entity:"wcs_course"
        },
        function(response) {
            $('#EFwcourse').append(response);
            }
    );
}

/**
 * Makes a GET request to the backend server and retrieves
 * option tags containing Universities info
 */
function getUniversityList() {
    // load up the course options
    $.get("../controllers/insert.php",
        {
            entity:"university"
        },
        function(response) {
            $('#EFuniversity').append(response);
            }
    );
}

/**
 * Makes a GET request to the backend server and retrieves
 * option tags containing info of outside courses offered by
 * a univeristy whose ID is given.
 * 
 * @param university_id number the ID of the university whose courses are sought
 */
function getOutsideCourseList(university_id) {
    // load up the course options
    $.get("../controllers/insert.php",
        {
            entity:"ocs_course",
            uni_id: university_id

        },
        function(response) {
            $('#EFocourse').append(response);
            }
    );
    
}

/**
 * Makes a POST request to the backend server to insert a new 
 * Western course in the backend database. It also validates the input
 * course code. 
 */
function submitWF() {
    let ccode = parseInt($('#WFcode').val());
    // check if the course code contains non-numerics or floats
    if (isNaN(ccode) || Math.abs(ccode-parseFloat($('#WFcode').val())) > 0) {
        alert('Course Code must be integer only.')
    }
    else {
        $.post("../controllers/insert.php",
        {
            form: 'WF',
            code: ccode,
            name: $('#WFname').val(),
            weight: $('#WFweight').val(),
            suffix: $('#WFsuffix').val()
        },
        function(response) {
            confirm(response);
        }
        )
    }
}

/**
 * Makes a POST request to the backend server to insert a new 
 * equivalency in the backend database.
 */
function submitEF() {
    if (!$('#EFuniversity').val()) {
       confirm("Please select a university.");
    }
    else {
        $.post("../controllers/insert.php",
        {
            form: 'EF',
            wcode: $('#EFwcourse').val(),
            ocode: $('#EFocourse').val(),
            uni: $('#EFuniversity').val()
        },
        function(response) {
            confirm(response);
        }
        );
    }

}