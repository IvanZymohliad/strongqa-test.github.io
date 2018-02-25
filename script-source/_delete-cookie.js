
document.getElementById('delete-cookies').onclick = function () {
    Cookies.remove('first-visit-time');
    console.log('Cookies deleted!');
};