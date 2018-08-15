
          /* falling window for creating task*/

   $('.toggle').on('click', function () {
       $('.task_display').slideToggle();
       $('#minus, #plus').toggle();
       $('.clear').val('');
   });

                  /* watch task*/
   $('.list').on('click','.list_task', function () {
       $('.desc_wrapper',this).slideToggle('hidden');
       $('.list_task-seting', this).toggleClass('btn_visibility');
       $('.list_task-seting, .list_task-name input, .description, .map').on('click', function (e) {
           e.stopPropagation();
       });
   });

                  /* delete task*/




                               /*Create new task*/

    $('.add').on('click', function () {

        let setingBtn = $('<div class="list_task-seting btn_visibility"></div>')
            .append('<img class="done" src="img/if_success_1646004.png" height="24"/>')
            .append('<img class="edit" src="img/if_Compose_1891025.png" height="24"/>')
            .append('<img class="delete" src="img/if_error_1646012.png" height="24"/>');

        let description = $('<div class="hidden desc_wrapper"></div>')
            .append('<textarea readonly class="description"></textarea>')
            .append('<div class="map"></div>');

        let listName = $('<div class="list_task-name"></div>')
            .append('<input class="taskName" type="text" readonly> ' +
                '<input type="date" readonly> ')
            .append(setingBtn);

        let taskElements = $('<div class="list_task new_list_task"></div>')
            .append(listName)
            .append(description);

        $('.list').append(taskElements);

        $('.taskName', this).val( $('#taskName').val() );
        let taskDate = $('#taskDate').val();
        let taskText = $('#taskText').val();

    });


