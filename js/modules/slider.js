// Slider

function slider({
    container,
    slide,
    prevArrow,
    nextArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    // const slides = document.querySelectorAll('.offer__slide'),
    //     slider = document.querySelector('.offer__slider'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current'),
    //     slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    //     slidesField = document.querySelector('.offer__slider-inner'),
    //     width = window.getComputedStyle(slidesWrapper).width;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width  
    })

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots= [];

    indicators.classList.add('carousel-indacators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotPosition() {
        dots.forEach(dot => dot.style.opacity ='.5');
        dots[slideIndex - 1].style.opacity = '1';
        }

        function slideIndicarion(slideIndex) {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    next.addEventListener('click', () => {
        if(offset == parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slideIndicarion(slideIndex);
        dotPosition();
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = parseInt(width) * (slides.length - 1);
        } else {
            offset -= parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slideIndicarion(slideIndex);
        dotPosition();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = parseInt(width) * (slideTo -1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            slideIndicarion(slideIndex);
            dotPosition();
        });
    });

// const slides = document.querySelectorAll('.offer__slide'),
//       slide_bar = document.querySelector('.offer__slider-counter');

// let currentSlide = 1;

// function slide_bar_counter (currentSilde, slides) {
//     let zero = '0';
//     if (currentSilde > 9) {
//         zero = '';
//     }
//     slide_bar.querySelector('#current').textContent = zero + currentSilde;
//     if (slides.length > 9) {
//         zero = '';
//     }
//     slide_bar.querySelector('#total').textContent = zero + slides.length;

//     slides.forEach((slide, i) => {
//         if (i === currentSlide - 1) {
//             slide.classList.add('show');
//             slide.classList.remove('hide');
//         } else {
//             slide.classList.add('hide');
//             slide.classList.remove('show');
//         }
//     });
// }
// slide_bar_counter(currentSlide, slides);


// slide_bar.addEventListener('click', e =>{
//     const target = e.target;

//     if(target && target.classList.contains('offer__slider-prev')) {
//         if (currentSlide === 1) {
//             currentSlide = slides.length;
//         } else {
//             currentSlide--;
//         };       
//         slide_bar_counter(currentSlide, slides);
//     }
//     if(target && target.classList.contains('offer__slider-next')) {
//         if (currentSlide === slides.length) {
//             currentSlide = 1;
//         } else {
//             currentSlide++;
//         };
//         slide_bar_counter(currentSlide, slides);
//     }
// });
}

export default slider;