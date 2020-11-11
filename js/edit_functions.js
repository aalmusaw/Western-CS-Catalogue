courses = [];
function loadUpCourses() {
    $.getJSON("../controllers/edit.php",
     {entity:"wcs_course"},
     function(response) {
        console.log(response);
         response = JSON.parse(response);
         console.log(response);
         let n = Object.keys(response).length;
         for(let i = 0; i < n; i++) {
             courses.push[response[i]];
             let html = "<option value=" + courses[i]["course_code"] + ">" + courses[i]["course_code"]+": "
                + courses[i]["course_name"] + "</option>" 
             $('wcs_course_list').append(html);
         }
     }

    )
}
$(document).ready(loadUpCourses);