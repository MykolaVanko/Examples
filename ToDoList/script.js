
/*********************FIREBASE*****************/

let config = {
    apiKey: "AIzaSyD95fmopdXEZHce5yGczh80gDi_VGmhIc8",
    authDomain: "todolist-da05f.firebaseapp.com",
    databaseURL: "https://todolist-da05f.firebaseio.com",
    projectId: "todolist-da05f",
    storageBucket: "todolist-da05f.appspot.com",
    messagingSenderId: "1067564849863"
};
firebase.initializeApp(config);

let tasks = firebase.firestore().collection('tasks'); //database

/********************MAP*****************/
getCurrentLocation(); // start search user geolocation
let taskListElement = $('.list'); // parent element for all tasks

let coords; // arrai with lat lng
let map;
function initMap (){
    map = new google.maps.Map(document.getElementById('map'),
        {
            center: {lat: 49.85, lng: 24.01},
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

    let marker;

    function placeMarker(location) {
        if ( marker ) {
            marker.setPosition(location);

        } else {
            marker = new google.maps.Marker({
                position: location,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                title: $('#taskName').val()
            });
        }
    }

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
        coords = '';
        coords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        console.log(coords);
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            addDistase(); // add data-dist in task list whet user allows geolacation
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

/******************************distans from user to user tasks********************/
currentPos = [];
function getCurrentLocation (){     // get current location

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            currentPos.push(pos)
        })
    }
}


function calculateDistance(pointA, pointB) {   //find distans from user location to task
   // console.log(pointA);
   // console.log(pointB);

    const lat1 = pointA.lat;
    const lon1 = pointA.lng;
    //console.log(lat1);

    const lat2 = pointB.lat;
    const lon2 = pointB.lng;

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
        ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = Math.floor(R * c);

    //console.log(distance); // in meters
    return distance;
}


/***************************load geolocation for task***************************/

    taskListElement.on('click','.list_task .list_task-name .geo_task', function () {

        if ($('.hidden').attr('class') == 'hidden'){
            let editTaskIdMap = $(this).parent().parent().attr('id');
            console.log(editTaskIdMap);
            let position = [];
            tasks.get()
                .then(tasksList => {
                    tasksList.forEach(task => {
                        if (task.id == editTaskIdMap) {
                            position.push(task.data().geoloc);
                        }
                    });
                    map = new google.maps.Map(document.getElementById('map'),
                        {
                            center: position[0],
                            zoom: 13,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                        });

                    let mark = new google.maps.Marker({
                        position: position[0],
                        map:map,

                    });
                    $('#map').slideToggle().toggleClass('hidden');
                })

        } else {
            $('#map').slideToggle().toggleClass('hidden')
        }

    });



/****************Load Tasks*********************/

function loadData() {

    tasks
        .get()
        .then(tasksList => {
            tasksList.forEach(task =>{

                    //let taskPosition = calculateDistance(currentPos[0], task.data().geoloc); //find distans to tasks

                    let dataSort = Date.parse(task.data().date)/1000;

                    let arrows = $('<div class="arrows"></div>')
                        .append('<img class="hidden arr arr_up" src="img/if_2-Arrow_up_2123958.png" height="24"/>')
                        .append('<img class="arr" src="img/if_3-Arrow_down_2123945.png" height="24"/>');

                    let setingBtn = $('<div class="list_task-setting btn_visibility"></div>')
                        .append('<img class="done" src="img/if_success_1646004.png" height="24"/>')
                        .append('<img class="save hidden" src="img/if_188Backup_disk_data.png" height="24"/>')
                        .append('<img class="edit" src="img/if_Compose_1891025.png" height="24"/>')
                        .append('<img class="delete" src="img/if_error_1646012.png" height="24"/>');

                    let listName = $('<div class="list_task-name"></div>')
                        .append('<input class="task_edit_name" type="text" readonly="readonly" value="' + task.data().name + '"> ' +
                            '<input class="task_edit_date" type="datetime-local" ' +
                            'readonly="readonly" value="' + task.data().date + '"> ')
                        .append('<img class="geo_task btn_visibility" src="img/if_geolocation_2969400.png" height="24"/>')
                        .append(arrows)
                        .append(setingBtn);
                    let description = $('<div class="hidden desc_wrapper"></div>')
                        .append('<textarea readonly="readonly" class="description ' +
                            'task_edit_descr">' + task.data().description + '</textarea>');

                    let taskElements = $('<div class="list_task new_list_task" data-done="'+task.data().taskdone+'"' +
                        ' data-sort="' + dataSort + '" id="' + task.id + '"></div>')
                        .append(listName)
                        .append(description);

                    $('.list').append(taskElements);
            });
            allTasks();
            terminateTasksCheck();
            doneTasksCheck();
        });
}


