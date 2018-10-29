
let nav = document.getElementsByTagName("nav")[0];
let style = getComputedStyle(nav);
let pos = parseInt(style.top);
let btn = document.getElementsByClassName('line')[0];
let data = btn.getAttribute('data-toggle');
//window width
let windowWidth = window.document.documentElement.clientWidth;
//falling links
function myMove() {

    let nav = document.getElementsByTagName('nav')[0];
    if (nav.classList.contains('top-66')){
        nav.classList.remove('top-66')
    } else {
        nav.classList.add('top-66')
    }
}

//switch between  windows
let switchBtn = document.getElementsByClassName('services-btn-container');
let switchwindow = document.getElementsByClassName('services-info-descr-slide');
//set event listener on buttons
for (let btn of switchBtn) {
    btn.addEventListener('click', switchWindow)
}

function switchWindow() {
    let arrt = this.getAttribute('data-show');
    for (let window of switchwindow) {
        if (window.getAttribute('data-show') === arrt) {
            window.classList.remove('hidden')
        } else {
            window.classList.add('hidden')
        }
    }
}


//TEAM CHINEN & SKILLS

//get
let teamCards = document.getElementsByClassName('team-card');
//set event listener on cards
for (let card of teamCards) {
    card.addEventListener('mouseover', showInfo);
    card.addEventListener('mouseleave', hideInfo)
}
//mouse over
function showInfo (){
    let orangBg = this.firstElementChild;
    orangBg.classList.add('team-orange-bg-h-0');
    let cardName = this.childNodes[5];
    cardName.classList.add('team-card-name-top')

}
//mouse leave
function hideInfo() {
    let orangBg = this.firstElementChild;
    orangBg.classList.remove('team-orange-bg-h-0');
    let cardName = this.childNodes[5];
    cardName.classList.remove('team-card-name-top')
}

//SLIDER

//arrows
let arrows = document.getElementsByClassName('slider-arr');
for (let arrow of arrows) {
    arrow.addEventListener('mouseover', arrOver);
    arrow.addEventListener('mouseleave', arrLive);
}
//arrow hover
function arrOver() {
    this.childNodes[1].classList.remove('hidden');
    this.childNodes[3].classList.add('hidden');
}
//arrow hover
function arrLive() {
    this.childNodes[1].classList.add('hidden');
    this.childNodes[3].classList.remove('hidden');
}

//feedbacks

//get feedbacks
let feedbacks = document.getElementsByClassName('client-feedback');
//get arrows
let arrL = document.getElementsByClassName('left')[0];
let arrR = document.getElementsByClassName('right')[0];

let sliderLine = document.getElementsByClassName('slider-lines')[0];

arrL.addEventListener('click', left);
arrR.addEventListener('click', right);

//give to feedbacks corret position
(function () {
    //create orange lines under feedbacks
    let i = 0;
   while(i < feedbacks.length){
       let feedbacCounter = document.createElement('div');
       feedbacCounter.classList.add('slider-line');
       sliderLine.appendChild(feedbacCounter);
       i++;
   }

})();
//animate Slider
let feedbacksContainer = document.getElementsByClassName('client-feedbacks')[0];
let animSlideR580 = 'anim-right-slide-580';
let animSlideR433 = 'anim-right-slide-433';
let animSlideL580 = 'anim-left-slide-580';
let animSlideL433 = 'anim-left-slide-433';
//slide right
function right() {
    let anim = animSlideL580;
    try {
        setTimeout(()=>{
            slideIndicate();
        },305);
        getWidth();
        if (windowWidth <= 1410){
            anim = animSlideL433
        }


        let leftElem = document.getElementsByClassName('show');
        let firstHiddenElem = document.getElementsByClassName('hidden-feedback')[0];
        for (let i = 0; i < feedbacks.length; i++) {
            if (feedbacks[i].classList.contains('show') && feedbacks[i].nextElementSibling.classList.contains('hidden-feedback')) {
                setTimeout(()=> {
                    feedbacks[i + 1].classList.add('show');
                    feedbacks[i + 1].classList.remove('hidden-feedback');
                    feedbacksContainer.classList.remove(anim);
                },300);
                feedbacksContainer.classList.add(anim);
                break
            }
        }

        for (let i = 0; i < feedbacks.length; i++) {
            if (feedbacks[i].classList.contains('show')) {
                setTimeout(()=> {
                    feedbacks[i].classList.remove('show', 'scale', 'anim-left');
                    feedbacks[i].classList.add('hidden-feedback');
                    feedbacksContainer.classList.remove(anim);
                },300);
                feedbacks[i].classList.add('scale', 'anim-left');
                feedbacksContainer.classList.add(anim);
                break
            }
        }
    } catch (e) {
        console.log(e);
    }
}

