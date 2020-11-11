courses = [];
function loadUpCourses() {
    $.getJSON("../controllers/edit.php",
     {entity:"wcs_course"},
     function(response) {
         console.log(typeof response);
         console.log(typeof response[0]);
         for(let i = 0; i < response.length; i++) {
             courses.push[response[i]];
             let html = "<option value=" + courses[i].course_code + ">" + courses[i].course_code + ": "
                + courses[i].course_name + "</option>";
             $('wcs_course_list').append(html);
         }
     }

    )
}
$(document).ready(loadUpCourses);