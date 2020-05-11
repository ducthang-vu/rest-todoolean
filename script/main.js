function getAjaxSetting(method, id='') {
    return {
        url: 'http://157.230.17.132:3025/todos/' + id,
        method: method
    }
}


function printListItems(template, array_of_objects) {
    $('.my-list').empty()
    array_of_objects.forEach(object => $('.my-list').append(template(object)))
}


function getAll(template, ajaxSetting) {
    $.ajax(ajaxSetting)
        .done(result => printListItems(template, result))
        .fail(error => console.log(error))
}


$(document).ready(function () {
    // Init Handlebars
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);

    // on page load, print every stored task
    getAll(template, getAjaxSetting('GET'))

    // activating user interation
    $('.my-list').on('dblclick', '.list-item', function() {
        $(this).toggleClass('completed')
        $(this).children($('.item-button')).toggle()
    })

    // allows user to add new task
    $(document).keyup(function (e) { 
        if (e.which == 13 || e.keyCode == 13) {
            $.ajax({
                url: 'http://157.230.17.132:3025/todos/',
                method: 'POST',
                data: {text: $('#new-input').val()}
            }).done(() => {
                getAll(template, getAjaxSetting('GET'))
                $('#new-input').val('') 
                $('#new-input').blur()})
            .fail(error => console.log(error))
        }})

    // allows user to delete task
    $('.my-list').on('click', '.item-button', function() {
        var id = $(this).parent().data('id')
        $.ajax(getAjaxSetting('DELETE', id))
            .done(() => {getAll(template, getAjaxSetting('GET'))})
            .fail(error => console.log(error))
    })
});