//slide left
function left() {
    let anim = animSlideR580;
    try {
        setTimeout(()=>{
            slideIndicate();
        },305);

        let num = 2;
        let leftElem = document.getElementsByClassName('show');
        let firstHiddenElem = document.getElementsByClassName('hidden-feedback')[0];
        let lastElem = feedbacks[feedbacks.length];
        //check window size to correct slider works
        getWidth();
        if (windowWidth <= 1410){
            anim = animSlideR433
        }
        if (windowWidth <= 1100){
            num = 1
        }
        for (let i = 0; i < feedbacks.length; i++) {
            if (feedbacks[i].classList.contains('show') && feedbacks[i + 1] === lastElem){
                setTimeout( () => {
                    feedbacks[i - num].classList.remove('hidden-feedback');
                    feedbacks[i - num].classList.add('show');
                    feedbacks[i].classList.add('hidden-feedback');
                    feedbacks[i].classList.remove('show', 'scale', 'anim-right');
                    feedbacksContainer.classList.remove(anim);
                    this.setAttribute('disabled', 'true');
                }, 300);
                feedbacks[i].classList.add('scale', 'anim-right');
                feedbacksContainer.classList.add(anim);
                return
            }
        }

        for (let i = 0; i < feedbacks.length; i++) {
            if (feedbacks[i].classList.contains('hidden-feedback') &&
                feedbacks[i].nextElementSibling.classList.contains('show')) {
                setTimeout(()=> {
                    feedbacks[i].classList.add('show');
                    feedbacks[i].classList.remove('hidden-feedback');
                }, 300);
                break
            }
        }

        for (let i = 0; i < feedbacks.length; i++) {
            if (feedbacks[i].classList.contains('show') &&
                feedbacks[i].nextElementSibling.classList.contains('hidden-feedback')) {
                setTimeout(()=> {
                    feedbacks[i].classList.remove('show', 'scale', 'anim-right');
                    feedbacks[i].classList.add('hidden-feedback');
                    feedbacksContainer.classList.remove(anim);
                },300);
                feedbacks[i].classList.add('scale', 'anim-right');
                feedbacksContainer.classList.add(anim);
                break
            }
        }
    } catch (e) {
        console.log(e);
    }

}

//swipe in phone or tablet
(function () {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        xDown = getTouches(evt)[0].clientX;
        yDown = getTouches(evt)[0].clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                right();
            } else {
                left();
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
})();

//get screen width
function getWidth(){
    return  windowWidth = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName('body')[0].clientWidth;
}

//event listener on screen resize
window.addEventListener('resize', function(event){
    try {
        slideIndicate();
        getWidth();
        let showElem = document.getElementsByClassName('show')[1];
        if (windowWidth <= 1100) {

            showElem.classList.remove('show');
            showElem.classList.add('hidden-feedback');

        } else {
            for (let i = 0; i < feedbacks.length; i++) {
                if (feedbacks[i].classList.contains('show')) {
                    feedbacks[i].nextElementSibling.classList.add('show');
                    feedbacks[i].nextElementSibling.classList.remove('hidden-feedback');
                    break
                }

            }
        }
    } catch (e) {
        console.log(e);
    }

});

//check if screen width <= 1100
document.addEventListener('DOMContentLoaded', function() {
    slideIndicate();
    getWidth();
    if (windowWidth <= 1100){
        let showElem = document.getElementsByClassName('show')[1];
        showElem.classList.remove('show');
        showElem.classList.add('hidden-feedback');
    }
}, false);

//slide indicators
let orangeLines = document.getElementsByClassName('slider-line');
function slideIndicate() {
    for (let i = 0; i < feedbacks.length; i++) {
        if (feedbacks[i].classList.contains('show')){
            for (let j = 0; j < orangeLines.length; j++) {
                if (j === i){
                    orangeLines[j].classList.add('line-bg')
                }
            }
        } else if (feedbacks[i].classList.contains('hidden-feedback')) {
            for (let j = 0; j < orangeLines.length; j++) {
                if (j === i){
                    orangeLines[j].classList.remove('line-bg')
                }
            }
        }

    }
}

