/*** Booking Form Functions****/
jQuery(document).ready(function ($) {

    var hourFormat = window.hourFormat;
        var timeFormat = (hourFormat === '12') ? 'hh:mm A' : 'HH:mm';
        var minuteStepping = (hourFormat === '12') ? 10 : 60;


    /**Start Date */
    // Initialize date picker
    $('#startdatePicker').datetimepicker({
        format: 'DD-MM-YYYY',

    });

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

        // Set the end time picker value to be the same as the start time picker value
        var startTime = $('#starttimePicker').val();
        if ($('input[name="time-option"]:checked').val() === 'day') {
            $('#endtimePicker').val(startTime);

            // $('#endtimePicker').val($(this).val());
        }
        // $('#endtimePicker').val(startTime);
        hiddenEndTime.value = startTime;
    });

    /**End Date */
    $('#enddatePicker').datetimepicker({
        format: 'DD-MM-YYYY',
    });

    // Initialize time picker
    $('#endtimePicker').datetimepicker({
        format: timeFormat,
    });

    if ($('input[name="time-option"]:checked').val() === 'day') {
        $('#starttimePicker').on('dp.change', function () {
            var dateend = $('#enddatePicker').val();
            var timeend = $('#starttimePicker').val();
            var combinedDateTime_end = dateend + ' ' + timeend;
            $('#outputDateTime_end').val(combinedDateTime_end);
        });

    }
    else if ($('input[name="time-option"]:checked').val() === 'hour'){
    // Combine date and time and set the result to the output input
    $('#enddatePicker, #endtimePicker').on('dp.change', function () {
        var dateend = $('#enddatePicker').val();
        var timeend = $('#endtimePicker').val();
        var combinedDateTime_end = dateend + ' ' + timeend;
        $('#outputDateTime_end').val(combinedDateTime_end);
    });

}
    if ($('#startdatePicker').length > 0) {
        $('#startdatePicker').datetimepicker({
            format: 'DD-MM-YYYY',
            icons: {
                up: "fas fa-angle-up",
                down: "fas fa-angle-down",
                next: 'fas fa-angle-right',
                previous: 'fas fa-angle-left'
            },
            minDate: new Date()
        });

        // Update end date placeholder with start date
        // $('#enddatePicker').on('dp.change', function (e) {
        //     $('#enddatePicker').data("DateTimePicker").minDate(e.date);
        //     $('#enddatePicker').val(e.date.format('DD-MM-YYYY'));
        // });

        $('#enddatePicker').on('dp.show', function(e) {
            var startDate = $('#startdatePicker').val();
            $(this).data("DateTimePicker").minDate(startDate);
        });


        $('#starttimePicker').datetimepicker({
            timeFormat: timeFormat,
            interval: 30,
            stepping: minuteStepping,
            change: function(time) {
                // Update hidden input with selected time
                $('#hiddenStartTime').val($(this).val());
            }
        });

        $('#endtimePicker').datetimepicker({
            timeFormat: timeFormat,
            interval: 30,
            stepping: minuteStepping,
            change: function(time) {
                // Update hidden input with selected time
                $('#hiddenEndTime').val($(this).val());
            }
        });

        // Trigger change event on page load to set hidden inputs if there are default values
        $('#starttimePicker').trigger('change');
        $('#endtimePicker').trigger('change');

        // Disable the end time picker so that the user cannot modify its value
        $('#endtimePicker').prop('disabled', true);
    }

    if ($('#enddatePicker').length > 0) {
        $('#enddatePicker').datetimepicker({
            format: 'DD-MM-YYYY',
            icons: {
                up: "fas fa-angle-up",
                down: "fas fa-angle-down",
                next: 'fas fa-angle-right',
                previous: 'fas fa-angle-left'
            },
        });
    }
});

/*** Booking Form Functions****/

jQuery(document).ready(function($) {

    $('.dsrent_pickup_loc').on('change', function() {
        var selectedLocation = $(this).val();
        $('#dsrent_pickup_loc_hidden').val(selectedLocation);
    });

    $('.dsrent_pickoff_loc').on('change', function() {
        var selectedLocation2 = $(this).val();
        $('#dsrent_pickoff_loc_hidden').val(selectedLocation2);
    });

    jQuery(document).ready(function($) {
        $('input[name="time-option"]').on('change', function() {
          $('#startdatePicker').val('');
          $('#enddatePicker').val('');
          $('#starttimePicker').val('');
          $('#endtimePicker').val('');
        });
      });
});


/*** Booking form validation ***/
 
