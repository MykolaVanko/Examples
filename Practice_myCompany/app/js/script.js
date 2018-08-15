$(".navicon").on('click', function () {
    $(this).toggleClass('topnav-menu-navicon-responsive');
    $('header').toggleClass('header-responsive');
    $('.topnav').toggleClass('topnav-responsive');
    $('.topnav-menu').toggleClass('topnav-menu-responsive');
});