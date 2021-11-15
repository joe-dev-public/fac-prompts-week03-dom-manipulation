/*

    Notes:
        - IIRC there's some reason why using innerHTML "piecemeal" is bad. Better to concat a big string then innerHTML it all at once.
        - If you write a RegExp using 'single quotes', I think backslash character classes won't work.

    Todo:
        - Fix the validation so that any chars OTHER than [0-9][a-z][A-Z] aren't allowed.
        - Have validation criteria shown at all times, but give them a neutral symbol (like a bullet point!) before the user submits a name for the first time/when the page is refreshed, etc.
        - Don't do anything if the input is blank?
        - Add tests.

    Eh, maybe?
        - Update checkStringLength so that it doesn't pass if the string contains whitespace (or, it doesn't count whitespace).

*/

function windowLoaded() {


    const formElement = document.getElementById('form');
    const inputElement = document.getElementById('input');
    const submitElement = document.getElementById('submit');
    const validElement = document.getElementById('valid');
    const answerTextElement = document.getElementById('answertext');
    const reasonsElement = document.getElementById('reasons');

    // formElement.onsubmit = function() { return false; } // Pros and cons to either of these approaches?
    formElement.onsubmit = function(event) { event.preventDefault(); } // note the parens () after preventDefault, they're required!


    let validityChecks = {
        'whitespace': 'No spaces (or other whitespace :)',
        'short': '6 characters or longer',
        'case': 'One upper case and one lower case letter',
        'numbers': 'At least two numbers (digits)',
    };


    const validityCheckListItemIdPrefix = "validity-check-";


    function resetValidityIndicator() {

        validElement.classList.remove('pass');
        validElement.classList.remove('fail');
        validElement.classList.add('neutral');

        answerTextElement.innerHTML = '(enter a codename)';

        let html = '';

        for (const [key, value] of Object.entries(validityChecks)) {

            html += `<li id="${validityCheckListItemIdPrefix}${key}">${value}</li>`;

        }

        reasonsElement.innerHTML = html;

    }


    function updateValidityIndicator(pass, errors) {

        resetValidityIndicator();

        // Need to change the logic here, now: *always* update all reasons (pass or fail), etc.

        if (pass === true) {

            validElement.classList.remove('neutral');
            validElement.classList.add('pass');
            answerTextElement.innerHTML = 'Yes';

        } else {

            validElement.classList.remove('neutral');
            validElement.classList.add('fail');
            answerTextElement.innerHTML = 'No!';

        }

        let reasonListElements = reasonsElement.children;

        for (let i = 0; i < reasonListElements.length; i++){

            // fix: this doesn't work if status array is empty. so.. handle that efficiently :) 

            // For every list element, check how to flag it:
            if (errors.some( (el) => { if (validityCheckListItemIdPrefix + el === reasonListElements[i].getAttribute('id')) { return true; } } ) === true) {

                // fail

                reasonListElements[i].classList.remove('pass');
                reasonListElements[i].classList.add('fail');

            } else {

                // pass
                //console.log(reasonListElements[i]);

                reasonListElements[i].classList.remove('fail');
                reasonListElements[i].classList.add('pass');

            }

        }

    } // end of function updateValidityIndicator


    function checkStringWhitespace(str) {
        let re = new RegExp(/\s+/, 'g');
        if (re.test(str) === false) {
            return true;
        } else {
            return false;
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

        let str = inputElement.value;

        let ret = [];

        let pass = true;

        // If the user hasn't entered anything, then reset.
        if (str.length === 0){
            resetValidityIndicator();
            return false;
        }

        if (checkStringWhitespace(str) === false) {
            pass = false;
            ret.push('whitespace');
        }

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
            updateValidityIndicator(true, ret);
        } else {
            updateValidityIndicator(false, ret);
        }
    
    }

    submitElement.onclick = checkString;

    resetValidityIndicator();

}