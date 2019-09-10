console.log('client.js loaded');

$(document).ready(handleReady);

//global var to remember what operator the user clicked!
let operator = '';

function handleReady() {
  console.log('jquery ready!');

  addClickListeners();
  //retrieves on load the history on the server
  getHistory();
}

function addClickListeners() {
  $('#submit').on('click', handleSubmit);
  $('#plus').on('click', handlePlusClick);
  $('#minus').on('click', handleMinusClick)

}

function handlePlusClick() {
  console.log('plus clicked!');
  operator = '+';
}

function handleMinusClick() {
  console.log('plus clicked!');
  operator = '-';
}

function handleSubmit() {
  console.log('clicked submit');

  // Capture the inputs
  let num1 = $('#num1').val();
  let num2 = $('#num2').val();

  console.log(num1, num2);
  // get the operator and make data to send
  let dataToSend = {
    num1: num1,
    num2: num2,
    operator: operator
  }

  console.log(dataToSend)
  // POST TO SERVER

  $.ajax({
    type: 'POST',
    url: '/addCalc',
    data: dataToSend
  }).then(function (response) {
    console.log(response);
    getHistory();
  })
}

function getHistory() {
  $.ajax({
    type: 'GET',
    url: '/history'
  }).then(function (response) {
    console.log(response);
    appendToDom(response)
  })
}

function appendToDom(response) {

  const lastItemInArray = response[response.length - 1]

  $('#result').text(lastItemInArray.result);

  $('#history').empty();
  for (let item of response) {
    let listItem = $(`<li>${item.num1} ${item.operator} ${item.num2} = ${item.result}</li>`)
    $('#history').append(listItem);
  }
}