/*****************************************************************************
            Note: inline quotes "//" are  what has to be included in the project.
                    Other quotes are just for the sake of my learning.
*******************************************************************************/

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

// Create the data object.
/*var data = {
  todo: [],
  completed: []
};*/

// We do not want data to be an empty object when there is already data we want it to be the object returned by
// JSON.parse() but if localStorage storage is empty then create a new element.

var data = (localStorage.getItem('todoList'))? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};


// When the app is started get the saved tasks from the local storage 'todoList'
/*console.log(localStorage.getItem('todoList')); */

// We got the stored data in JSON format and now we need to parse it to convert it into javascript object.
/*console.log(JSON.parse(localStorage.getItem('todoList')));*/
/*These SVG's will be dynamically added to the DOM by the below function into the lists.*/
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <rect class="nofill" width="22" height="22" /> <g> <g> <path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3 c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9 C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7 c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2 c0.6,0,1.1,0.5,1.1,1.1V7z"/> </g> <g> <g> <path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/> </g> <g> <path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z" /> </g> <g> <path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8 C14.6,17.7,14.3,18,14,18z"/> </g> </g> </g> </svg>'
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <rect y="0" class="nofill" width="22" height="22"/> <g> <path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8 c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/> </g> </svg>'

renderTodoList();

/* This can also be done by defining our own function instead of the callback but that is rdundant unless there are several buttons and all are doing the same thing. */
document.getElementById('add').addEventListener('click',function() {
    var value = document.getElementById('item').value;

    if(value) {
      additemTodo(value);
      document.getElementById('item').value='';

      data.todo.push(value);
      dataObjectUpdated();
    }
}); // parameters --> what kind of event, callback

// If data is stored in local storage we need to load them into the HTML when the app is started again. renderTodoList just does that.
function renderTodoList() {
  if(!data.todo.length && !data.completed.length) return;

  for(var i=0; i<data.todo.length; i++){
    var value = data.todo[i];
    additemTodo(value);
  }

  for(var j=0; j<data.completed.length; j++){
    var value = data.completed[j];
    additemTodo(value, true);
  }

}

function dataObjectUpdated(){
  /*console.log(JSON.stringify(data));*/
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem(){
/*  console.log(this.parentNode.parentNode);
*/
var item = this.parentNode.parentNode
var parent = item.parentNode;
var id = parent.id;
var value = item.innerText;

if(id=='todo'){
  data.todo.splice(data.todo.indexOf(value), 1);
}else{
  data.completed.splice(data.completed.indexOf(value), 1);
}

dataObjectUpdated();

parent.removeChild(item);
}


function completeItem(){
  var item = this.parentNode.parentNode
  var parent = item.parentNode;
  var id = parent.id;

  var value = item.innerText;

  if(id=='todo'){
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  }else{
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }

  dataObjectUpdated();

// Check if the element can be added to the completed list or tcan be re-added to todo list.
  var target = (id=='todo')?document.getElementById('completed'):document.getElementById('todo');
  /*if(id=='todo'){
    // It's a todo item to be completed.

  } else{
    // It's a completed item that can be undone.
  }*/
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}



function additemTodo(text, completed){
  var list = (completed)?document.getElementById('completed'):document.getElementById('todo');
  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing the item.
  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  // Add click event for completing the items.
  complete.addEventListener('click', completeItem);

/*  list.appendChild(item); --> This appends the new task at the bottom but we want them at the top.
*/
  list.insertBefore(item, list.childNodes[0]);
}
