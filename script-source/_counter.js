
// check if we have first visit time written to Cookies
if (!Cookies.get('first-visit-time')) {
    Cookies.set('first-visit-time', Date.now(), {expires: 30});
}

var firstVisitTime = Cookies.get('first-visit-time');
var countdownTimerTime = Date.parse('1970-01-01T' + document.getElementById('countdown').getAttribute('data-countdown-time') + 'Z');
var countdownDateTime = +firstVisitTime + +countdownTimerTime;

var targetHours = document.getElementById("hours");
var targetMinutes = document.getElementById("minutes");
var targetSeconds = document.getElementById("seconds");

var prevHour = 0;
var prevMinute = 0;
var prevSecond = 0;

if (Date.now() >= countdownDateTime) {
    endCounter();
}

function endCounter() {
    targetSeconds.classList.remove('active');
    document.getElementById('start-button').remove();
}

// Update the count down every 1 second
var counter = setInterval(function () {

    var now = Date.now();

    if (now < countdownDateTime) {

    // Find the remaining milliseconds between now an the count down date
        var remainingMilliseconds = countdownDateTime - now;

    // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((remainingMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000);


        function printNumber(time, targetElement, prevTime) {
            if (time > 0) {
                targetElement.classList.add('active');
            }
            if (prevTime !== time) {
                targetElement.innerHTML = time > 9 ? time : '0' + time;
            }
            if (prevTime == time && time < 1) {
                targetElement.classList.remove('active');
            }
            return time;
        }

        prevHour = printNumber(hours, targetHours, prevHour);
        prevMinute = printNumber(minutes, targetMinutes, prevMinute);
        prevSecond = printNumber(seconds, targetSeconds, prevSecond);

    // If the count down is finished, delete the button
        if (remainingMilliseconds < 0) {
            clearInterval(counter);
            endCounter();
        }

    } else {

    // If the count down time is already passed, delete the button
        clearInterval(counter);
        endCounter();
    }
}, 1000);
