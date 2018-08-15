
          /* falling window for creating task*/

   $('.toggle').on('click', function () {
       $('.task_display').slideToggle();
       $('.clear').val('');
   });$('.cancel').on('click', function () {
       $('.task_display').slideToggle();
       $('.clear').val('');
   });

                  /* delete task*/
    $('ul').on('click', '.geo', function () {
       $('.map_task', this).slideToggle()
    });



                               /*Create new task*/

    $('.add').on('click', function () {

        let taskElements = $('<li class="task_list"></li>')
            .append('<p class="task_list_name">name</p>' +
                '<p class="task_list_date">Date</p>' +
                '<p class="task_list_description">description</p>' +
                '<div class="map_task"></div>' +
                '<img class="mrg-10 geo" src="img/if_53-Location_2123937.png" height="24"/>' +
                '<img class="mrg-10 done" src="img/if_success_1646004.png" height="24"/>' +
                '<img class="mrg-10 edit" src="img/if_Compose_1891025.png" height="24"/>' +
                '<img class="mrg-10 delete" src="img/if_error_1646012.png" height="24"/>');

        $('ul').append(taskElements);

        let taskName = $('#taskName').val();
        let taskDate = $('#taskDate').val();
        let taskText = $('#taskText').val();

    });


