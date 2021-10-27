/*
Coding exercise: You are tasked to write a checker that validates the parentheses of a LISP code.  Write a program (in Node.js or JavaScript) which takes in a string as an input and returns true if all the parentheses in the string are properly closed and nested.
*/

function parentheseValidator (str) {

    let pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
	let stack = [];

    for (let i = 0; i < str.length; i++) {

        // If character is an opening brace add it to a stack
        if (str[i] === '(' || str[i] === '{' || str[i] === '[' ) {
            stack.push(str[i]);
        }
        //  If that character is a closing brace, pop from the stack
        else if (str[i] === ')' || str[i] === '}' || str[i] === ']' ) {
            let last = stack.pop();

            //If the popped element from the stack, which is the last opening brace doesn’t match the corresponding closing brace in the pairs, then return false
            if (str[i] !== pairs[last]) {
            	return false
            };
        }
    }

    if (stack.length !== 0)	{
    	return false;
    };

    return true;
}
