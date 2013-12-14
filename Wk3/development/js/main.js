/*  
	Tempis Grabbit
	Author: Laura McCool
*/

(function($){
	
	/*
	===============================================
	=========================== APPLICATION GLOBALS	
	*/
	
	var win = $(window),
		body = $(document.body),
		container = $('#container'),	// the only element in index.html
		currentUser = {}
	;
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	var loadApp = function(){};
	
	
	var loadLanding = function(){
		$.get('templates/landing.html', function(html){
			var h = $(html);
			var landingCode = h.find('#template_landing').html();
			$.template('landing', landingCode);		// compile template
			$.render(currentUser, 'landing');		// use template
			container.html(landingCode);
		});
	};
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	win.on('submit', '#user-reg-form', function(){
		
		return false;
	});
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
	
	//check Login

var checkLogin = function(){
	$.ajax({
		url:'xhr/check_login.php',
		type: 'get',
		dataType: 'json',
		success: function(r){
			if(r.user){
				loadApp();
			}else{
				loadLanding();
				$('input, textarea').placeholder();
			};
		}
	});
};

//login logout
$.ajax({
	url: 'xhr/login.php',
	data: {
		username: user,
		password: pass
	},
	type: 'post',
	dataType: 'json',
	success: function(response){
		if(response.error){
			showLoginError();
		}else{
			loadApp();
		}
	}
		return false;
});

win.on('click','#btn-lout', function(){
	$.get('xhr/logout.php', function(){
		loadLanding();
	})
	return false;
});

})(jQuery); // end private scope




