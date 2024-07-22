// Modal

const openModal = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function modal(triggetSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggetSelector),
          modal = document.querySelector(modalSelector);
          
    // const openModal = () => {
    //     modal.classList.add('show');
    //     modal.classList.remove('hide');
    //     document.body.style.overflow = 'hidden';
    //     clearInterval(modalTimerId);
    // };

    modalTrigger.forEach(btn =>{
            btn.addEventListener('click', (e) => {
            openModal(modalSelector, modalTimerId);
        });
    }); 

    // const closeModal = () => {
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = '';
    // };
 
    modal.addEventListener('click', (e) =>{
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector)
        }
    })
    
    // const modalTimerId = setTimeout(function () {
    //     openModal(modalSelector, modalTimerId)
    // }, 30000);

    

    const showModelByScrol = () => {
        if(
            window.scrollY + document.documentElement.clientHeight + 2 >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModelByScrol);
        }
    };

    window.addEventListener('scroll', showModelByScrol);
}

export default modal;
export {closeModal, openModal};