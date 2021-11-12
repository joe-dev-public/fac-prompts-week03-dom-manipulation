/*

    Notes:
        - IIRC there's some reason why using innerHTML "piecemeal" is bad. Better to concat a big string then innerHTML it all at once.
        - If you write a RegExp using 'single quotes', I think backslash character classes won't work.

    Todo:
        - Show the validation criteria at all times, and have them ticked or crossed when the user requests validation.
        - Add tests.

    Eh, maybe?
        - Update checkStringLength so that it doesn't pass if the string contains whitespace (or, it doesn't count whitespace).

*/

function windowLoaded() {


    const form = document.getElementById('form');

    const input = document.getElementById('input');

    const submit = document.getElementById('submit');

    const valid = document.getElementById('valid');


    // form.onsubmit = function() { return false; } // Pros and cons to either of these approaches?
    form.onsubmit = function(event) { event.preventDefault(); } // note the parens () after preventDefault, they're required!


    let validityChecks = {
        'whitespace': 'No spaces (or other whitespace :)',
        'short': '6 characters or longer',
        'case': 'One upper case and one lower case letter',
        'numbers': 'At least two numbers (digits)',
    };


    const validityCheckListItemIdPrefix = "validity-check-";


    function resetValidityIndicator() {

        valid.classList.remove('pass');
        valid.classList.remove('fail');

        let html = '<div id="answer"></div>';
        html += '    <ul id="reasons">';

        for (const [key, value] of Object.entries(validityChecks)) {

            html += `        <li id="${validityCheckListItemIdPrefix}${key}" class="pass">${value}</li>`;

        }

        html += '    </ul>';
        html += '</div>';

        valid.innerHTML = html;

    }


    function updateValidityIndicator(status) {

        resetValidityIndicator();

        const answerElement = document.getElementById('answer');
        const reasonsElement = document.getElementById('reasons');

        if (status === 'ok') {

            valid.classList.add('pass');
            answer.innerHTML = 'Yep 😌';

        } else {

            valid.classList.add('fail');
            answer.innerHTML = 'No!';

            // check for presence of error codes in status array and add pass/fail classes as necessary
            for (let i = 0; i < status.length; i++) {

                let id = validityCheckListItemIdPrefix + status[i];

                document.getElementById(id).classList.add('fail');

                //html += '<li>' + validityChecks[status[i]] + '</li>';
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

        let str = input.value;

        let ret = [];

        let pass = true;

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
            updateValidityIndicator('ok');
        } else {
            updateValidityIndicator(ret);
        }
    
    }

    submit.onclick = checkString;

}