function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.hight = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWight = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWight;
}

export default calcScroll;