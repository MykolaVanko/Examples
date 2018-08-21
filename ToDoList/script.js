var map;
function initMap (){
    map = new google.maps.Map(document.getElementById('map'),
        {
            center: {lat: 49.85, lng: 24.01},
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Ви тут!');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}



/* falling window for creating task*/

   $('.toggle').on('click', function () {
       $('.task_display').slideToggle();
       $('#minus, #plus').toggle();
       $('.clear').val('');
   });


                 /* Open Map*/

    $('.geoloc').on('click', function () {
        if ($('.hidden').attr('class') == 'hidden'){
           $('#map').slideToggle().toggleClass('hidden');
            initMap();
       } else {
            $('#map').slideToggle().toggleClass('hidden')
        }

    });
    $('.list_geo').on('click','.list_task .list_task-name .geo_task', function () {
        if ($('.hidden').attr('class') == 'hidden'){
            $('#map').slideToggle().toggleClass('hidden');
            initMap();
        } else {
            $('#map').slideToggle().toggleClass('hidden')
        }

    });

                  /* watch task*/
   $('.list').on('click','.list_task .list_task-name .arrows', function () {
       $(this).parent().parent().find('.desc_wrapper').slideToggle('hidden');
       $(this).parent().find('.list_task-setting').toggleClass('btn_visibility');
       $(this).find('.arr').toggleClass('hidden');
   });

                  /* delete task*/

    $('.list_delete').on('click', '.list_task .list_task-name .list_task-setting .delete', function () {
        $(this).parent().parent().parent().remove()
    });


                               /*Create new task*/

    $('.add').on('click', function () {

        let arrows = $('<div class="arrows"></div>')
                .append('<img class="hidden arr" id="arr_up" src="img/if_2-Arrow_up_2123958.png" height="24"/>')
                .append('<img class="arr" id="arr_down" src="img/if_3-Arrow_down_2123945.png" height="24"/>');

        let setingBtn = $('<div class="list_task-setting btn_visibility"></div>')
            .append('<img class="done" src="img/if_success_1646004.png" height="24"/>')
            .append('<img class="edit" src="img/if_Compose_1891025.png" height="24"/>')
            .append('<img class="delete" src="img/if_error_1646012.png" height="24"/>');

        let description = $('<div class="hidden desc_wrapper"></div>')
            .append('<textarea readonly="readonly" class="description task_edit_descr"></textarea>');
        let listName = $('<div class="list_task-name"></div>')
            .append('<input class="task_edit_name" type="text" readonly="readonly"> ' +
                '<input id="taskDate" class="datepicker-here task_edit_date" data-language="ua"' +
                'data-timepicker="true" datatype="date" placeholder="Дата" readonly="readonly"> ')
            .append('<img class="geo_task" src="img/if_geolocation_2969400.png" height="24"/>')
            .append(arrows)
            .append(setingBtn);

        let taskElements = $('<div class="list_task new_list_task"></div>')
            .append(listName)
            .append(description);

        $('.list').append(taskElements);
    });


    /**************edite task****************/

    $('.list_save').on('click', '.list_task .list_task-name .list_task-setting .edit',
        function () {
            $(this).parent().parent().find('.task_edit_name').removeAttr('readonly');
            $(this).parent().parent().find('.task_edit_date').removeAttr('readonly');
            $(this).parent().parent().parent().find('.task_edit_descr').removeAttr('readonly');
    });


    /****************save change**************/














