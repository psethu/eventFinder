$(function() {
	$("#f4").submit(doGet);
	$("#f3").submit(doDelete);
	$("#f2").submit(doPost);
	$("#f1").submit(doPut);
	} );

/* 
 * This is the basic form for an Ajax POST
 */
 
function doPost() {
	$.ajax({
			url: "requestPost",
			type: "post",
			data: {
				oldname: $("#oldname").val(),
				newname: $("#newname").val(),
				newlocation: $("#newlocation").val(),
				newtime: $("#newtime").val(),
				newdate: $("#newdate").val()

			},
			success: function(data) {
				$('#div2').html(data);
			}
	});
	return false;	
}

function doDelete() {
	$.ajax({
			url: "requestDelete",
			type: "delete",
			data: {
				name_1: $("#e3").val()
			},
			success: function(data) {
				$('#div3').html(data);
			}
	});
	return false;	
}	

/*
 * This is the basic form for an Ajax PUT. The only real difference
 * is the value of the type attribute.   Notice that instead of success
 * being defined within the object passed to $.ajax, this uses the alternative
 * form of defining success separately.
 */

function doPut() {
	var aj = $.ajax({
			url: "requestPut",
			type: "put",
			data: {
				input_1: [$("#e1").val(), $("#e1_2").val(),
					 $("#e1_3").val(), $("#e1_4").val()]
			},
	});

	aj.done(function(data) {
				$('#div1').html(data);
			});		
	return false;
}

function doGet() {
	$.ajax({
			url: "requestGet",
			type: "get",
			data: {
				name_1: $("#e4").val()
			},
			success: function(data) {
				console.log("is this happening?");
				console.log("\n");
				console.log("typeof(data): "+typeof(data));
				console.log(JSON.stringify(data));
				$('#div4').html(data);
			}
	});
	return false;	
}
