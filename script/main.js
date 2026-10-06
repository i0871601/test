document.addEventListener('DOMContentLoaded', () => {
    let inputsHTML = '';
    let menuHTML = '';
    let contentHTML = '';

    Object.keys(MENU).forEach(key => {
        const item = MENU[key];

        if (item.group) {
            const groupInputId = `group-${key}`;
            inputsHTML += `<input type="radio" name="group_menu" id="${groupInputId}" class="input group-trigger">\n`;

            let subItemsHTML = '';
            if (GROUP[key]) {
                Object.keys(GROUP[key]).forEach(subKey => {
                    const subItem = GROUP[key][subKey];
                    const triggerId = `${key}-${subKey}`;
                    const contentId = `content-${triggerId}`;

                    inputsHTML += `<input type="radio" name="trigger" id="${triggerId}" class="input">\n`;
                    
                    subItemsHTML += `
                        <div class="menu-sub-item-wrapper" data-trigger="${triggerId}">
                            <a href="#${contentId}" class="menu-sub-item">${subItem.name}</a>
                        </div>\n`;

                    contentHTML += `<div class="content" id="${contentId}"></div>\n`;
                });
            }

            const groupBlockHTML = `
                <div class="menu-group-label" data-group="${groupInputId}">
                    <span>${item.name}</span>
                    <div class="dropdown-content">
                        ${subItemsHTML}
                    </div>
                </div>
            `;

            menuHTML += groupBlockHTML;

        } else {
            const triggerId = key;
            const contentId = `content-${triggerId}`;

            inputsHTML += `<input type="radio" name="trigger" id="${triggerId}" class="input">\n`;

            const itemMenuHTML = `
                <div class="menu-item-wrapper" data-trigger="${triggerId}">
                    <a href="#${contentId}" class="menu-item">${item.name}</a>
                </div>\n`;

            menuHTML += itemMenuHTML;
            contentHTML += `<div class="content" id="${contentId}"></div>\n`;
        }
    });

    document.body.insertAdjacentHTML('afterbegin', inputsHTML);
    
    const menuDesktop = document.getElementById('menu');
    const menuMobile = document.getElementById('menu_mobile');
    
    if (menuDesktop) menuDesktop.innerHTML = menuHTML;
    if (menuMobile) menuMobile.innerHTML = menuHTML;
    
    const contentSite = document.getElementById('Content-Site');
    if (contentSite) contentSite.insertAdjacentHTML('beforeend', contentHTML);
});

// Слухач кліку по блоках сімейства wrapper з data-trigger
document.addEventListener('click', (e) => {
    const triggerWrapper = e.target.closest('[data-trigger]');
    
    if (triggerWrapper) {
        const triggerId = triggerWrapper.dataset.trigger;
        const targetInput = document.getElementById(triggerId);

        if (targetInput) {
            targetInput.checked = true;

            document.querySelectorAll('.menu-item-wrapper, .menu-sub-item-wrapper, .content').forEach(el => {
                el.classList.remove('active');
            });

            document.querySelectorAll(`[data-trigger="${triggerId}"]`).forEach(el => {
                el.classList.add('active');
            });
        }
    }
});
