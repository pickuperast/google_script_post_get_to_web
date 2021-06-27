const link = '_https://script.google.com/macros/s/AKfycbxFslsjR1CykRCyIglBIR_kDZeAwwHQDHh-JJz1/exec';
var last_employee_id = 0;
var last_employer_id = 0;
var employer_list = [];
var employee_list = [];
var employee_search_list = ['@notused@','@notused@','@notused@','@notused@','@notused@','@notused@','@notused@','@notused@','@notused@','@notused@','@notused@']
var employee_search_inputs = ['search_employee_name','search_employee_phone','search_employee_available','search_employee_living','search_employee_full_time','search_employee_part_time','search_employee_night','search_employee_car','search_employee_drivers_license','search_employee_english','search_employee_zk']

//localStorage.clear(); //flush local storage
get_last_ids()
update_server()

function DisableEnableEmployee(btn,id){
  if ($(btn).hasClass( "crossout1" )){
    $(btn).removeClass( "crossout1" ).addClass( "crossout0" );
    employee_search_list[id]= $('#'+employee_search_inputs[id]).val();
    $('#'+employee_search_inputs[id]).prop('disabled', false);
  }else{
    $(btn).removeClass( "crossout0" ).addClass( "crossout1" );
    employee_search_list[id]='@notused@';
    console.log(id+'='+employee_search_list[id]);
    $('#'+employee_search_inputs[id]).prop('disabled', true);
  }
  console.log(employee_search_list);
}

function YesNo(s) {
  if (s == 'Yes') {
    return 1;
  } else if (s == 'No') {
    return 0;
  } else if (s == 1) {
    return 'Yes';
  } else if (s == 0) {
    return 'No';
  }
}

function update_server() {
  showLocalStorageInfo();
  send_check_from_localStorage();
  get_last_ids()
  setTimeout(update_server, 10000);
}

//to local storage
function send_check_from_localStorage() {
  if (localStorage.length == 0) return;
  var id, data, sh, id_in_sheet, key;
  for (var i = localStorage.length - 1; i >= 0; i--) {
    key = localStorage.key(i);
    sh = key.substring(0, 1);
    id_in_sheet = key.substring(2, key.length);

    if ($.isNumeric(id_in_sheet)) {
      store_check_to_server(key);
    }
    showLocalStorageInfo();
  }

}

//from local storage to server
function store_check_to_server(key) {
  var link_local = localStorage.getItem(key) + ';' + key;
  console.log(link_local);

  $.getJSON(link_local.substring(1, link_local.length), function(data) {
    localStorage.removeItem(data);
    console.log('check # ' + data + ' succesfully stored to server');
  });
}

//get from db last ids
function get_last_ids() {
  var action = '?action=get_last_ids';
  $.getJSON(link.substring(1, link.length) + action, function(data) {
    var value = data.split(';');
    console.log(value);
    last_employer_id = parseInt(value[0]);
    last_employee_id = parseInt(value[1]);
  });
}

function send_employee_to_local_storage(btn) {
  btn.disabled = true;
  var action = '?action=add&sh=1';
  var d = '&params=';
  var txt = '';
  last_employee_id++;
  var check_id = '1_' + last_employee_id;
  for (var i = 0; i < 16; i++) {
    if ($('#employee_' + i).attr('type') === 'checkbox') {
      txt = +$('#employee_' + i).is(':checked');
    } else {
      txt = $('#employee_' + i).val();
    }
    if (i == 0) {
      d += txt;
    } else {
      d += ";" + txt;
    }
    $('#employee_' + i).val("");
  }
  var total_link = link + action + d;
  localStorage.removeItem(check_id);
  localStorage.setItem(check_id, total_link);
  console.log('last_employee_id: ' + last_employee_id + ';last_employer_id: ' + last_employer_id);
  btn.disabled = false;
}

