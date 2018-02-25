// get countdown minutes in format of "hh:mm:ss" from data attribute in html
var countdownTimerTimeHumanable  = document.getElementById('countdown').getAttribute('data-countdown-time');

// check if we have first visit time written to Cookies
if (!Cookies.get('first-visit-time')) {
    Cookies.set('first-visit-time', Date.now(), {expires: 30});
}

var firstVisitTime = Cookies.get('first-visit-time');
var countdownTimerTime = Date.parse('1970-01-01T' + countdownTimerTimeHumanable + 'Z');
var countdownDateTime = +firstVisitTime + +countdownTimerTime;

var targetHours = document.getElementById("hours");
var targetMinutes = document.getElementById("minutes");
var targetSeconds = document.getElementById("seconds");

function deleteButton() {
    document.getElementById('start-button').remove();
}

// Update the count down every 1 second
var counter = setInterval(function () {

    var now = Date.now();

    if (now <= countdownDateTime) {

    // Find the remaining milliseconds between now an the count down date
        var remainingMilliseconds = countdownDateTime - now;

    // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((remainingMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000);

    // Display the result in the elements, add "0" before the number if it less than "10"
        targetHours.innerHTML = hours > 9 ? hours : '0' + hours;
        targetMinutes.innerHTML = minutes > 9 ? minutes : '0' + minutes;
        targetSeconds.innerHTML = seconds > 9 ? seconds : '0' + seconds;

    // If the count down is finished, delete the button
        if (remainingMilliseconds < 0) {
            clearInterval(counter);
            deleteButton();
        }

    } else {

    // If the count down time is already passed, delete the button
        clearInterval(counter);
        deleteButton();
    }
}, 1000);
