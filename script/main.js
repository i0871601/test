document.addEventListener('DOMContentLoaded', () => {
    let inputsHTML = '';
    let menuHTML = '';
    let mobileMenuHTML = '';
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

                    if (subItem.link) {
                        subItemsHTML += `<a href="#content-${triggerId}" class="menu-sub-item">${subItem.name}</a>\n`;
                    } else {
                        inputsHTML += `<input type="radio" name="trigger" id="${triggerId}" class="input">\n`;
                        subItemsHTML += `<label for="${triggerId}" class="menu-sub-item">${subItem.name}</label>\n`;
                    }

                    contentHTML += `<div class="content" id="content-${triggerId}"></div>\n`;
                });
            }

            const groupBlockHTML = `
                <label for="${groupInputId}" class="menu-group-label">${item.name}</label>
                <div class="dropdown-content">
                    ${subItemsHTML}
                </div>
            `;

            menuHTML += groupBlockHTML;

        } else {
            const triggerId = key;
            const contentId = `content-${triggerId}`;

            let itemMenuHTML = '';
            if (item.link) itemMenuHTML = `<a href="#${contentId}" class="menu-item menu-link">${item.name}</a>\n`;
            else {
                inputsHTML += `<input type="radio" name="trigger" id="${triggerId}" class="input">\n`;
                itemMenuHTML = `<label for="${triggerId}" class="menu-item">${item.name}</label>\n`;
            }

            menuHTML += itemMenuHTML;
            contentHTML += `<div class="content" id="${contentId}"></div>\n`;
        }
    });

    document.body.insertAdjacentHTML('afterbegin', inputsHTML);
    document.getElementById('menu').innerHTML = menuHTML;
    document.getElementById('menu_mobile').innerHTML = menuHTML;
    document.getElementById('Content-Site').insertAdjacentHTML('beforeend', contentHTML);
});