/*

    Notes:
        - IIRC there's some reason why using innerHTML "piecemeal" is bad. Better to concat a big string then innerHTML it all at once.
        - If you write a RegExp using 'single quotes', I think backslash character classes won't work.

    Todo:
        - Add tests.
        - Add more emoji to the success message.

*/

function windowLoaded() {


    const form = document.getElementById('form');

    const input = document.getElementById('input');

    const submit = document.getElementById('submit');

    const valid = document.getElementById('valid');


    // form.onsubmit = function() { return false; } // Pros and cons to either of these approaches?
    form.onsubmit = function(event) { event.preventDefault(); } // note the parens () after preventDefault, they're required!


    function updateValidityIndicator(status) {

        // Empty/reset the response content and styling:
        valid.classList.remove('pass');
        valid.classList.remove('fail');
        valid.innerHTML = '<div id="answer"></div>';
        const answerElement = document.getElementById('answer');

        // As this simple script succumbs to ~irresistible bloat, these could get chucked up front as config vars 😌
        let errorCodes = {
            whitespace: 'No spaces (or other whitespace characters :) allowed!',
            short: 'Too short: must be 6 characters or longer.',
            case: 'Needs at least one upper case and one lower case letter.',
            numbers: 'Needs at least two numbers (digits).',
        };

        if (status === 'ok') {
            valid.classList.add('pass');
            answer.innerHTML = 'Yep 😌';
        } else {

            answer.innerHTML = 'No!';

            let html = '<ul id="reasons">';

            // check for presence of error codes in status array and print all necessary
            for (let i = 0; i < status.length; i++) {
                valid.classList.add('fail');
                html += '<li>' + errorCodes[status[i]] + '</li>';
            }

            html += '</ul>';

            valid.innerHTML += html;

        }

    }


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