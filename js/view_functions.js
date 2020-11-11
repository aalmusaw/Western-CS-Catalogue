/**
 *  This module contains all functions related to the
 *  view.html file.
 *  @module view_functions 
 */

$(document).ready(function() {
  // execute functions that load data
  resetWesternCSTable();

  // hide some elements
  $('#university').hide();
  $('#uni_detailed_tables').hide();
  $('#uni_prov_table').hide();
  $('#eq').hide();
  $('#eq_ocs_by_wcs_table').hide();
  $('#eq_ocs_by_date_table').hide();

  // set up listeners
  $('#entity').change(onSelectEntity);
  $('#wcs_ordered_by').change(resetWesternCSTable);
  $('#wcs_order_dir').change(resetWesternCSTable);
  $('#uni_name').change(fetchUniInfo);
  $('#uni_province_abv').change(fetchUniList);
  $('#uni_offers_eq').change(listUnisByEq);
  $('#eq_wcs_dropbox').change(eq_ocs_by_wcs);
  $('#approval_date').change(eq_ocs_by_date);
});

/**
 * This performs an action depending on
 * the user's current choice of entity.
 * For example, if the user selects to
 * search for a University, then the
 * irrelevant tables are hidden and more
 * search criteria are provided.
 */
function onSelectEntity() {
let entity = $('#entity').val();
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

/**
 * This functions hides irrelevant divs
 * and shows relevant (Western Courses) div.
 */
function onSelectWCSCourse() {
  $('#wcs_course').show();
  $('#university').hide();
  $('#eq').hide();
}

/**
 * This functions hides irrelevant divs
 * and shows relevant (University) div.
 * It also loads options for different
 * search criteria. 
 */
function onSelectUniversity() {
  // hide dive irrelevant divs
  $('#university').show();
  $('#wcs_course').hide();
  $('#eq').hide();

  // load more search options
  resetUniNames();
  resetUniProv();
  listUnisByEq();
}

/**
 * This functions hides irrelevant divs
 * and shows relevant (Equivalent Courses) div.
 * It also loads Western Courses options to
 * search for their equivalent counterparts.
 */
function onSelectEq() {
  $('#eq').show();
  $('#wcs_course').hide()
  $('#university').hide();
  resetWCSlist();
}

/**
 * This function makes a GET request to the backend
 * server and receives table rows that contain data
 * on Western Courses. The function appends the html
 * to the table with `id=wcs_table`.
 */
function resetWesternCSTable() {
  $( '#wcs_table' ).empty();
  // make GET request
  $.get('../controllers/search.php',
  {
    entity: 'wcs_course',
    order_by: $('#wcs_ordered_by').val(),
    order_dir: $('#wcs_order_dir').val()
  },
  function(response) {
    $('#wcs_table').append(response);
  });
}

/**
 * This function makes a GET request to the backend
 * server and receives select options that contain data
 * on Universities. The function appends the html
 * to the select element with `id=uni_name`.
 */
function resetUniNames() {
  // deletes old options to prevent duplications
  $('#uni_name').empty();
  $('#uni_name').append('<option value="-" selected>-</option>');
  // make GET request
  $.get('../controllers/search.php',
  {
    entity: 'university',
    droplist: 'university'
  },
  function(response) {
    $('#uni_name').append(response);
  });
}

/**
 * This function makes a GET request to the backend
 * server and receives select options that contain data
 * on University provinces. The function appends the html
 * to the select element with `id=uni_province_abv`.
 */
function resetUniProv() {
  // deletes old options to prevent duplications
  $('#uni_province_abv').empty();
  $('#uni_province_abv').append('<option value="-" selected>-</option>');
  // make GET request
  $.get('../controllers/search.php',
  { 
    entity: 'university',
    droplist: 'province_abv'
  },
  function(response) {
    $('#uni_province_abv').append(response);
  });

/**
 * This function makes a GET request to the backend
 * server and receives table rows that contain data
 * on each selected university. It also hides
 * irrelvant tables from view. Finally, it loads
 * the courses offered by the selected University.
 */
function fetchUniInfo() {
  // delete old data to prevent duplications
  $('#uni_profile').empty();
  $('#uni_courses').empty();
  // clear unrelated info and selections
  $('#uni_province_abv').val('-');
  $('#uni_prov_table').hide();
  $('#unis_by_eq_table').hide();
  $('#uni_detailed_tables').show();
  $('#uni_offers_eq').prop('checked', false);
  // make GET request
  $.get('../controllers/search.php',
  {
    entity: 'university',
    uni_name: $( '#uni_name' ).val()
  },
  function(response) {
    $('#uni_profile').append(response);
  });
  // load the selected University's course
  fetchCourseInfo();
}

/**
 * This function makes a GET request to the
 * the backend server and receives table rows 
 * containing course info offered by the selected
 * university.
 */
function fetchCourseInfo() {
  // make a GET request
  $.get('../controllers/search.php',
  { 
    entity: 'ocs_course',
    uni_name: $( '#uni_name' ).val()
  },
  function(response) {
    $('#uni_courses').append(response);
  });
}

/**
 * This function makes a GET request to the backend server
 * and retrieves table rows that contain university info
 * based on the selected province.
 */
function fetchUniList() {
  // clear unrelated info
  $('#uni_name').val('-');
  $('#uni_detailed_tables').hide();
  $('#unis_by_eq_table').hide();
  $('#uni_offers_eq').prop('checked', false);
  // show uni list and clear old data
  $('#uni_prov_table').show();
  $( '#uni_prov_tbody' ).empty();
  $.get('../controllers/search.php',
  { 
    entity: 'university',
    prov: $('#uni_province_abv').val()
  },
  function(response) {
    $('#uni_prov_tbody').append(response);
  });
}

/**
 * This function makes a GET request to the backend server
 * and retrieves a list of Universities depending on the
 * whether the user wants Universities offering Equivalent
 * courses. 
 */
function listUnisByEq() {
  // hide other uni divs and clear selection
  $('#uni_name').val('-');
  $('#uni_province_abv').val('-');
  $('#uni_prov_table').hide();
  $('#uni_detailed_tables').hide();
  // clear old data
  $('#unis_by_eq').empty();
  // unhide the relevant table
  $('#unis_by_eq_table').show();
  // make a GET request
  $.get('../controllers/search.php',
  { 
    entity: 'university',
    by_eq: $('#uni_offers_eq').is(':checked')
  },
  function(response) {
    $('#unis_by_eq').append(response);
  });
}

/**
 * This function makes a GET request to the backend server
 * and retrieves a list of options for the select element
 * with `id=eq_wcs_dropbox` and appends them to it. The options
 * are Western courses that have equivalent courses. 
 */
function resetWCSlist() {
  // clear old data
  $('#eq_wcs_dropbox').empty();
  $('#eq_wcs_dropbox').append('<option value="">-</option>');
  $.get('../controllers/search.php',
  { 
    entity: 'eq',
    dropbox: 'wcs'
  },
  function(response) {
    $('#eq_wcs_dropbox').append(response);
  });
}


/**
 * This function makes a GET request to the backend server
 * and retrieves a list of table rows containing equivalent courses to
 * a Western course selected by the user. It also hides irrelevant tables.
 */
function eq_ocs_by_wcs() {
  // hide courses by date
  $('#eq_ocs_by_date_table').hide();
  // clear current table and show it
  $('#eq_ocs_by_wcs_table').show();
  $('#eq_ocs_by_wcs').empty();
  // make GET request
  $.get('../controllers/search.php',
  {
    entity: 'eq',
    by: 'wcs',
    wcs: $('#eq_wcs_dropbox').val()
  },
  function(response) {
    $('#eq_ocs_by_wcs').append(response);
  });
}
/**
 * This function makes a GET request to the backend server
 * and retrieves a list of courses made equivalent on or 
 * before a date that the user picks. 
 */
function eq_ocs_by_date() {
  // hide courses by wcs and clear selection
  $('#eq_ocs_by_wcs_table').hide();
  $('#eq_wcs_dropbox').val('-');
  // clear current table and show it
  $('#eq_ocs_by_date_table').show();
  $('#eq_ocs_by_date').empty();
  // make a GET request
  $.get('../controllers/search.php',
  {
    entity: 'eq',
    by: 'date',
    date: $('#approval_date').val()
  },
  function(response) {
    $('#eq_ocs_by_date').append(response);
  });
}