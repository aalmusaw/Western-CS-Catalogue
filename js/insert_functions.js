
$(document).ready(function() {
    // load up the course options
    getCourseList();
    // call some listeners
    toggleForms();
    $('#wcs_course_list').change(toggleForm);
    $('#EFuniversity').change(getOutsideCourseList($('#EFuniversity').val()))
    $('#WFsubmit').click(submitWF);
    $('#EFsubmit').click(submitEF);
})

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

function getWesternCourseList() {
    // load up the course options
    $.get("../controllers/insert.php",
        {
            entity:"wcs_course"
        },
        function(response) {
            $('#EFwcourse').append(response);
            }
    );
}

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
    $('#EFuniversity:first-child').prop("selected", "selected");
    getOutsideCourseList($('#EFuniversity:first-child').val());
    
}

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





function submitWF() {
    $.post("../controllers/insert.php",
    {
        form: 'WF',
        code: $('#WFcode').val(),
        name: $('#WFname').val(),
        weight: $('#WFweight').val(),
        suffix: $('#WFsuffix').val()
    },
    function(response) {
        alert(response);
        location.reload();
    }
    )
}

function submitEF() {
    $.post("../controllers/insert.php",
    {
        form: 'EF',
        wcode: $('#EFwcourse').val(),
        ocode: $('#EFocourse').val(),
        uni: $('#EFuniversity').val(),
        weight: $('#WFdate').val()
    },
    function(response) {
        alert(response);
        location.reload();
    }
    )
}