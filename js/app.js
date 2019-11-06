"use strict";

/* SOME CONSTANTS */
//var endpoint01 = "http://ec2-3-15-38-21.us-east-2.compute.amazonaws.com";
var endpoint01 = "http://13.59.4.251:8222";
localStorage.usertoken = 0;
localStorage.lastnavlink = '';

//user variable declarations
var username;
var password;
var firstname;
var lastname;
var phonenumber;
var creditrating;
var income;

/* SUPPORTING FUNCTIONS */
var logoutController = function(){
localStorage.usertoken = 0;
username = "";
password = "";
firstname = "";
lastname = "";
phonenumber = "";
creditscore = "";
income = "";

$('.secured').removeClass('unlocked');
$('.secured').addClass('locked');

$("#renterid").val(" ");

$(".content-wrapper").hide();
$("#div-welcome").show();
};


var navigationControl = function(the_link){

	/* manage the content that is displayed */
	var idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

	console.log(idToShow);

	if (idToShow == '#div-login' ){
		/* what happens if the login/logout link is clicked? */
		localStorage.usertoken = 0;
		$(".secured").addClass("locked");
		$(".secured").removeClass("unlocked");
	}

	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

}; /* end navigation control */


var loginController = function(){
	//go get the data off the login form
	

	var the_serialized_data = $('#form-login').serialize();
	var urltext = endpoint01 + '/renter';
	$.ajax({
		url: urltext,
		data: the_serialized_data,
		type: 'GET',
		success: function(result){
			console.log(result);
			$('#login_message').html('');
			$('#login_message').hide();
			localStorage.usertoken = result['renterid']; //login succeeded.  Set usertoken.
			username = result['username'];
			password = result['password'];
			firstname = result['firstname'];
			lastname = result['lastname'];
			phonenumber = result['phone'];
			creditrating = result['creditrating'];
			income = result['income'];

			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#renterid').val(localStorage.usertoken);

			$('#div-login').hide();
			$('#div-dashboard').show();
		
		},
		error: function(result){
			console.log(result);
			localStorage.usertoken = 0; // login failed.  Set usertoken to it's initial value.
			$('#login_message').html(result['responseJSON']);
			$('#login_message').show();
		}
	});

	//scroll to top of page
	$("html, body").animate({ scrollTop: "0px" });
};

var accountCreate = function(){
	var the_serialized_data = $('#form-signup').serialize();
	var urltext = endpoint01 + '/renter';

	$.ajax({
		url: urltext,
		data: the_serialized_data,
		type: 'POST',
		success: function(result){
			console.log(result);
			$('#signup_message').html('');
			$('#signup_message').hide();
			
			localStorage.usertoken = result['renterid']; //login succeeded.  Set usertoken.
			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#renterid').val(localStorage.usertoken);

			$(".content-wrapper").hide();
			$("#div-signupconfirm").show();
		},
		error: function(result){
			console.log(result);
			$('#signup_message').html(result['responseJSON']);
			$('#signup_message').show();
		}

	});
};

var profileUpdate = function(){
	console.log(username);
	//$('#updateusername').val(username);
	/*
password = "";
firstname = "";
lastname = "";
phonenumber = "";
creditscore = "";
income = "";
*/

	var the_serialized_data = $('#form-update').serialize();
	var urltext = endpoint01 + '/renter';
	var updateData= 'renterid=' + localStorage.usertoken + '&' + the_serialized_data;
	console.log(updateData);

	$.ajax({
		url: urltext,
		data: updateData,
		type: 'PUT',
		success: function(result){
			console.log(result);
			$('#update_message').html('');
			$('#update_message').hide();

			$("#form-update").hide();
			$('#div-updatesuccess').show();

		},
		error: function(result){
			console.log(result);
			//$('#update_message').html(result['responseJSON']);
			$('#update_message').html('Server Error');
			$('#update_message').show();
		}
	});
}