function send_employee_to_local_storage_id(btn, id) {
  btn.disabled = true;
  var action = '?action=add&sh=1';
  var d = '&params=';
  var txt = '';
  var check_id = '1_' + id;
  for (var i = 0; i < 16; i++) {
    if ($('#employee_' + i).attr('type') === 'checkbox') {
      txt = +$('#employee_' + i).is(':checked');
    } else {
      txt = $('#employee_' + i).val();
    }
    if (i == 0) {
      d += txt;
    } else {
      d += ";" + txt;
    }
    $('#employee_' + i).val("");
  }
  var total_link = link + action + d + ";" + check_id;
  localStorage.removeItem(check_id);
  localStorage.setItem(check_id, total_link);
  console.log('last_employee_id: ' + last_employee_id + ';last_employer_id: ' + last_employer_id);
  console.log('store check #' + check_id + '/link: ' + total_link);
  btn.disabled = false;
}

function send_employer_to_local_storage(btn) {
  btn.disabled = true;
  var action = '?action=add&sh=2';
  var d = '&params=';
  var txt = '';
  last_employer_id++;
  var check_id = '2_' + last_employer_id;
  for (var i = 0; i < 17; i++) {
    if ($('#employer_' + i).attr('type') === 'checkbox') {
      txt = +$('#employer_' + i).is(':checked');
    } else {
      txt = $('#employer_' + i).val();
    }
    if (i == 0) {
      d += txt;
    } else {
      d += ";" + txt;
    }
    $('#employer_' + i).val("");
  }
  var total_link = link + action + d;
  localStorage.removeItem(check_id);
  localStorage.setItem(check_id, total_link);
  btn.disabled = false;
}

function send_employer_to_local_storage_id(btn, id) {
  btn.disabled = true;
  var action = '?action=add&sh=2';
  var d = '&params=';
  var txt = '';
  var check_id = '2_' + id;
  for (var i = 0; i < 17; i++) {
    if ($('#employer_' + i).attr('type') === 'checkbox') {
      txt = +$('#employer_' + i).is(':checked');
    } else {
      txt = $('#employer_' + i).val();
    }
    if (i == 0) {
      d += txt;
    } else {
      d += ";" + txt;
    }
    $('#employer_' + i).val("");
  }
  var total_link = link + action + d + ';' + check_id;
  localStorage.removeItem(check_id);
  localStorage.setItem(check_id, total_link);
  console.log('last_employee_id: ' + last_employee_id + '; last_employer_id: ' + last_employer_id);

  console.log('store check #' + check_id + '/link: ' + total_link);
  btn.disabled = false;
}

function showLocalStorageInfo() {
  var t = [];
  for (var i = 0; i < localStorage.length; i++) {
    t[i] = localStorage.key(i) + " :" + localStorage.getItem(localStorage.key(i));
  }
  //show remaining space
  var limit = 1024 * 1024 * 5; // 5 MB
  var remSpace = limit - unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
  //exit show remainig space
  console.log('RemainingSpace=' + remSpace + ' / localStorage: ' + t);
}

function search_employee() {
  /*
  var name = values[0];
    var phone = values[1];
    var available = values[2];
    var living = values[3];
    var full_time = values[4];
    var part_time = values[5];
    var night = values[6];
    var car = values[7];
    var drivers_license = values[8];
    var english = values[9];
    var zk = values[10];
  */
  var name = $('#search_employee_name').val();
  var phone = $('#search_employee_phone').val();
  var available = +$('#search_employee_available').is(':checked');
  var living = +$('#search_employee_living').is(':checked');
  var full_time = +$('#search_employee_full_time').is(':checked');
  var part_time = +$('#search_employee_part_time').is(':checked');
  var night = +$('#search_employee_night').is(':checked');
  var car = +$('#search_employee_car').is(':checked');
  var drivers_license = +$('#search_employee_drivers_license').is(':checked');
  var english = +$('#search_employee_english').is(':checked');
  var zk = +$('#search_employee_zk').is(':checked');
  var action = '?action=search&sh=1';
  var d = '&params=';
  jQuery.each( employee_search_list, function( i, val ) {
		if (i>1){
    	if (employee_search_list[i] != '@notused@') 				employee_search_list[i]=+$('#'+employee_search_inputs[i]).is(':checked');
      
    }else{
    	if ($('#'+employee_search_inputs[i]).val() != '' && employee_search_list[i] != '@notused@') 				employee_search_list[i]=$('#'+employee_search_inputs[i]).val();
    }
  	d += employee_search_list[i] + ';';
	});
  d = d.substring(0, d.length - 1);
  console.log('search link: ' + link + action + d);
  $.getJSON(link.substring(1, link.length) + action + d, function(data) {
    console.log('search result ' + data);
    if (data == 'not found') {
      $('#employee_search_table').remove();
      return;
    }
    create_employee_table(data);
  });
}

