import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');

        
        checkNumInputs('input[name="user_phone"]');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо за заявку, скоро с вами свяжемся',
        failure: 'Не удалось получить данные, повторите попытку'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'Post',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.insertAdjacentElement('beforeend', statusMessage);

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    // console.log('key in state', key, state[key]);
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove(); 
                    event.target.closest('[data-modal]').style.display = 'none';
                    document.body.style.overflow = '';
                }, 3000);
            });
        });
    });
};

export default forms;