// Updating button click handling for routes like #/chat and #/onboarding

// Add proper route handlers before the anchor link handler
$(document).on('click', 'button.route-handler', function(event) {
    let route = $(this).data('route');
    if (route) {
        // Navigate to the specified route
        navigateTo(route);
        event.preventDefault(); // Prevent default anchor click behavior
    }
});

// Previous anchor link handler
$(document).on('click', 'a', function(event) {
    let target = $(this).attr('href');
    if (target.startsWith('#')) {
        navigateTo(target);
        event.preventDefault();
    }
});