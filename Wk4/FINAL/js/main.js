/*  
	Tempis Grabbit
	Author: Laura McCool
*/

(function($){
	console.log('run');

	var container = $('#wrapper');
	var loadLanding = function() {
		console.log('loadlanding');

		container.empty();

		$.get('templates/landing.html', function(html){
			var landingCode = $(html).find('#landing-temp').html();
			$.template('landing', landingCode);		 
			var landingTemp = $.render('', 'landing');		 
			container.append(landingTemp);

			$('#submit_login').on('click', function(e) {
				e.preventDefault();

				login();
			})
			$('#submit_signUp').on('click', function(e) {
				e.preventDefault();

				register();
			})
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

				if(response.user){
					loadApp();
				} else {
					loadLanding();
				}
			}
		});
	};

	var getProjects = function(){
		container.empty();
		console.log("Project")
		$.get('templates/app.html', function(html){

			var appCode = $(html).find('#app-header').html();
			$.template('appHeader', appCode);		 
			var appHeader = $.render('', 'appHeader');		 
			container.append(appHeader);

			$('#projects_nav').addClass("current");

			//logout button
			$('#logout-button').on('click', function(e){
				e.preventDefault();
				$.get('xhr/logout.php', function(){
					loadLanding();
				});
				return false;
			})
			$('#dash_nav').on('click', function(e) {
				e.preventDefault();
				loadApp();
			})
			$('.menuAccount').on('click', function(e) {
				e.preventDefault();
				getAccount();
			})
		});
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				console.log(response);
				$.get('templates/app.html', function(html){
					var projectCode = $(html).find('#project-temp').html();
					$.template('projTemp', projectCode);		 
					var projTemp = $.render('', 'projTemp');		 
					container.append(projTemp);

					$('#addProject').on('click', function(e) {
						e.preventDefault();
						addProject();
					})
					$('#removeProject').on('click', function(e) {
						e.preventDefault();
						$('.project').on('click', function(e) {
							removeProject();
						})
					})
					$('.project').on('click', function(e) {
						e.preventDefault();
						viewProject();
					})
				});
			}
		});
	}

	var addProject = function(){
		container.empty();
		console.log("add");
		$.get('templates/app.html', function(html){

			var appCode = $(html).find('#app-header').html();
			$.template('appHeader', appCode);		 
			var appHeader = $.render('', 'appHeader');		 
			container.append(appHeader);

			var projectCode = $(html).find('#project-add').html();
			$.template('addProj', projectCode);		 
			var projHeader = $.render('', 'addProj');		 
			container.append(projHeader);

			$( "#datepicker" ).datepicker({
						changeMonth: true,
						changeYear: true
					});

			$('#projects_nav').addClass("current");

			
			$('.closeEditA').on('click', function(e) {
				e.preventDefault();
				getProjects();
			})
			$('.projDate').on('click', function(e) {
				e.preventDefault();

			})
			$('#submitChanges').on('click', function(e) {
				e.preventDefault();
				newProject();
			})
		});
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				console.log(response);
				$.get('templates/app.html', function(html){
					var projectCode = $(html).find('#project-temp').html();
					$.template('projTemp', projectCode);		 
					var projTemp = $.render('', 'projTemp');		 
					container.append(projTemp);
				});
			}
		});
	}

	var getAccount = function(){
		container.empty();
		$.get('templates/app.html', function(html){
			var appCode = $(html).find('#app-header').html();
			$.template('appHeader', appCode);		 
			var appHeader = $.render('', 'appHeader');		 
			container.append(appHeader);

			var  accountCode = $(html).find('#account-info').html();
			$.template(' account',  accountCode);		 
			var  accountTemp = $.render('', ' account');		 
			container.append( accountTemp);

			//logout button
			$('#logout-button').on('click', function(e){
				e.preventDefault();
				$.get('xhr/logout.php', function(){
					loadLanding();
				});
				return false;
			})
			$('#projects_nav').on('click', function(e) {
				e.preventDefault();
				getProjects();
			})
			$('#dash_nav').on('click', function(e) {
				e.preventDefault();
				loadApp();
			})
			$('.menuProjects').on('click', function(e) {
				e.preventDefault();
				getProjects();
			})
			$('.editAccountInfo').on('click', function(e) {
				e.preventDefault();
				editAccount();
			})
		});
		
	}

	var loadApp = function(){

		container.empty();

		$.get('templates/app.html', function(html){
			var appCode = $(html).find('#app-header').html();
			$.template('appHeader', appCode);		 
			var appHeader = $.render('', 'appHeader');		 
			container.append(appHeader);

			var projectCode = $(html).find('#app-welcome').html();
			$.template('projectW', projectCode);		 
			var projTemp = $.render('', 'projectW');		 
			container.append(projTemp);


			$('#dash_nav').addClass("current");

			//logout button
			$('#logout-button').on('click', function(e){
				e.preventDefault();
				$.get('xhr/logout.php', function(){
					loadLanding();
				});
				return false;
			})
			$('#projects_nav').on('click', function(e) {
				e.preventDefault();
				getProjects();
			})
			$('.menuProjects').on('click', function(e) {
				e.preventDefault();
				getProjects();
			})
			$('.menuAccount').on('click', function(e) {
				e.preventDefault();
				getAccount();
			})
			$('.projectName').on('click', function(e) {
				e.preventDefault();
				getProjects();
			})
			$('.projLink').on('click', function(e) {
				e.preventDefault();
				getProjects();
		});

		});
	}

	var editAccount = function(){
		container.empty();
		$.get('templates/app.html', function(html){
			var appCode = $(html).find('#app-header').html();
			$.template('appHeader', appCode);		
			var appHeader = $.render('', 'appHeader');		 
			container.append(appHeader);

			var  accountCode = $(html).find('#account-info').html();
			$.template(' account',  accountCode);		 
			var  accountTemp = $.render('', ' account');		 
			container.append( accountTemp);

			var appCode = $(html).find('#account-info-edit').html();
			$.template('editAccount', appCode);		 
			var appHeader = $.render('', 'editAccount');		 
			container.append(appHeader);

			$('.closeEditA').on('click', function(e) {
					e.preventDefault();
					getAccount();
			})
			$('#submitChanges').on('click', function(e) {
					e.preventDefault();
					updateUser();
			})
		});
	}

	var login = function(){
		var user = $('#username').val();
		var pass = $('#password').val();

		$.ajax({
			url: 'xhr/login.php',
			data:{
				username: user,
				password: pass
				},
			type: 'post',
			dataType: 'json',
			success: function(response){
				
				if(response.error){
					console.log(response.error);
				} else {
					console.log(response.user);
					loadApp();

					e.preventDefault();
				}
			}
		});
	}
	var register = function(){
		var email = $('#email').val();
		var user = $('#uname').val();
		var pass = $('#pword').val();

		$.ajax({
			url: 'xhr/register.php',
			data:{
				email: email,
				username: user,
				password: pass
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					console.log(response.error);
				}else{
					console.log(response.user);
					loadApp();
					e.preventDefault();
				}
			}
		});
	}
	var updateUser = function(){
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var email = $('#email').val();

		$.ajax({
			url: 'xhr/update_user.php',
			data:{
				first_name: firstName,
				last_name: lastName,
				email: email
				},
			type: 'post',
			dataType: 'json',
			success: function(response){
				
				if(response.error){
					console.log(response.error);
				} else {
					console.log(response.user);
					getAccount();

					e.preventDefault();
				}
			}
		});
	}
	var newProject = function(){
		var name = $('#projectName').val();
		var descrip = $('#projectDescription').val();
		var status = $('#projectStatus').val();
		var dueDate = $('#projectDate').val();

		$.ajax({
			url: 'xhr/new_project.php',
			data:{
				projectName: name,
				projectDescription: descrip,
				status: status,
				dueDate: due
				},
			type: 'post',
			dataType: 'json',
			success: function(response){
				
				if(response.error){
					console.log(response.error);
				} else {
					console.log(response.user);
					getProjects();
					e.preventDefault();
				}
			}
		});
	}
	var init = function(){
		checkLoginState();
	}
	init();
});
