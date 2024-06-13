let output_value = document.getElementById('output_value')
let dot = document.getElementById('dot')
let clear = document.getElementById('clear')

let first_number = null
let second_number = null
let math_operator = ''
let new_number = null

let set_second_number = false
let is_operator_clicked = false
let is_equal_clicked = false
let is_dot_clicked = false

let operator_clicked_count = 0

let numbers = Array.from(document.querySelectorAll('#logic_button'))
let logic_signs = Array.from(document.querySelectorAll('.logic_signs'))

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => { if (output_value.innerHTML.length <= 12) { setNumbers(e) } })
}

dot.addEventListener('click', setNumbers)
clear.addEventListener('click', () => makeClear(true))

for (let i = 0; i < logic_signs.length; i++) {
    logic_signs[i].addEventListener('click', setOperator)
}

function makeClear(is_absolute_clear) {
    first_number = null
    second_number = null
    math_operator = ''
    set_second_number = false
    is_operator_clicked = false
    is_equal_clicked = false
    if(is_absolute_clear) {
        output_value.innerHTML = '0'
    }
}

function setNumbers(e) {
    if (is_equal_clicked && operator_clicked_count < 2) {
        makeClear(false)
    }
    if (set_second_number) {
        if (second_number === null && e.target.innerHTML != '.') {
            second_number = e.target.innerHTML
        } else if (second_number === null) {
            second_number = '0.'
        } else if (!is_dot_clicked) {
            second_number += e.target.innerHTML
        } else if (is_dot_clicked && e.target.innerHTML != '.') {
            second_number += e.target.innerHTML
        }
        output_value.innerHTML = second_number
    } else {
        if (first_number === null && e.target.innerHTML != '.') {
            first_number = e.target.innerHTML
        } else if (first_number === null) {
            first_number = '0.'
        } else if (!is_dot_clicked) {
            first_number += e.target.innerHTML
        } else if (is_dot_clicked && e.target.innerHTML != '.') {
            first_number += e.target.innerHTML
        }
        output_value.innerHTML = first_number
    }
    e.target.innerHTML == '.' ? is_dot_clicked = true : ''
}

function setOperator(e) {
    if (e.target.innerHTML == '=') {
        operate(first_number, second_number, math_operator)
        is_equal_clicked = true
        operator_clicked_count = 0
    } 
    else if (is_operator_clicked) {
        operate(first_number, second_number, math_operator)
        unstoppedMath(e)
    } else {
        output_value.innerHTML = 0
        set_second_number = true
        is_dot_clicked = false
        if (math_operator == '') {
            math_operator = e.target.innerHTML
        }
        operator_clicked_count++
        is_operator_clicked = true
    }
}

function unstoppedMath(e) {
    first_number = output_value.innerHTML
    second_number = null
    math_operator = ''
    is_dot_clicked = false
    if (math_operator == '') {
        math_operator = e.target.innerHTML
    }
    is_operator_clicked = true
    operator_clicked_count++
}

function operate(firstNumber, secondNumber, mathOperator) {
    if (second_number !== null) {
        new_number = eval(`${firstNumber}${mathOperator}${secondNumber}`)
        output_value.innerHTML = Number.isInteger(new_number) ? new_number : new_number.toFixed(2)
    }
}