const input = document.getElementById('input');

const submit = document.getElementById('submit');

const valid = document.getElementById('valid');



function updateValidityIndicator(status) {

  valid.classList.remove('pass');
  valid.classList.remove('fail');
  valid.innerHTML = '';

  let errorCodes = {
    short: 'Too short: must be 6 characters or longer.',
    case: 'Needs at least one upper case and one lower case letter.',
    numbers: 'Needs at least two numbers (digits).',
  };

  if (status === 'ok') {
    valid.classList.add('pass');
    valid.innerText = 'Yes.';
  } else {
    valid.innerHTML = 'No:<br><br><ul>';
    // check for presence of error codes in status array and print all necessary
    for (let i = 0; i < status.length; i++) {
      valid.classList.add('fail');
      valid.innerHTML += '<li>' + errorCodes[status[i]] + '</li>';
    }
    valid.innerHTML += '</ul>';
  }

}



function checkStringLength(str) {
  if (str.length > 5) {
    return true;
  } else if (str.length <= 5) {
    return false;
  }
}

function checkStringCase(str) {
  let re1 = new RegExp('[a-z]+', 'g');
  let re2 = new RegExp('[A-Z]+', 'g'); // yes, this could be one regexp :P
  if (re1.test(str) === true && re2.test(str) === true) {
    return true;
  } else {
    return false;
  }
}

function checkStringNumbers(str) {
  let re = new RegExp(/\d+.*\d+/, 'g');
  if (re.test(str) === true) {
    return true;
  } else {
    return false;
  }
}



function checkString() {

  let str = input.value;

  let ret = [];

  let pass = true;

  if (checkStringLength(str) === false) {
    pass = false;
    ret.push('short');
  }

  if (checkStringCase(str) === false) {
    pass = false;
    ret.push('case');
  }

  if (checkStringNumbers(str) === false) {
    pass = false;
    ret.push('numbers');
  }

  if (pass === true) {
    updateValidityIndicator('ok');
  } else {
    updateValidityIndicator(ret);
  }
  
}

submit.onclick = checkString;
