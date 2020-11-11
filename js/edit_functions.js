var courses;
$(document).ready(function() {
    // load up the course options
    getCourseList();
    // call some listeners
    $('#wcs_course_list').change(toggleForm);
    $('#submitForm').click(submitData);
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

function validWeight () {
    if ($('#course_weight').val() === '' || /^\d(\.\d{1,2})?$/.test($('#course_weight').val())) {
        return true;
    }
    else {
        alert("Invalid input for weight. Must be a decimal of the form X.XX or X.X");
    }
}

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
            if(alert(response)){}
            else window.location.reload(); 
        }
        )
    }
}