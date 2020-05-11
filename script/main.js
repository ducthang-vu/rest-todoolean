console.log('main.js is working')
console.log('$')


function getAjaxSetting(method) {
    return {
        url: '157.230.17.132:3025/todos',
        method: method,
    }
}


function printListItems(template, array_of_objects) {
    array_of_objects.forEach(object => $('.my-list').append(template(object)))
}

/*
function printAll(ajaxSetting) {
    $.$.ajax(ajaxSetting)
        .done(function(result) {
            for (let item of result) {

            }
        })
}
*/

$(document).ready(function () {
    // Init Handlebars
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);

    //printAll()

    printListItems(template, [{text: 'prova'}])
});
