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
    resetUniProv();
    listUnisByEq();
}

function onSelectEq() {
    // hide divs for other searches
    let to_show = document.getElementById('eq');
    let to_hide = [document.getElementById('wcs_course'), document.getElementById('university')];
    to_show.style.display = 'block';
    to_hide[0].style.display = 'none';
    to_hide[1].style.display = 'none';
}

function resetWesternCSTable() {
    $( '#wcs_table' ).empty()
    $.ajax({
        url: '../models/search.php',
        type: 'get',
        data: { 
          entity: 'wcs_course',
          order_by: $('#wcs_ordered_by').val(),
          order_dir: $('#wcs_order_dir').val()
        },
        success: function(response) {
            let $wcs_table_body = $( '#wcs_table' ), 
            str = response, 
            html = jQuery.parseHTML( str ), 
            nodeNames = []; 
             
          $wcs_table_body.append( html );
        },
        error: function(xhr) {
          //Do Something to handle error
        }
      });

}

function resetUniNames() {
    // clear options to prevent duplications
    $( '#uni_name' ).empty()
    $( '#uni_name' ).append('<option value="-">-</option>')

    // do ajax request to get uni names
    $.ajax({
        url: '../models/search.php',
        type: 'get',
        data: { 
          entity: 'university',
          droplist: 'university'
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

function resetUniProv() {
  // clear options to prevent duplications
  $( '#uni_province_abv' ).empty()
  $( '#uni_province_abv' ).append('<option value="-">-</option>')

      // do ajax request to get uni names
      $.ajax({
        url: '../models/search.php',
        type: 'get',
        data: { 
          entity: 'university',
          droplist: 'province_abv'
        },
        success: function(response) {
            let $uni_prov_select = $( '#uni_province_abv' ), 
            str = response, 
            html = jQuery.parseHTML( str ), 
            nodeNames = []; 
             
          $uni_prov_select.append( html );
        },
        error: function(xhr) {
          //Do Something to handle error
        }
      });
}

function fetchUniInfo() {
  // clear old info if there is any
  $( '#uni_profile' ).empty();
  $( '#uni_courses' ).empty();
  // clear province selection
  document.getElementById('uni_province_abv').value = '-';
  $('#uni_prov_table').hide();
  $('#unis_by_eq_table').hide();
  $('#uni_detailed_tables').show();
  
  $.ajax({
    url: '../models/search.php',
    type: 'get',
    data: { 
      entity: 'university',
      uni_name: $( '#uni_name' ).val()
    },
    success: function(response) {
        let $uni_profile_select = $( '#uni_profile' ), 
        str = response, 
        html = jQuery.parseHTML( str ), 
        nodeNames = []; 
         
        $uni_profile_select.append( html );
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
  fetchCourseInfo();
}

function fetchCourseInfo() {
  $.ajax({
    url: '../models/search.php',
    type: 'get',
    data: { 
      entity: 'ocs_course',
      uni_name: $( '#uni_name' ).val()
    },
    success: function(response) {
        let $uni_courses_select = $( '#uni_courses' ), 
        str = response, 
        html = jQuery.parseHTML( str ), 
        nodeNames = []; 
         
        $uni_courses_select.append( html );
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
}

function clearUniInfo() {
  $( '#uni_detailed_tables' ).hide();
}

function fetchUniList() {
  // clear uni info
  document.getElementById('uni_name').value = '-';
  clearUniInfo();
  $('#unis_by_eq_table').hide();


  // show uni list and clear old data
  $('#uni_prov_table').show();
  $( '#uni_prov_tbody' ).empty();
  $.ajax({
    url: '../models/search.php',
    type: 'get',
    data: { 
      entity: 'university',
      prov: $( '#uni_province_abv' ).val()
    },
    success: function(response) {
        let $uni_prov_tbody_select = $( '#uni_prov_tbody' ), 
        str = response, 
        html = jQuery.parseHTML( str ), 
        nodeNames = []; 
         
        $uni_prov_tbody_select.append( html );
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
}

function listUnisByEq() {
  // hide other uni divs
  $('#uni_prov_table').hide();
  clearUniInfo();
  // clear old data
  $('#unis_by_eq').empty();
  // unhide the table
  $('#unis_by_eq_table').show();
  $.ajax({
    url: '../models/search.php',
    type: 'get',
    data: { 
      entity: 'university',
      by_eq: $('#uni_offers_eq').is(':checked')
    },
    success: function(response) {
        let $unis_by_eq_select = $( '#unis_by_eq' ), 
        str = response, 
        html = jQuery.parseHTML( str ), 
        nodeNames = []; 
         
        $unis_by_eq_select.append( html );
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
}