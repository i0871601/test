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
                    const contentId = `content-${triggerId}`;

                    inputsHTML += `<input type="radio" name="trigger" id="${triggerId}" class="input">\n`;
                    
                    subItemsHTML += `
                        <label for="${triggerId}" class="menu-sub-item-wrapper">
                            <a href="#${contentId}" class="menu-sub-item">${subItem.name}</a>
                        </label>\n`;

                    contentHTML += `<div class="content" id="${contentId}"></div>\n`;
                });
            }

            const groupBlockHTML = `
                <label for="${groupInputId}" class="menu-group-label">
                    <span>${item.name}</span>
                    <div class="dropdown-content">
                        ${subItemsHTML}
                    </div>
                </label>
            `;

            menuHTML += groupBlockHTML;

        } else {
            const triggerId = key;
            const contentId = `content-${triggerId}`;

            inputsHTML += `<input type="radio" name="trigger" id="${triggerId}" class="input">\n`;

            const itemMenuHTML = `
                <label for="${triggerId}" class="menu-item-wrapper">
                    <a href="#${contentId}" class="menu-item">${item.name}</a>
                </label>\n`;

            menuHTML += itemMenuHTML;
            contentHTML += `<div class="content" id="${contentId}"></div>\n`;
        }
    });

    // Вставка згенерованої структури в DOM
    document.body.insertAdjacentHTML('afterbegin', inputsHTML);
    document.getElementById('menu').innerHTML = menuHTML;
    document.getElementById('menu_mobile').innerHTML = menuHTML;
    document.getElementById('Content-Site').insertAdjacentHTML('beforeend', contentHTML);
});

document.addEventListener('change', (e) => {
    if (e.target.name === 'trigger') {
        const activeInputId = e.target.id;
        
        document.querySelectorAll('.menu-item-label, .menu-sub-item-label, .content').forEach(el => {
            el.classList.remove('active');
        });
        
        const activeLabel = document.querySelector(`label[for="${activeInputId}"]`);
        if (activeLabel) activeLabel.classList.add('active');
        
        const activeContent = document.getElementById(`content-${activeInputId}`);
        if (activeContent) activeContent.classList.add('active');
    }
});
