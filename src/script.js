import $ from 'jquery';

$(document).ready(() => {
    // Activates button on element hover 
    $('#root').on('mouseover', '.task', (event) => {
        $('.task button[id="' + event.target.id + '"]').css('opacity', '100%');
    });
    $('#root').on('mouseleave', '.task', (event) => {
        $('.task button[id="' + event.target.id + '"]').css('opacity', '35%');
    });

    // Editing task values by double click
    $('#root').on( 'dblclick', '.task', (event) => {
        $('input[id="' + event.target.id +'"]').attr('readonly', false);
    });

    // Setup input readonly on focusout
    $('#root').on('focusout', '.task input', (event) => {
        $('input[id="' + event.target.id +'"]').attr('readonly', true);
    });
});