'use strict'

const elementsNumber = 100;
const velocity = 10;

function createMatrixNodeHTML(layerSelector){
    let top = Math.trunc(Math.random () * 100);
    let left = Math.trunc(Math.random () * 100);
    let layer = document.querySelector(layerSelector);

    let html_wrapper_numbers = document.createElement('div');
    html_wrapper_numbers.style.top = top * -1 + '%';
    html_wrapper_numbers.style.left = left + '%';
    html_wrapper_numbers.classList.add('wrapper_numbers');

    add_numbers(html_wrapper_numbers);

    layer.appendChild(html_wrapper_numbers);


    return html_wrapper_numbers;
}

function get_random_number(){
    let number_random_0_9 =  Math.trunc (Math.random () * 9);
    return number_random_0_9;
}

function create_box_number(){
    let box_number = document.createElement('p');
    box_number.classList.add('wrapper_numbers-p');

    box_number.innerHTML = get_random_number();
    return box_number;
}

function add_numbers(node_wrapper){
    let interval = setInterval(function(){
        let nodeNumber = create_box_number();
        node_wrapper.appendChild(nodeNumber);
    }, velocity);
}

for (let i = 0; i < elementsNumber ; i++) {
    createMatrixNodeHTML('.layer1');
}

for (let i = 0; i < elementsNumber ; i++) {
    createMatrixNodeHTML('.layer2');
}