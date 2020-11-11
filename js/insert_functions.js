
$(document).ready(function() {
    toggleForms();
    // call some listeners
    $('#entity').change(toggleForms);
    $('#EFuniversity').change(function() {
        $('#EFocourse').empty();
        getOutsideCourseList($('#EFuniversity').val());
    });
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
    let ccode = parseInt($('#WFcode').val());
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