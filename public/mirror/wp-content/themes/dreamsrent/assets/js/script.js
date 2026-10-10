/*
Author       : Dreamguys
Template Name: Dreams Rent - Bootstrap Template
Version      : 1.0
*/


(function($) {
	"use strict";
	
	var $slimScrolls = $('.slimscroll');
	var $wrapper = $('.main-wrapper');
	

	// Sticky Header
	$(window).scroll(function(){
		var sticky = $('.header'),
			scroll = $(window).scrollTop();
		if (scroll >= 50) sticky.addClass('fixed');
		else sticky.removeClass('fixed');
	  });
	  

	 
	// Sidebar
	
	// if($(window).width() <= 991) {
	// 	var Sidemenu = function() {
	// 		this.$menuItem = $('.main-nav a');
	// 	};

	// 	function init() {
	// 		var $this = Sidemenu;
	// 		$('.main-nav a').on('click', function(e) {
	// 			if($(this).parent().hasClass('has-submenu')) {
	// 				e.preventDefault();
	// 			}
	// 			if(!$(this).hasClass('submenu')) {
	// 				$('ul', $(this).parents('ul:first')).slideUp(350);
	// 				$('a', $(this).parents('ul:first')).removeClass('submenu');
	// 				$(this).next('ul').slideDown(350);
	// 				$(this).addClass('submenu');
	// 			} else if($(this).hasClass('submenu')) {
	// 				$(this).removeClass('submenu');
	// 				$(this).next('ul').slideUp(350);
	// 			}
	// 		});
	// 	}

	// // Sidebar Initiate
	
	// init();
	// }
 

	$(document).ready(function() {
		function initMenu() {
			if($(window).width() <= 991) {
				$('.main-nav a').off('click'); // Remove any existing click event handler
				$('.main-nav a').on('click', function(e) {
					if($(this).parent().hasClass('has-submenu')) {
						e.preventDefault();
					}
					if(!$(this).hasClass('submenu')) {
						$('ul', $(this).parents('ul:first')).slideUp(350);
						$('a', $(this).parents('ul:first')).removeClass('submenu');
						$(this).next('ul').slideDown(350);
						$(this).addClass('submenu');
					} else if($(this).hasClass('submenu')) {
						$(this).removeClass('submenu');
						$(this).next('ul').slideUp(350);
					}
				});
			} else {
				// Remove the click event for mobile or smaller screens
				$('.main-nav a').off('click');
			}
		}
	
		// Initialize menu on page load
		initMenu();
	
		// Re-initialize menu on window resize
		$(window).resize(function() {
			initMenu();
		});
	});

	

	// Mobile menu sidebar overlay
	
	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function() {
		$('main-wrapper').toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		$('html .main-menu-wrapper .collapse').addClass('show');
		return false;
	});	
	
	$(document).on('click', '.sidebar-overlay', function() {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
		$('html .main-menu-wrapper .collapse').removeClass('show');
	});
	
	$(document).on('click', '#menu_close', function() {
		$('html').removeClass('menu-opened');
		$('.sidebar-overlay').removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
		$('html .main-menu-wrapper .collapse').removeClass('show');
	});

	// Select 2
	
	if ($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}
	
	if ($('.category-select').length > 0) {
		$(".category-select").select2({
			placeholder: "Choose Category",
			allowClear: false
		});
	}
	
	if ($('.loc-select').length > 0) {
		$(".loc-select").select2({
			placeholder: "Choose Location",
			allowClear: false
		});
	}
	
	if ($('.region select').length > 0) {
		$(".region select").select2({
			placeholder: "Region",
			allowClear: false
		});
	}
		
	// Fade in Scroll 
	
	if($('.main-wrapper .aos').length>0){
		AOS.init({
			duration:1200,
			once:true
		});
	}
	
	// Datepicker	

	if($('.datetimepicker').length > 0 ){
		$('.datetimepicker').datetimepicker({
			format: 'DD-MM-YYYY',
			icons: {
				up: "fas fa-angle-up",
				down: "fas fa-angle-down",
				next: 'fas fa-angle-right',
				previous: 'fas fa-angle-left'
			},
			minDate:new Date()

		});
	}
	$(function () {
		$('#datetimepicker1').datetimepicker();
	});
	if ($('.dsrent_datetimepicker').length > 0) {
		$('.dsrent_datetimepicker').datetimepicker({
			
			showClose:true,
			
			format: 'DD-MM-YYYY',
			 // Use the desired format for both date and time
			icons: {
				up: "fas fa-angle-up",
				down: "fas fa-angle-down",
				next: 'fas fa-angle-right',
				previous: 'fas fa-angle-left'
			},
			
		});
		
	}
	
	

/*** Booking Form Functions****/
    jQuery(document).ready(function ($) {

		/**Start Date */
        // Initialize date picker
        $('#startdatePicker').datetimepicker({
            format: 'DD-MM-YYYY',

        });

		var hourFormat = window.hourFormat;
        var timeFormat = (hourFormat === '12') ? 'hh:mm A' : 'HH:mm';
		var minuteStepping = (hourFormat === '12') ? 10 : 60;

        // Initialize time picker
        $('#starttimePicker').datetimepicker({
            format: timeFormat,
			stepping: minuteStepping,

        });

        // Combine date and time and set the result to the output input
        $('#startdatePicker, #starttimePicker').on('dp.change', function () {
            var datestart = $('#startdatePicker').val();
            var timestart = $('#starttimePicker').val();
            var combinedDateTime_start = datestart + ' ' + timestart;
            $('#outputDateTime_start').val(combinedDateTime_start);
        });

		/**End Date */
        $('#enddatePicker').datetimepicker({
            format: 'DD-MM-YYYY',
        });

        // Initialize time picker
        $('#endtimePicker').datetimepicker({
            format: timeFormat,
        });

        // Combine date and time and set the result to the output input
        $('#enddatePicker, #endtimePicker').on('dp.change', function () {
            var dateend = $('#enddatePicker').val();
            var timeend = $('#endtimePicker').val();
            var combinedDateTime_end = dateend + ' ' + timeend;
            $('#outputDateTime_end').val(combinedDateTime_end);
        });
		
    });

/*** Booking Form Functions****/

	
	
	

	if($('.dsrent_timepicker').length > 0 ){
		$('.dsrent_timepicker').datetimepicker({
			format: timeFormat,
			icons: {
				up: "fas fa-angle-up",
				down: "fas fa-angle-down",
				next: 'fas fa-angle-right',
				previous: 'fas fa-angle-left'
			}
		});
	}
 

	// Timepicker
	var hourFormat = window.hourFormat;
	var timeFormat = (hourFormat === '12') ? 'hh:mm A' : 'HH:mm';
	var minuteStepping = (hourFormat === '12') ? 10 : 60;
	if($('.timepicker').length > 0) {
		$('.timepicker').datetimepicker({
			format: timeFormat,
			stepping: minuteStepping,
			
			icons: {
				up: "fa fa-angle-up",
				down: "fa fa-angle-down",
				next: 'fa fa-angle-right',
				previous: 'fa fa-angle-left'
			}
		});
	}

	
	// Scroll Down
	
	$('.price-down').on('click', function() {
		$('html, body').animate({ scrollTop: $("#price").offset().top - 85}, 150); 
	});
	
	//Stick Sidebar
	
	if ($(window).width() > 767) {
		if($('.theiaStickySidebar').length > 0) {
			$('.theiaStickySidebar').theiaStickySidebar({
			  // Settings
			  additionalMarginTop: 30
			});
		}
	}
	

	
	//Show Filter
	
	$(".btn.filterbtn").on('click', function() {
		  $(".showfilter").toggleClass("filter-open");
	});		
	
	// Password Eye

	$('.toggle-password').on('click', function() {
		$(this).toggleClass("feather-eye");
		var input = $(".pass-input");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});	

		$('.toggle-password-two').on('click', function() {
		$(this).toggleClass("feather-eye");
		var input = $(".pass-input-two");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});	
	
	// Most Popular Cartypes Slider

	if($('.popular-cartype-slider').length > 0) {
		$('.popular-cartype-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:true,
			dots: false,
			// rtl: true,
			autoplay:true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-arrow-left'></i>","<i class='fa-solid fa-arrow-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:1
				},
				700:{
					items:3
				},
				1000:{
					items:4
				},
				1200:{
					items:5
				}
			}
		})
	}

	// Recommended Car Rental Deals
	
	if($('.rental-deal-slider').length > 0) {
		$('.rental-deal-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:true,
			dots: false,
			autoplay:true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-arrow-left'></i>","<i class='fa-solid fa-arrow-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:1
				},
				700:{
					items:2
				},
				1000:{
					items:3
				}
			}
		})
	}

	//What People Say Slider
	
	if($('.about-testimonials').length > 0) {
		$('.about-testimonials').owlCarousel({
			loop:true,
			margin:24,
			nav:false,
			dots: true,
			// autoplay:true,
			// smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:1
				},
				700:{
					items:2
				},
				1000:{
					items:2
				}
			}
		})
	}

	// Slick Testimonial Two

	if ($('.detail-bigimg').length > 0) {
		$('.detail-bigimg').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: true,
			asNavFor: '.slider-nav-thumbnails'
		});
	}

	if ($('.slider-nav-thumbnails').length > 0) {
		$('.slider-nav-thumbnails').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.detail-bigimg',
			dots: false,
			arrows: false,
			centerMode: false,
			focusOnSelect: true

		});
	}	

	if($('.car-details-slider').length > 0 ){
		$('.car-details-slider').owlCarousel({
			items:4,
			margin:24,
			nav:true,
			dots:false,
			// rtl: true,
			navText : ["<i class='fa-solid fa-arrow-left'></i>","<i class='fa-solid fa-arrow-right'></i>"],
			responsiveClass:true,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				1170:{
					items:3,
					loop:true
				},
				1200:{
					items:3,
					loop:true
				}
			}
		});	
	}

	// Select Favourite
	
	$('.fav-icon').on('click', function() {
		$(this).toggleClass('selected');
	});

	// JQuery counterUp

	jQuery(document).ready(function( $ ) {

	if($('.customer-count .counterUp').length > 0) {
		$('.customer-count .counterUp, h4 span').counterUp({
            delay: 15,
            time: 1500
        });
	}
});

	
	

		// Chat

		var chatAppTarget = $('.chat-window');
		(function () {
			if ($(window).width() > 991)
				chatAppTarget.removeClass('chat-slide');
	
			$(document).on("click", ".chat-window .chat-users-list a.open-chat", function () {
				if ($(window).width() <= 991) {
					chatAppTarget.addClass('chat-slide');
				}
				return false;
			});
			$(document).on("click", "#back_user_list", function () {
				if ($(window).width() <= 991) {
					chatAppTarget.removeClass('chat-slide');
				}
				return false;
			});
		})();

		

		// wishlist function
		jQuery(document).ready(function ($) {
			$('.wishlist-button').on('click', function () {
				var button = jQuery(this);
				var productId = button.data('product-id');
 		
				var isWishlistAdded = button.text().trim() === 'Remove Wishlist';
		
				jQuery.ajax({
					type: 'POST',
					url: ajax_object.ajax_url,
					data: {
						action: 'dreams_toggle_wishlist_callback',
						product_id: productId,
						is_wishlist_added: isWishlistAdded,
					},

					success: function (response) {
						if (response) {
							button.text(isWishlistAdded ? 'Add to Wishlist' : 'Remove Wishlist');
							location.reload();
 						} else {
 							 
						}
					},
				});
			});
		});
		

	 
			$('#confirm_password').keyup(function() {
				var password = $('#password').val();
				var confirm_password = $(this).val();
		
				if (password !== confirm_password) {
					$('#password_match_error').text('Passwords do not match.');
				} else {
					$('#password_match_error').text('');
				}
			});
	 
		

			 // Datatable

			 if ($('.datatable').length > 0) {
				$('.datatable').DataTable({
					retrieve: true,
					lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
					language: {
						search: ' ',
						searchPlaceholder: "Search",
						info:  "Showing _START_ - _END_ of _TOTAL_ entries",
						"lengthMenu": "_MENU_",
						paginate: {
						  next: 'Next <i class="feather-arrow-right"></i>',
						  previous: '<i class="feather-arrow-left"></i> Prev'  
						}
					},
					"bLengthChange": true,
					"bInfo": false,
					"ordering": false,
					initComplete: (settings, json)=>{
						$('.dataTables_info').appendTo('#tableinfo');
						$('.dataTables_paginate').appendTo('#tablepage');
						$('.dataTables_length').appendTo('#tablelength');
						$('.dataTables_filter').appendTo('#tablefilter');
					},
				});
			} 


			jQuery(document).ready(function($) {
				$('#rental-type-select').on('change', function() {
					var rentalType = $(this).val();
					var postId = $(this).data('post-id');  // Get post ID from data-post-id
			
					// Send AJAX request with rental type and post ID
					$.ajax({
						url: ajax_object.ajax_url,  // Use the localized ajax_url here
						type: 'POST',
						data: {
							action: 'get_rental_price',  // Action defined for the AJAX call
							rental_type: rentalType,
							post_id: postId  // Send the post ID
						},
						success: function(response) {
							// Display the price in the #rental-type-price span
							$('#rental-type-price').html(response);
						}
					});
				});
			});
			
 		//GDPR
		 function setCookie(name, value, days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			const expires = "expires=" + date.toUTCString();
			document.cookie = name + "=" + value + ";" + expires + ";path=/";
		}

		function getCookie(name) {
			const nameEQ = name + "=";
			const cookiesArray = document.cookie.split(';');
			for (let i = 0; i < cookiesArray.length; i++) {
				let cookie = cookiesArray[i].trim();
				if (cookie.indexOf(nameEQ) === 0) {
					return cookie.substring(nameEQ.length);
				}
			}
			return null;
		}

		function checkCookie(name) {
			const cookieValue = getCookie(name);
			return cookieValue !== null;
		}

		document.addEventListener('DOMContentLoaded', function () {
			// Check if the 'gdprConsent' cookie exists; if not, show the GDPR bar
			if (!checkCookie('gdprConsent')) {
				document.getElementById('gdpr-bar').style.display = 'block';
			}
		
			// When the 'Accept' button is clicked
			document.getElementById('gdpr-accept-btn').addEventListener('click', function () {
				document.getElementById('gdpr-bar').style.display = 'none';
				setCookie('gdprConsent', 'true', 365);
				setCookie('consentNecessary', 'true', 365);
				setCookie('consentAnalytics', 'true', 365);
				setCookie('consentMarketing', 'true', 365);
				setCookie('preferredLanguage', 'en_US', 365);
			});
		
			// When the 'Cancel' button is clicked
			document.getElementById('gdpr-cancel-btn').addEventListener('click', function () {
				document.getElementById('gdpr-bar').style.display = 'none';
				setCookie('gdprConsent', 'false', 365);
				setCookie('consentNecessary', 'true', 365);
				setCookie('consentAnalytics', 'false', 365);
				setCookie('consentMarketing', 'false', 365);
				setCookie('preferredLanguage', 'en_US', 365);
			});
		});
		
		// Helper function to set cookies
		function setCookie(name, value, days) {
			const d = new Date();
			d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
			const expires = "expires=" + d.toUTCString();
			document.cookie = name + "=" + value + ";" + expires + ";path=/";
		}
		
		// Helper function to check if a cookie exists
		function checkCookie(name) {
			const nameEQ = name + "=";
			const cookiesArray = document.cookie.split(';');
			for (let i = 0; i < cookiesArray.length; i++) {
				let cookie = cookiesArray[i].trim();
				if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
			}
			return null;
		}
		

			
 		
})(jQuery);