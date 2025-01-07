// Write a Function to swap 2 numbers using javascript.

var    a = 10;
var     b = 20;

let temp = a;
a = b;
b = temp;

console.log("A="+ a);
console.log("B="+b);

//Check whether the string passed is palindrome using javascript

function palindrome(text)
{
   const checklowercase = text.toLowerCase();

    const reversetect = checklowercase.split('').reverse().join('');

    if (checklowercase===reversetect)
{

    console.log(`${text} is Palindrome`);
}

else

{
    console.log(`${text} is not palindrom`);
}



}

palindrome("siva")


// Write a function to reverse a string using javascript.
function text_reverse(text)

{
    const reversetext = text.split('').reverse().join("");
    console.log(`${reversetext} is the reversed string`)
}


text_reverse("elred")

//Write a program to print numbers from 1 to 30. For multiples of 3, print “Fizz” instead of the number, and for multiples of 5, print “Buzz”. For multiples of both 3 and 5, print “FizzBuzz”.
function siva()

{
    for(let i=1;i<=30;i++){
        if (i%3 ==0)
            {
                console.log("fizz");
            }

            else if (i%5==0)
            {
                console.log("buzz")
            }
            else if(i%3==0 && i%5==0){
                console.log("fizzbuzz");
            }
            else{

                console.log(i);
            }

    }

   
}

siva()