function search_employer() {
  var name = $('#search_employer_name').val();
  var phone = $('#search_employer_phone').val();
  var contract = +$('#search_employer_contract').is(':checked');
  var action = '?action=search&sh=2';
  var d = '&params=';
  d += name + ';' + phone + ';' + contract;
  console.log('search link: ' + link + action + d);
  $.getJSON(link.substring(1, link.length) + action + d, function(data) {
    console.log('search result ' + data);
    if (data == 'not found') {
      $('#employer_search_table').remove();
      return;
    }
    create_employer_table(data);
  });
}

function create_employer_table(data) {
  employer_list = data;
  $('#employer_search_table').remove();
  var table = $('<table>').attr('id', 'employer_search_table').attr('class', 'table-borders employers-color').appendTo($('#employers_search'));
  var thead = $('<thead>').appendTo(table);
  var tbody = $('<tbody>').appendTo(table);
  var tr = $('<tr>').attr('class', 'table-borders').appendTo(thead);
  var td, id, maxloop;
  for (var i = 0; i < data[0].length - 1; i++) {
    td = $('<td class="table-borders bold_center head-padding">' + data[0][i] + '</td>').appendTo(tr);
  }
  for (var r = 1; r < data.length; r++) {
    tr = $('<tr>').appendTo(tbody);
    maxloop = data[r].length - 1;
    for (var c = 0; c < data[r].length - 1; c++) {
      //header
      if (c == 0) {
        td = $('<td class="table-borders"><input type="text" readonly="readonly" class="bg-alpha input-clickable" onclick="show_employer_tab(' + data[r][maxloop] + ');" value="' + data[r][c] + '"></td>').attr('id', data[r][maxloop]).appendTo(tr);
      } else {
        //header end
        //other rows
        if (c > 7) {
          td = $('<td class="table-borders head-padding text-center">' + YesNo(data[r][c]) + '</td>').appendTo(tr);
        } else {
          td = $('<td class="table-borders head-padding text-center">' + data[r][c] + '</td>').appendTo(tr);
        }
      }
    }
  }
}

function create_employee_table(data) {
  employee_list = data;
  $('#employee_search_table').remove();
  var table = $('<table>').attr('id', 'employee_search_table').attr('class', 'table-borders employees-color').appendTo($('#employees_search'));
  var thead = $('<thead>').appendTo(table);
  var tbody = $('<tbody>').appendTo(table);
  var tr = $('<tr>').attr('class', 'table-borders').appendTo(thead);
  var td, id, maxloop;
  for (var i = 0; i < data[0].length - 1; i++) {
    td = $('<td class="table-borders  bold_center head-padding">' + data[0][i] + '</td>').appendTo(tr);
  }
  for (var r = 1; r < data.length; r++) {
    tr = $('<tr>').appendTo(tbody);
    maxloop = data[r].length - 1;
    for (var c = 0; c < maxloop; c++) {

      //header
      if (c == 0) {
        td = $('<td class="table-borders"><input type="text" readonly="readonly" class="bg-alpha input-clickable" onclick="show_employee_tab(' + data[r][maxloop] + ');" value="' + data[r][c] + '"></td>').attr('id', data[r][maxloop]).appendTo(tr);
      } else {
        //header end
        //other rows with data
        if (c >= 6 && c <= 14) { //Checkboxes
          td = $('<td class="table-borders head-padding text-center">' + YesNo(data[r][c]) + '</td>').appendTo(tr);
        } else {
          td = $('<td class="table-borders head-padding text-center">' + data[r][c] + '</td>').appendTo(tr);
        }
      }
    }
  }
}

function convert_date_to_proper(userDate) {
  var date = new Date(userDate);
  yr = date.getFullYear();
  month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
  day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  console.log(yr + month + day);
  newDate = yr + '-' + month + '-' + day;
  return newDate;
}

