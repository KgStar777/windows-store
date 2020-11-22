import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
    windowWidth = document.querySelectorAll('#width'),
    windowHeight = document.querySelectorAll('#height'),
    windowType = document.querySelectorAll('#view_type'),
    windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElements(event, element, prop) {
        element.forEach((item, index) => {
            item.addEventListener(event, () => {
                // console.log(item);
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = index;
                        break;
                    case 'INPUT':
                        if(item.getAttribute('type') === 'checkbox') {
                            index === 0 ? state[prop] = 'холодное' : state[prop] = 'теплое';
                            element.forEach((box, j) => {
                                box.checked = false;
                                if(index === j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
        //         if (element.length > 1) {
        //             state[prop] = index;    
        //         } else {
        //             state[prop] = item.value;
        //         } 
        //         console.log(state);
            });
        });       
    }

    bindActionToElements('click', windowForm, 'form');
    bindActionToElements('input', windowHeight, 'hight');  
    bindActionToElements('input', windowWidth, 'width');
    bindActionToElements('change', windowType, 'type');
    bindActionToElements('change', windowProfile, 'profile');
};


export default changeModalState;