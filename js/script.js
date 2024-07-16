'use strict';

const data = {
    1: {
        src: 'img/tabs/vegy.jpg',
        alt: 'vegy',
        title: 'Меню "Фитнес"',
        descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        price: 9,
        parentSelector: '.menu .container',
        className: 'menu__item'
    },
    2: {
        src: 'img/tabs/elite.jpg',
        alt: 'elite',
        title: 'Меню “Премиум”',
        descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан! Заказывайте прямо сейчас!',
        price: 15,
        parentSelector: '.menu .container',
        className: 'menu__item'
    },
    3: {
        src: 'img/tabs/post.jpg',
        alt: 'post',
        title: 'Меню "Постное"',
        descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        price: 10,
        parentSelector: '.menu .container',
        className: 'menu__item'
    },
}

document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    const hideTabContent = () => {
        tabsContent.forEach(i => {
            // i.style.display = 'none';
            i.classList.add('hide');
            i.classList.remove('show', 'fade')
        });

        tabs.forEach(i => {
            i.classList.remove('tabheader__item_active');
        });
    }

    const showTabContent = (i = 0) => {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2024-10-21';

    const getTimeRemaning = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock()
        
        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };
    };

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
        //   modalCloseBtn = modal.querySelector('div[data-close]');

          
    const openModal = () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    };

    modalTrigger.forEach(btn =>{
            btn.addEventListener('click', (e) => {
                // modal.style.display = 'block';
                // modal.classList.add('show');
                // modal.classList.remove('hide');
            openModal();
        });
    }); 

    const closeModal = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };
 
    // modalCloseBtn.addEventListener('click', e => {
    //     closeModal(modal);
    // });

    modal.addEventListener('click', (e) =>{
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modal)
        }
    })
    
    const modalTimerId = setTimeout(function () {
        openModal()
    }, 30000);

    const showModelByScrol = () => {
        if(
            window.scrollY + document.documentElement.clientHeight + 2 >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener('scroll', showModelByScrol);
        }
    };

    window.addEventListener('scroll', showModelByScrol);


    // Menu items

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 90;
            this.changeToRouble();
        }

        changeToRouble() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>   
            `;
            this.parent.append(element);
        }
    }

    const menuItems = document.querySelectorAll('.menu .container .menu__item');
    menuItems.forEach(i => {i.remove()});

    // new MenuCard(
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     5,
    //     '.menu .container'
    // ).render();

    for (let key in data) {
        new MenuCard(...Object.values(data[key])).render();
    }

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Ваше сообщение отправлено, в ближайшее время мы с Вами свяжемся',
        failure: 'Oops! Some thing wrong...'
    }

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const obj = {};

            formData.forEach(function(value, key) {
                obj[key] = value;
            })

            fetch("http://127.0.0.1:5000/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });

            // const request = new XMLHttpRequest();
            // request.open('POST', 'http://127.0.0.1:5000/');
            // request.setRequestHeader('Content-Type', 'application/json');
            



            // request.send(jsonFormData);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
                    // console.log(request.response);
                    // showThanksModal(message.success);
                    // form.reset();
                    // statusMessage.remove();

            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thancksModal = document.createElement('div');
        thancksModal.classList.add('modal__dialog');
        thancksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thancksModal);
        setTimeout(() =>{
            thancksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com//posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         "Content-type": "application/json"
    //     }
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json))

});