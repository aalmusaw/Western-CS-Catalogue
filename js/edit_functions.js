$('td[contenteditable=true]').blur(function () {
  console.log('blur on td fires!')
  let id = $(this).parent('tbody').attr('id');
  if (id === 'wcs_table') {
    let row = $(this).parent().children().map(x => x.value);
    $.post('../models/search.php',
    {edit:true,
    table:'western_cs',
    course_code:row[0],
    course_name:row[1],
    weight:row[2],
    suffix:row[3]
    }
    , function(response) {
      if (response === 'true') {
        alert("Update Successful!");
      }
      else {
        alert("Update Failed :(");
      }
    });
  }
});

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
    $('#wcs_course').show();
    $('#university').hide();
    $('#eq').hide();
}

function onSelectUniversity() {
    // hide divs for other searches
    $('#university').show();
    $('#wcs_course').hide();
    $('#eq').hide();

    // load uni choices
    resetUniNames();
    resetUniProv();
    listUnisByEq();
}

function onSelectEq() {
    // hide divs for other searches
    $('#eq').show();
    $('#wcs_course').hide()
    $('#university').hide();
    resetWCSlist();
}

function resetWesternCSTable() {
    $( '#wcs_table' ).empty()
    $.ajax({
        url: '../models/search.php',
        type: 'get',
        data: { 
          edit:"true",
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
  // clear unrelated info and selections
  document.getElementById('uni_province_abv').value = '-';
  $('#uni_prov_table').hide();
  $('#unis_by_eq_table').hide();
  $('#uni_detailed_tables').show();
  $('#uni_offers_eq').prop('checked', false);

  
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
  // clear unrelated info
  document.getElementById('uni_name').value = '-';
  clearUniInfo();
  $('#unis_by_eq_table').hide();
  $('#uni_offers_eq').prop('checked', false);


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

function resetWCSlist() {
  $('#eq_wcs_dropbox').empty();
  $('#eq_wcs_dropbox').append('<option value="">-</option>');
  $.ajax({
    url: '../models/search.php',
    type: 'get',
    data: { 
      entity: 'eq',
      dropbox: 'wcs'
    },
    success: function(response) {
        let $eq_wcs_dropbox_select = $( '#eq_wcs_dropbox' ), 
        str = response, 
        html = jQuery.parseHTML( str ), 
        nodeNames = []; 
         
      $eq_wcs_dropbox_select.append( html );
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });

}

function eq_ocs_by_wcs() {
  // hide courses by date
  $('#eq_ocs_by_date_table').hide();
  // clear current table and show it
  $('#eq_ocs_by_wcs_table').show();
  $('#eq_ocs_by_wcs').empty();
  $.ajax({
    url: '../models/search.php',
    type: 'get',
    data: {
      entity: 'eq',
      by: 'wcs',
      wcs: $('#eq_wcs_dropbox').val()
    },
    success: function(response) {
      let eq_ocs_by_wcs_select = $('#eq_ocs_by_wcs'),
      str = response,
      html = jQuery.parseHTML(str),
      nodeNames = [];

      eq_ocs_by_wcs_select.append(html);
    },
    error: function(xhr) {
      // to do
    }
  }

  );

}

function eq_ocs_by_date() {
  // hide courses by wcs and clear selection
  $('#eq_ocs_by_wcs_table').hide();
  $('#eq_wcs_dropbox').val('-');
  // clear current table and show it
  $('#eq_ocs_by_date_table').show();
  $('#eq_ocs_by_date').empty();



  $.ajax({
    url: '../models/search.php',
    type: 'get',
    data: {
      entity: 'eq',
      by: 'date',
      date: $('#approval_date').val()
    },
    success: function(response) {
      let eq_ocs_by_date_select = $('#eq_ocs_by_date'),
      str = response,
      html = jQuery.parseHTML(str),
      nodeNames = [];

      eq_ocs_by_date_select.append(html);
    },
    error: function(xhr) {
      // to do
    }
  }

  );

}