//employee,address,phone,age,in_the_usa,references,living,full_time,part_time,night,car,driver_lic,english,zk,available,reg_date
function show_employee_tab(id) {
  var data = [];
  for (var r = 0; r < employee_list.length; r++) {
    if (employee_list[r][16] == id) data = employee_list[r];
  }
  $("#employee_main").show();
  for (var i = 0; i < data.length - 1; i++) {
    if (i == 15) {
      $("#employee_" + i).val(convert_date_to_proper(data[i]));
    } else {
      if (data[i] == 'Yes') {
        $('#employee_' + i).prop("checked", true);
      } else if (data[i] == 'No') {
        $('#employee_' + i).prop("checked", false);
      }
      $("#employee_" + i).val(data[i]);
    }
  }
  $("#btn_employee_save").attr('onclick', 'send_employee_to_local_storage_id(this,' + data[data.length - 1] + ')');
  var sh_id = '1_' + data[data.length - 1];
  $("#btn_employee_delete").attr('onclick', 'delete_check(this,"' + sh_id + '")');
}

function show_employer_tab(id) {
  var data = [];
  console.log(employer_list);
  for (var r = 0; r < employer_list.length; r++) {
    if (employer_list[r][17] == id) data = employer_list[r];
  }
  $("#employer_main").show();
  /*    var contact_name = values[0];
  var contact_phone = values[1];
  var name = values[2];
  var address = values[3];
  var phone = values[4];
  var start_year = values[5];//mm/dd/yy
  var remarks = values[6];
  var contact = values[7];
  var living = values[8];
  var full_time = values[9];
  var part_time = values[10];
  var night = values[11];
  var car = values[12];
  var drivers_lic = values[13];
  var english = values[14];
  var zk = values[15];
  var contact_phone_second = values[16];
  var id = values[17]; .    */
  $('#employer_0').val(data[0]); //contact name
  $('#employer_1').val(data[1]); //contact phone
  $('#employer_2').val(data[3]); //name
  $('#employer_3').val(data[4]); //address
  $('#employer_4').val(data[5]); //phone
  $('#employer_5').val(convert_date_to_proper(data[6])); //start year
  $('#employer_6').val(data[7]); //remarks
  $('#employer_7').val(data[8]); //contract
  $('#employer_8').val(data[9]); //living
  $('#employer_9').val(data[10]); //full
  $('#employer_10').val(data[11]); //part
  $('#employer_11').val(data[12]); //night
  $('#employer_12').val(data[13]); //car
  $('#employer_13').val(data[14]); //drivers licence
  $('#employer_14').val(data[15]); //english
  $('#employer_15').val(data[16]); //zk
  $('#employer_16').val(data[2]); //contact phone 2

  for (var i = 7; i < 16; i++) {
    if (data[i + 1] == 'Yes') {
      $('#employer_' + i).prop("checked", true);
    } else if (data[i + 1] == 'No') {
      $('#employer_' + i).prop("checked", false);
    }
  }
  $("#btn_employer_save").attr('onclick', 'send_employer_to_local_storage_id(this,' + data[data.length - 1] + ')');
  $("#btn_employer_delete").attr('onclick', 'delete_check(this,"2_' + data[data.length - 1] + '")');
}

function delete_check(btn, id) {
  employer_list = [];
  $('#employer_search_table').remove();
  employee_list = [];
  $('#employee_search_table').remove();
  btn.disabled = true;
  var action = '?action=delete';
  var d = '&params=' + id;
  console.log('delete request: ' + link + action + d);
  $.getJSON(link.substring(1, link.length) + action + d, function(data) {
    console.log('delete result: ' + data);
    btn.disabled = false;
  });
}

function show_tab(id) { //0 - Employee, 1 - Employer, 2 - Search
  if (id == 0) {
    $("#employee_main").show();
    $("#btn_employee_save").attr('onclick', 'send_employee_to_local_storage(this);');
  } else if (id == 1) {
    $("#employer_main").show();
    $("#btn_employer_save").attr('onclick', 'send_employer_to_local_storage(this);');
  } else if (id == 2) {
    $("#about").show();
  }
}
