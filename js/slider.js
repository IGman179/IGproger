$(document).ready(function () {
  // Main variables
  let $aboutTitle = $(".about-information .title-box h1.title");
  let $developmentWrapper = $('.skill-box');
  let developmentIsVisible = false;

  /* ####### HERO SECTION ####### */

  $(".home-pg .pg-frame  .home-information").delay(500).animate(
    {
      opacity: "1",
      top: "50%",
    },
    1000
  );

  $(window).scroll(function () {
    let bottom_of_window = $(window).scrollTop() + $(window).height();

    // ##### ABOUT MYSELF SECTION #### 
    if (
      bottom_of_window >
      $aboutTitle.offset().top + $aboutTitle.outerHeight()
    ) {
      $(".about-information .title-box h1.title").addClass("aboutTitleVisible");
    }
    
    // Skills progress bar animated

    let middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight()/2;

    if((bottom_of_window > middle_of_developmentWrapper)&& (developmentIsVisible == false)){

      $('.skills-bar-container li').each( function(){

        let $barContainer = $(this).find('.bar-container');
        let dataPercent = parseInt($barContainer.data('percent'));
        let elem = $(this).find('.progressbar');
        let percent = $(this).find('.percent');
        let width = 0;

        let id = setInterval(frame, 15);

        function frame() {
          if (width >= dataPercent) {
              clearInterval(id);
          } else {
            width++;
            elem.css("width", width+"%");
            percent.html(width+" %");
          }
        }
      });
      developmentIsVisible = true;
    }
  }); // -- End window scroll --
});

    

// ToUp button

let body = document.querySelector("body");
let height = body.clientHeight;
let toUP = document.querySelector(".to-up");
window.addEventListener("scroll", function () {
  console.log(this.scrollY);
  let scrollTop = this.scrollY;
  if (scrollTop > height * 0.05) {
    toUP.classList.add("show");
  } else {
    toUP.classList.remove("show");
  }
});

// slider
let multiItemSlider = (function () {
  return function (selector, config) {
    let _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector(".slider__wrapper"), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll(".slider__item"), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll(".slider__control"), // элементы управления
      _sliderControlLeft = _mainElement.querySelector(".slider__control_left"), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector(
        ".slider__control_right"
      ), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = (_itemWidth / _wrapperWidth) * 100, // величина шага (для трансформации)
      _items = []; // массив элементов

    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    let position = {
      getItemMin: function () {
        let indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      },
    };

    let _transformItem = function (direction) {
      let nextItem;
      if (direction === "right") {
        _positionLeftItem++;
        if (
          _positionLeftItem + _wrapperWidth / _itemWidth - 1 >
          position.getMax()
        ) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform =
            "translateX(" + _items[nextItem].transform + "%)";
        }
        _transform -= _step;
      }
      if (direction === "left") {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform =
            "translateX(" + _items[nextItem].transform + "%)";
        }
        _transform += _step;
      }
      _sliderWrapper.style.transform = "translateX(" + _transform + "%)";
    };

    // обработчик события click для кнопок "назад" и "вперед"
    let _controlClick = function (e) {
      if (e.target.classList.contains("slider__control")) {
        e.preventDefault();
        let direction = e.target.classList.contains("slider__control_right")
          ? "right"
          : "left";
        _transformItem(direction);
      }
    };

    let _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener("click", _controlClick);
      });
    };

    // инициализация
    _setUpListeners();

    return {
      right: function () {
        // метод right
        _transformItem("right");
      },
      left: function () {
        // метод left
        _transformItem("left");
      },
    };
  };
})();

let slider = multiItemSlider(".slider");

// ...B.G...-...W.O.R.K...

let canvas = document.getElementById("circles");
let ctx = canvas.getContext("2d");

//Set the dimensions of canvas equal to the dimensions of the card
let W = (canvas.width = 600);
let H = (canvas.height = 300);

//Number of circles
let circleNbr = 10;

// Gradient
let bgColor1 = "rgba(153, 83, 85, 1)";
let bgColor2 = "rgba(52, 9, 80, 1)";

//Create an array of circles
let circles = [];
for (let i = 0; i < circleNbr; i++) {
  circles.push(new circle());
}

//Function to create a circle
function circle() {
  //Random Position
  this.x = Math.random() * W;
  this.y = Math.random() * H;

  //Random Velocities
  this.vx = 0.2 + Math.random() * 0.5;
  this.vy = -this.vx;

  //Random Radius
  this.r = 3 + Math.random() * 10;

  //Random opacity color
  this.color =
    "rgba(200, 116, 82," + (Math.random() * (1 - 0.5) + 0.5).toFixed(1) + ")";
}

//Function to draw the gradient background with the circles
function draw() {
  let grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, bgColor1);
  grd.addColorStop(1, bgColor2);

  //Fill the canvas with the gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  //Fill the canvas with the circles
  for (let j = 0; j < circles.length; j++) {
    let c = circles[j];

    //Draw the circle
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();

    //Velocity
    c.x -= c.vx;
    c.y += c.vy;

    //When the circles are out of the canvas
    if (c.x < -20) c.x = W + 20;
    if (c.y < -20) c.y = H + 20;
  }
}
setInterval(draw, 30);