loadData(); /// Loading Task list




setTimeout(function () {
    addDistase(); /// Loading data-dist to task
}, 2000);


    function addDistase(){  // take geolocation from firebase and set data-dist attr to task
        tasks
            .get()
            .then(tasksList => {
                tasksList.forEach(task =>{
                    let taskPosition = calculateDistance(currentPos[0], task.data().geoloc);
                    $('#' + task.id).attr('data-dist', taskPosition);
                })
        })
    }


/* falling window for creating task*/

   $('.toggle').on('click', function () {
       let editWindow = $('.task_display');
       $('#minus, #plus').toggle();
       $('.clear').val('');
       let mapHidden = $('.hidden');

       if (mapHidden.attr('class') == 'hidden' && editWindow.css('display') == 'none'){
           $('#map').slideToggle().toggleClass('hidden');
           editWindow.slideToggle();
           initMap();
       } else if (mapHidden.attr('class') != 'hidden' && editWindow.css('display') == 'block') {
           $('#map').slideToggle().toggleClass('hidden');
           editWindow.slideToggle()
       } else if ($('#map').css('display') == 'block' && editWindow.css('display') == 'none') {
           //$('#map').slideToggle().toggleClass('hidden')
           editWindow.slideToggle()
       }

   });

   /*************create task**************/

    $('.add').on('click', function () {

        getCurrentLocation();


        let taskName = $('#taskName');
        let taskDate = $('#taskDate');
        let taskText = $('#taskText');

        let taskNameVal = taskName.val();
        let taskDateVal = taskDate.val();
        let taskTextVal = taskText.val();
            if (taskNameVal == '') {
                taskName.focus();
            }else if (taskDateVal == '') {
                taskDate.focus();
            } else if(taskTextVal == '') {
                taskText.focus();
            } else {
                tasks.add({
                    name: taskNameVal,
                    date: taskDateVal,
                    description: taskTextVal,
                    taskdone: 0,
                    geoloc: coords
                })
                    .then((getId) => {


                        /*$('.list_task').remove() // or load again data from firebase
                            loadData()*/


                        let dataSort = Date.parse(taskDateVal)/1000;
                        let localPosition = calculateDistance(currentPos[0], coords);


                let arrows = $('<div class="arrows"></div>')
                    .append('<img class="hidden arr arr_up" src="img/if_2-Arrow_up_2123958.png" height="24"/>')
                    .append('<img class="arr" src="img/if_3-Arrow_down_2123945.png" height="24"/>');

                let setingBtn = $('<div class="list_task-setting btn_visibility"></div>')
                    .append('<img class="done" src="img/if_success_1646004.png" height="24"/>')
                    .append('<img class="save hidden" src="img/if_188Backup_disk_data.png" height="24"/>')
                    .append('<img class="edit" src="img/if_Compose_1891025.png" height="24"/>')
                    .append('<img class="delete" src="img/if_error_1646012.png" height="24"/>');

                let description = $('<div class="hidden desc_wrapper"></div>')
                    .append('<textarea readonly="readonly" class="description task_edit_descr">' + taskTextVal + '</textarea>');
                let listName = $('<div class="list_task-name"></div>')
                    .append('<input class="task_edit_name" type="text" readonly="readonly" value="' + taskNameVal + '"> ' +
                        '<input class="task_edit_date" type="datetime-local" readonly="readonly" value="' + taskDateVal + '"> ')
                    .append('<img class="geo_task btn_visibility" src="img/if_geolocation_2969400.png" height="24"/>')
                    .append(arrows)
                    .append(setingBtn);

                let taskElements = $('<div class="list_task new_list_task" data-done="0"' +
                    ' data-sort="'+dataSort+'" data-dist="'+localPosition+'" id="' + getId.id + '"></div>')
                    .append(listName)
                    .append(description);

                $('.list').append(taskElements);
                        console.log('done');
                        terminateTasksCheck();
                        allTask.push(taskElements)
                    })
                    .catch(reason => {
                        console.log(reason);
                    });

                $('.clear').val('')

            }

    });

                  /* watch task*/


   taskListElement.on('click','.list_task .list_task-name .arrows', function () {
       $(this).parent().parent().find('.desc_wrapper').slideToggle('hidden');
       $(this).parent().find('.list_task-setting').toggleClass('btn_visibility');

       if ($(this).parent().find('.geo_task').attr('class') != 'btn_visibility') {
           $(this).parent().find('.geo_task').toggleClass('btn_visibility');
       }

       $(this).find('.arr').toggleClass('hidden');

         if (($('.hidden').attr('class') != 'hidden')) {
           $('#map').slideToggle().toggleClass('hidden')
       }
   });

                  /* delete task*/

    taskListElement.on('click', '.list_task .list_task-name .list_task-setting .delete', function () {
        if (confirm("Ви впевнені?") === true) {
            let editTaskId = $(this).parent().parent().parent().attr('id'); //find if from firebase


            console.log(editTaskId);
            tasks.doc(editTaskId).delete();
            $(this).parent().parent().parent().remove();
        }
    });


    /**************edite task****************/

    taskListElement.on('click', '.list_task .list_task-name .list_task-setting .edit',
        function () {
            $(this).parent().parent().find('.task_edit_name').prop('readonly', false).focus();
            $(this).parent().parent().find('.task_edit_date').prop('readonly', false);
            $(this).parent().parent().parent().find('.task_edit_descr').prop('readonly', false);
            $(this).toggle();
            $(this).parent().parent().find('.geo_task').toggleClass('btn_visibility');
            $('.arrows').toggleClass('btn_visibility');
            //$(this).parent().parent().find('.arr_up').toggleClass('btn_visibility');
            $(this).parent().parent().find('.arrows').prop('disabled', true); //make arrows buttons disabled
            $(this).parent().find('.save').toggle();

            if (($('.hidden').attr('class') == 'hidden')) {
                $('#map').slideToggle().toggleClass('hidden')
            }

            initMap()
    });

    /****************save change**************/

    taskListElement.on('click', '.list_task .list_task-name .list_task-setting .save',
        function () {
           // getCurrentLocation(); //find user location

            let editTaskId = $(this).parent().parent().parent().attr('id');//
            console.log(editTaskId);

            let editTaskName = $(this).parent().parent().find('.task_edit_name').val();
            console.log(editTaskName);
            let editDateText = $(this).parent().parent().find('.task_edit_date').val();
            console.log(editDateText);
            let editDescrText = $(this).parent().parent().parent().find('.task_edit_descr').val();

            let dataSort = Date.parse(editDateText)/1000;
            console.log(dataSort);
            $(this).parent().parent().parent().attr("data-sort", dataSort);

                  tasks.doc(editTaskId).set({ // edit task in firebase
                        name: editTaskName,
                        date: editDateText,
                        description: editDescrText,
                        taskdone: 0,
                        geoloc: coords
            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

            $(this).parent().parent().find('.task_edit_name').prop('readonly', true).css('background', 'white');
            $(this).parent().parent().find('.task_edit_date').prop('readonly', true);
            $(this).parent().parent().parent().find('.task_edit_descr').prop('readonly', true);
            $(this).toggle();
            $(this).parent().find('.edit').toggle();
            $(this).parent().parent().parent().attr('data-done', 0);
            $('.arrows').toggleClass('btn_visibility');
            //$(this).parent().parent().find('.arr_up').toggleClass('btn_visibility');
            $(this).parent().parent().find('.arrows').prop('disabled', false); //make arrows buttons enabled

            $('#sort_list').val('all'); //set sort list on position all

            if ($(this).parent().parent().find('.geo_task').attr('class') != 'btn_visibility') {
                $(this).parent().parent().find('.geo_task').toggleClass('btn_visibility');
            }

            $(this).parent().parent().find('.task_edit_date').css('background', 'white');

            terminateTasksCheck(); //check if task past
            addDistase();
        });

    /*************************Task Done************************/

    taskListElement.on('click', '.list_task .list_task-name .list_task-setting .done', function () {
        console.log('done button');
        $(this).parent().parent().find('.task_edit_name').css('background', 'lightgreen');
        $(this).parent().parent().parent().attr('data-done', 1);


        let editTaskId = $(this).parent().parent().parent().attr('id');

        tasks.doc(editTaskId).set({taskdone: 1}, {merge: true})
            .then(function() {
                console.log("Done successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    });

            /********************SORT*********************/

        let allTask = [];
        let time = Date.parse(Date())/1000;

        function allTasks(){ //all task list Array
            allTask = [];
            allTask.push($('.list_task'))
        }


        function doneTasksCheck() {  //if task done == background lightgreen
            //done = [];
            $('.list_task').each(function () {
                if ($(this).data('done') == 1) {
                   // done.push($(this));
                    $(this).find('.task_edit_name').css('background', 'lightgreen');
                }
            })
        }


        function terminateTasksCheck(){ // check task if terminated
                 $('.task_edit_date').each(function () {
                        if (Date.parse($(this).val())/1000 < time){                     
                            $(this).css('background', 'red');
                        }
                    });
                }

        setInterval(function () { // interval for checking if task terminated
            terminateTasksCheck();
        },300000);

       /***************************Sort list********************/


        $('#sort_list').on('change', function() {
            let listTask = $('.list_task');
                if ($(this).val() == 'all') {
                    listTask.find('.task_edit_date').filter(function () {
                        $(this).parent().parent().prop('style', false);
                    })
                } else if ($(this).val() == 'done_task'){
                    listTask.find('.task_edit_date').filter(function () {
                        $(this).parent().parent().prop('style', false);
                    });
                    listTask.each(function () {
                        if ($(this).attr('data-done') == '0'){
                            $(this).css('display', 'none');
                        }
                    })
                } else if ($(this).val() =='terminated') {
                    listTask.find('.task_edit_date').filter(function () {
                        $(this).parent().parent().prop('style', false);
                    });

                    $('.task_edit_date').each(function () {
                        if (Date.parse($(this).val())/1000 > time){
                            // terminated.push($(this).parent().parent());
                            $(this).parent().parent().css('display', 'none');
                        }
                    })
                } else  if ($(this).val() == 'date-up') {     // tasks sort by date
                    let tempDate = [];
                    listTask.each(function () {
                        if ($(this).data('sort')){
                            tempDate.push($(this))
                        }
                    });
                    tempDate.sort(function(a, b) {
                        return $(a).attr('data-sort') - $(b).attr('data-sort')
                    });
                    taskListElement.append(tempDate);
                } else if ($(this).val() =='name') {    //sort tasks by Name
                    let tempName = [];
                    listTask.each(function () {
                        if ($(this).find('.task_edit_name').val()){
                            tempName.push($(this))
                        }
                    });
                    tempName.sort(function(a, b) {
                        return $(a).find('.task_edit_name').val().localeCompare($(b).find('.task_edit_name').val())
                    });
                    taskListElement.append(tempName);
                } else if ($(this).val() =='location') {   // sort by distans from user to tasks
                    let tempDist = [];
                    listTask.each(function () {
                        if ($(this).data('dist')){
                            tempDist.push($(this))
                        }
                    });
                    tempDist.sort(function(a, b) {
                        return $(a).attr('data-dist') - $(b).attr('data-dist')
                    });
                    taskListElement.append(tempDist);
                }
            });


            /**********************search task by name*********************/

        $('.search').on('input', function () {
            let search = $('.search');
            $('.list_task').find('.task_edit_name').filter(function () {
                if ($(this).val().toUpperCase().includes(search.val().toUpperCase())) {
                    $(this).parent().parent().css('display', '');
                } else {
                    $(this).parent().parent().css('display', 'none');
                }
            });
        });

        /**********************search task by date*********************/
        $('.data_search').on('input', function () {
            let search = $('.data_search');
            $('.list_task').find('.task_edit_date').filter(function () {
                if ($(this).val().includes(search.val())) {
                    $(this).parent().parent().css('display', '');
                } else {
                    $(this).parent().parent().css('display', 'none');
                }
            });
        });