function validateForm() {
    // Reset error messages
    document.getElementById("pickup_loc_error").innerHTML = "";
    document.getElementById("dropoff_loc_error").innerHTML = "";
	document.getElementById("pickup_date_error").innerHTML = "";
    document.getElementById("pickup_time_error").innerHTML = "";
    document.getElementById("pickoff_date_error").innerHTML = "";
    document.getElementById("pickoff_time_error").innerHTML = "";
    document.getElementById("min_oneday").innerHTML = "";
    document.getElementById("time_error").innerHTML = "";


    // Get selected values
    var pickupLoc = document.getElementById("dsrent_pickup_loc").value;
    var dropoffLoc = document.getElementById("dsrent_pickoff_loc").value;
    var pickupDate = document.getElementById("startdatePicker").value;
    var dropoffDate = document.getElementById("enddatePicker").value;
    var pickupTime = document.getElementById("starttimePicker").value;
    var dropoffTime = document.getElementById("endtimePicker").value;
    var timeOption = document.querySelector('input[name="time-option"]:checked').value;

    var pickupTime = new Date('2000-01-01 ' + pickupTime);
    var dropoffTime = new Date('2000-01-01 ' + dropoffTime);

    var isValid = true;

    // if (pickupTime >= dropoffTime) {
    //     isValid = false;
    // }

    if (pickupLoc === "") {
        document.getElementById("pickup_loc_error").innerHTML = "* Please select a pickup location.";
        isValid = false;
    }

    if (dropoffLoc === "") {
        document.getElementById("dropoff_loc_error").innerHTML = "* Please select a dropoff location.";
        isValid = false;
    }

	if (pickupDate === "") {
            document.getElementById("pickup_date_error").innerHTML = "* Please select a pickup date.";
            isValid = false;
        }

        if (dropoffDate === "") {
            document.getElementById("pickoff_date_error").innerHTML = "* Please select a dropoff date.";
            isValid = false;
        }
        if (pickupTime === "") {
            document.getElementById("pickup_time_error").innerHTML = "* Please select a pickup time.";
            isValid = false;
        }

        if (dropoffTime === "") {
            document.getElementById("pickoff_time_error").innerHTML = "* Please select a dropoff time.";
            isValid = false;
        }

        // if (pickupDate == dropoffDate) {
        //     isValid = false;
        // }
       
        if (timeOption === 'day' && pickupDate === dropoffDate ) {
            document.getElementById('pickup_date_error').textContent = 'Pickup and Dropoff dates cannot be the same for day rental.';
            document.getElementById("min_oneday").innerHTML = "* Minimum rent one day.";

            if(pickupTime > dropoffTime){
            document.getElementById("time_error").innerHTML = "* Time should not be less than pickup time.";
            }

            isValid = false;
        } else if (timeOption === 'hour') {
            if(pickupDate === dropoffDate){
                if(pickupTime >= dropoffTime) {
                // document.getElementById('pickup_date_error').textContent = 'Pickup and Dropoff dates must be the same for hour rental.';
                document.getElementById("time_error").innerHTML = "* Time should not be same or less than pickup time.";
                isValid = false;
            } else if (pickupDate !== dropoffDate){
                isValid = true;

            }
            }
        } else {
            document.getElementById('pickup_date_error').textContent = '';
        }

    if (isValid) {
        return true; 
    } else {
        return false; 
    }
}

// for radio button
function handlePaymentType(type) {
    // Update the hidden field value based on the selected type
    document.getElementById('dsr_type_deposit_hidden').value = type;
}
    
// Enquiry Us

// document.addEventListener('DOMContentLoaded', function() {
//     const starttimePicker = document.getElementById('starttimePicker');
//     const endtimePicker = document.getElementById('endtimePicker');
//     const hiddenStartTime = document.getElementById('hiddenStartTime');
//     const hiddenEndTime = document.getElementById('hiddenEndTime');

//     starttimePicker.addEventListener('change', function() {
//         hiddenStartTime.value = starttimePicker.value;
//     });

//     endtimePicker.addEventListener('change', function() {
//         hiddenEndTime.value = endtimePicker.value;
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const starttimePicker = document.getElementById('starttimePicker');
    const endtimePicker = document.getElementById('endtimePicker');
    const hiddenStartTime = document.getElementById('hiddenStartTime');
    const hiddenEndTime = document.getElementById('hiddenEndTime');

    // console.log(starttimePicker, endtimePicker, hiddenStartTime, hiddenEndTime);

    if (starttimePicker && endtimePicker && hiddenStartTime && hiddenEndTime) {
        starttimePicker.addEventListener('change', function() {
            hiddenStartTime.value = starttimePicker.value;
        });

        endtimePicker.addEventListener('change', function() {
            hiddenEndTime.value = endtimePicker.value;
        });
    } 
});

function updateFormActionAndSubmit(form) {
    const startTime = document.getElementById('hiddenStartTime').value;
    const endTime = document.getElementById('hiddenEndTime').value;

    form.action = form.action.split('?')[0] + '?start_time=' + encodeURIComponent(startTime) + '&end_time=' + encodeURIComponent(endTime);
    return true; // Allow form submission
}


jQuery(document).ready(function($) {

    $('#endtimePicker').prop('disabled', true);

    $('input[name="time-option"]').on('change', function() {
        if ($(this).val() === 'day') {
            $('#endtimePicker').prop('disabled', true);
        } else if ($(this).val() === 'hour') {
            $('#endtimePicker').prop('disabled', false);
        }
    });

    $('#starttimePicker').on('change', function() {
        if ($('input[name="time-option"]:checked').val() === 'day') {
            
            // $('#endtimePicker').val($(this).val());
        }
    });
    
});


// var startTime = $('#starttimePicker').val();
// $('#endtimePicker').val(startTime);
// hiddenEndTime.value = startTime;

