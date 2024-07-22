// Cards

import { getResource } from "../services/services";

function cards() {
     
    class MenuCard {
        constructor(src, altimg, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.altimg = altimg;
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
                <img src=${this.src} alt=${this.altimg}>
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

    getResource('http://127.0.0.1:5000')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        })
    
    // axios.get('http://127.0.0.1:5000')
    //     .then(function (response) {
    //         response.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })


    // for (let key in data) {
    //     new MenuCard(...Object.values(data[key])).render();
    // }
}

export default cards;