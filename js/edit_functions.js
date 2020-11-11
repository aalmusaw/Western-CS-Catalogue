var courses = [];
$(document).ready(function() {
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
})