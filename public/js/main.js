$(document).ready(function(){

	document.cookie = "__cfduid=de73c7e08a3753ac6b2fc84a838098dd91524036568";

	console.log("Dom ready")
	// console.log(window.location.pathname)

	if(window.location.pathname === '/'){
		console.log("login")
		
		$('.login-form form').submit(function(e){
			e.preventDefault();

			let $email = $('.inputemail').val()
			let $pass = $('.inputpass').val()

			console.log(document.cookie)

			$.ajax({
				url: "/member",
				dataType: 'json',
				method: "POST",
				data: $.param({ 
					grant_type: "password", 
					client_id : "sikayetvar", 
					username: $email, 
					password: $pass
				}),
				xhrFields: {
				    withCredentials: true
				},
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				success: function (response) {
					console.log(response);
				},
				error: function () {
					console.log("error");
				}
			});
		})

		$(".reveal-pass img").click(function(){
			// console.log("reveal-pass")
			if($(".inputpass").hasClass("revealed")){
				$(".inputpass").get(0).type = 'password';
				$(".inputpass").removeClass("revealed");
			}else{
				$(".inputpass").addClass("revealed");
				$(".inputpass").get(0).type = 'text';
			}

		})

	} else if(window.location.pathname === '/logged'){
		console.log("logged in")
	}
})