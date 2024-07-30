// Forms

import { closeModal, openModal } from "./modal";

import { postData } from "../services/services";

function forms (formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Ваше сообщение отправлено, в ближайшее время мы с Вами свяжемся',
        failure: 'Oops! Some thing wrong...'
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },  
    //         body: data,
    //     });

    //     return await res.json();
    // };

    function bindPostData(form) {
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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch((error) => {
                console.error('Ошибка при отправке запроса:', error);
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;