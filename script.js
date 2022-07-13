
const default_mode = 'color'
const default_size = 16
const default_color = '#000000'
let mode = default_mode
let size = default_size
let color = default_color

function setColor(newColor){
    color = newColor
}

function setSize(newSize){
    size = newSize
}

function setMode(newMode){
    enableButton(newMode)
    mode = newMode
}

const colorbtn = document.getElementById('color')
const random = document.getElementById('random')
const eraser = document.getElementById('eraser')
const clear = document.getElementById('clear')
const slider = document.getElementById('slider')
const sizebtn = document.getElementById('size')
const grid = document.getElementById('grid')

colorbtn.onclick = () => setMode('color')
random.onclick = () => setMode('random')
eraser.onclick = () => setMode('eraser')
clear.onclick = () => resetGrid()
slider.onmousemove = (e) => newSize(e.target.value)
slider.onchange = (e) => changeSize(e.target.value)

let click = false
document.body.onmousedown = () => (click = true)
document.body.onmouseup = () => (click = false)

function changeSize(value){
    setSize(value)
    newSize(value)
    resetGrid()
}

function newSize(value){
    sizebtn.innerHTML = `${value} x ${value}`
}

function resetGrid(){
    grid.innerHTML = ''
    newGrid(size)
}

function newGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size ; i++){
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover' , changeColor)
        gridElement.addEventListener('mousedown' , changeColor)
        grid.appendChild(gridElement)
    }

}

function changeColor(e){
    if (e.type === 'mouseover' && !click ) return
    if (mode === 'random'){
        const R = Math.floor(Math.random() * 256)
        const G = Math.floor(Math.random() * 256)
        const B = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`

    }
    if (mode === 'color'){
        e.target.style.backgroundColor = color
    }
    else if (mode === 'eraser'){
        e.target.style.backgroundColor = '#FFFFFF'
    }
}

function enableButton(newMode) {
    if (mode === 'random'){
        random.classList.remove('selected')
    } 
    if (mode === 'color'){
        colorbtn.classList.remove('selected')
    }
    if (mode === 'eraser'){
        eraser.classList.remove('selected')
    }

    if (newMode === 'random'){
        random.classList.add('selected')
    }
    if (newMode === 'color'){
        colorbtn.classList.add('selected')
    }
    if (newMode === 'eraser'){
        eraser.classList.add('selected')
    }
}


window.onload = () => {
    newGrid(default_size)
    setMode(default_mode)
    console.log(mode)
}