//document ready section
$(document).ready(function (){

    /* ------------------  basic navigation ----------------*/

	/* lock all secured content */
	$('.secured').removeClass('unlocked');
	$('.secured').addClass('locked');


    /* this reveals the default page */
    $("#div-welcome").show();

    /* this controls navigation - show / hide pages as needed */

	/* what to do when a navigation link is clicked */
	$(".nav-link").click(function(){
		navigationControl(this);
	});
		
	/* what happens if the login button is clicked? */
	$('#btnLogin').click(function(){
		if ($('#username').val() == "" && $('#password').val() ==""){
			//alert("username blank");
			$('#login_message').html("Please enter a username and password");
				$('#login_message').show();
				return;
			}if ($('#username').val() == ""){
			//alert("username blank");
			$('#login_message').html("Please enter a username");
				$('#login_message').show();
				return;
		} if ($('#password').val() ==""){
			$('#login_message').html("Please enter a password");
				$('#login_message').show();
				return;
		} else {
		loginController();
		}
		
		//$(".content-wrapper").hide();
		//$("#div-dashboard").show();
	});

	// signup button click
	$('#btnSignup').click(function(){
		//hide all content-wrapper divs
		$(".content-wrapper").hide();
		//show next "page"
		$("#div-signup").show();
	});

	// signup2 button click
	$('#btnSignup2').click(function(){
		//hide all content-wrapper divs
		if ($('#signupusername').val() == "" && $('#signuppassword').val() ==""){
			//alert("username blank");
			$('#signup_message').html("Please enter a username and password");
				$('#signup_message').show();
				return;
		}if ($('#signupusername').val() == ""){
			//alert("username blank");
			$('#signup_message').html("Please enter a username");
				$('#signup_message').show();
				return;
		} if ($('#signuppassword').val() ==""){
			$('#signup_message').html("Please enter a password");
				$('#signup_message').show();
				return;
		} else {
		accountCreate();
		//$(".content-wrapper").hide();
		//show next "page"
		//$("#div-signupconfirm").show();
		}
	});

	// signin2 button click
	$('#btnSignin2').click(function(){
		//hide all content-wrapper divs
		$(".content-wrapper").hide();
		//show next "page"
		$("#div-login").show();
	});

	// signin button click
	$('#btnSignin').click(function(){
		//hide all content-wrapper divs
		$(".content-wrapper").hide();
		//show next "page"
		$("#div-login").show();
	});
	
	//propertysearch click
	$('#property-search').click(function(){
		//hide all content-wrapper divs
		$(".content-wrapper").hide();
		//show next "page"
		$("#div-propertysearch").show();
	});

	//search click
	$('#btnSearch').click(function(){
		if ($('#city').val()==""){
			$('#searchmessage').show();
		} else {
		$('#searchmessage').hide();
		//hide all content-wrapper divs
		//$(".content-wrapper").hide();
		//show next "page"
		$("#div-propertylist").show();
		}
	});

	//logout link
	$('#dashboard-logout').click(function(){
		//alert("logout clicked");
		logoutController();
	});

	//dashboard update
	$('#dashboard-update').click(function(){
		//hide all content-wrapper divs
		$(".content-wrapper").hide();
		//show next "page"
		$("#div-updateprofile").show();
		$("#div-updatesuccess").hide();
		$('#formupdate').show();

		$('#updateusername').val(username);
		$('#updatepassword').val(password);
		$('#updatefirstname').val(firstname);
		$('#updatelastname').val(lastname);
		$('#updatephonenumber').val(phonenumber);
		$('#updatecreditrating').val(creditrating);
		$('#updateincome').val(income);

	});
		
	//update button
	$('#btnUpdate').click(function(){
		profileUpdate();
	})

	//return to dashboard after successful update
	$('#btnDashboardReturn').click(function(){
		//hide all content-wrapper divs
		$(".content-wrapper").hide();
		//show next "page"
		$("#div-dashboard").show();
	})
}); /* end the document ready event*/
