function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Multi-Snake!!!';

    return element;
}

document.body.appendChild(component());