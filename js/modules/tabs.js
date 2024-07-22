// Tabs

function tabs(
    tabsSelector,
    tabsContentSelector,
    tabsParentSelector,
    ativeClass
) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    const hideTabContent = () => {
        tabsContent.forEach(i => {
            // i.style.display = 'none';
            i.classList.add('hide');
            i.classList.remove('show', 'fade')
        });

        tabs.forEach(i => {
            i.classList.remove(ativeClass);
        });
    }

    const showTabContent = (i = 0) => {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(ativeClass);
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;