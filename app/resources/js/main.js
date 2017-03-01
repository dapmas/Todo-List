/*****************************************************************************
            Note: inline quotes "//" are  what has to be included in the project.
                    Other quotes are just for the sake of my learning.
*******************************************************************************/

/*  console.log("Lolz"); */
/* console.log(document.getElementById('add')); */

/**********************************************************************************************************
    Where should we should put the script/ javascript tag in "header" or in "body"

    Well, the code above : console.log(document.getElementById('add'));
    will output the button tag if scpript tag is put at the bottom of the "body"
    tag but will output "Null" if it is put at the end of the header.
    Reason being html file is loaded top to bottom so if script is added in the header
    the DOM (Document Object Model) has not loaded yet hence the elements like button
    and it's ID are not available at the time of loading of the javascript file which
    could lead to may errors. So if you are designing your own js that uses the elements of the
    body then include script at the bottom of the body instead of header. If ypu are using
    some generic/library or pre-default js file that you are fetching from the internet
    then you shold include it at the ebd of the header becaus ewaiting till the end of the body generally
    slows down the performance but it's inevitable in case of custom designed script files.
***********************************************************************************************************/
/**********************************************************************************************************
    But if you want to add script in the head the you can use :
        window.onload = function(){
            console.log(docment.getElementById('add'));
        }
    This executes when the window has loaded.

***********************************************************************************************************/
/***********************************************************************************************************

        window.onload = function(){                         --> this runs second and returns "the button tag"
            console.log(docment.getElementById('add'));
        }

        console.log(docment.getElementById('add'));     --> this runs first and return "null"

************************************************************************************************************/

/*******************************************************************************
        Need to get the input field onclick of the button
        Can be done in two ways :
            1. using .onclick method
            2. using addEventListener method
*******************************************************************************/
// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list.

/* This can also be done by defining our own function instead of the callback but that is rdundant unless there are several buttons and all are doing the same thing. */
document.getElementById('add').addEventListener('click',function() {
    var value = document.getElementById('item').value;

    console.log(value);


}); // parameters --> what kind of event, callback
