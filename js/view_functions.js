function onSelectEntity(entity) {
    if (entity==='wcs_course') {
        onSelectWCSCourse();
    }
    else if (entity==='university') {
        onSelectUniversity();
    }
    else if (entity==='is_equivalent') {
        onSelectEq();
    }
}

function onSelectWCSCourse() {
    // hide divs for other searches
    let to_show = document.getElementById('wcs_course');
    let to_hide = [document.getElementById('university'), document.getElementById('eq')];
    to_show.style.display = 'block';
    to_hide[0].style.display = 'none';
    to_hide[1].style.display = 'none';
}

function onSelectUniversity() {
    // hide divs for other searches
    let to_show = document.getElementById('university');
    let to_hide = [document.getElementById('wcs_course'), document.getElementById('eq')];
    to_show.style.display = 'block';
    to_hide[0].style.display = 'none';
    to_hide[1].style.display = 'none';

    // load uni choices
    resetUniNames();
}

function onSelectEq() {
    // hide divs for other searches
    let to_show = document.getElementById('eq');
    let to_hide = [document.getElementById('wcs_course'), document.getElementById('university')];
    to_show.style.display = 'block';
    to_hide[0].style.display = 'none';
    to_hide[1].style.display = 'none';
}

function resetUniNames() {
    // clear options to prevent duplications
    $( '#uni_name' ).empty()

    // do ajax request to get uni names
    $.ajax({
        url: '../models/search.php',
        type: 'get',
        data: { 
          entity: 'university'
        },
        success: function(response) {
            let $uni_name_select = $( '#uni_name' ), 
            str = response, 
            html = jQuery.parseHTML( str ), 
            nodeNames = []; 
             
          $uni_name_select.append( html );
        },
        error: function(xhr) {
          //Do Something to handle error
        }
      });
}