'use strict'

/**
 * Para parar la columna:
 * Cuando nuestro wrapper se salga de la pantalla.
 *      Creamos un elemento en la parte de abajo de nuestra columna
 *      Le ponemos un intersection observer
 *      Cuando deje de intersectar sabremos que ha llegado al final.
 * Cuando llegue a ese limite se empiezan a borrar elementos empezando desde el ultimo generado
 *      Guardamos su altura del elemento que vamos a sacar
 *      Borramos el elemento
 *      Empujamos el wrapper (columna) hacia abajo con la altura guardada
 * 
 */

const elementsNumber = 100;
const velocity = 50;

function createMatrixNodeHTML(layerSelector){
    let top = Math.trunc(Math.random () * 100); // 100 es %
    let left = Math.trunc(Math.random () * 100);
    let layerHTML = document.querySelector(layerSelector);

    let html_wrapper_numbers = document.createElement('div');
    html_wrapper_numbers.style.top = top * -1 + '%';
    html_wrapper_numbers.style.left = left + '%';
    html_wrapper_numbers.classList.add('wrapper_numbers');

    add_numbers(html_wrapper_numbers);

    layerHTML.appendChild(html_wrapper_numbers);


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
    let passedWindowMargin = false;
    const initialTop = node_wrapper.style.top;
    let pixelsAdded = 0;
    let interval = setInterval(function(){
        if (passedWindowMargin || window.screen.availHeight < node_wrapper.offsetHeight + node_wrapper.offsetTop) {
            const childNodesLength = node_wrapper.childNodes.length;
            // node_wrapper.removeChild(node_wrapper.childNodes[childNodesLength -1]);
            const elementSizeBeforeRemove = node_wrapper.offsetHeight;

            node_wrapper.childNodes[childNodesLength -1].remove(); // Es lo mismo que en la linea 54
            const elementSizeAfterRemove = node_wrapper.offsetHeight;
            let sizeDiferenceAfterRemove = elementSizeBeforeRemove - elementSizeAfterRemove;
            const pixelsToAdd = pixelsAdded + sizeDiferenceAfterRemove;
            node_wrapper.style.top = `calc(${initialTop} + ${pixelsAdded}px`;
            pixelsAdded = pixelsToAdd;
            passedWindowMargin = true;
            if (childNodesLength < 2) {
                node_wrapper.style.top = initialTop;
                passedWindowMargin = false;
                pixelsAdded = 0;
            }            
        }else{
            let nodeNumber = create_box_number();
            node_wrapper.appendChild(nodeNumber);
        }
    }, velocity);
}

for (let i = 0; i < elementsNumber ; i++) {
    createMatrixNodeHTML('.layer1');
}

for (let i = 0; i < elementsNumber ; i++) {
    createMatrixNodeHTML('.layer2');
}