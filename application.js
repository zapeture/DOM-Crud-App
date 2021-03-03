//THE CRUD APPLICATION
//DOM VARIABLE DECLERATION BEGINS HERE
const countryForm = document.getElementById('form');
const countryInput = document.getElementById('country');
const addCountry = document.getElementById('country-add');
const container = document.querySelector('.container');
const alertDiv = document.getElementById('alert');
const updateCountry = document.getElementById('country-update');
const listCountry = document.getElementById('the-list');
const documentBody = document.querySelector('body');
//DOM VARIABLE DECLERATION ENDS HERE

//utility functionality start here
updateCountry.style.display = 'none';
addCountry.style.display = 'block';
document.addEventListener('DOMContentLoaded', getCountries);
//utility functionality end here

// console.log(listCountry.previousElementSibling);

//load tasks
function getCountries() {
  let contries;

  if (localStorage.getItem('countries') === null) {
    contries = [];
  } else {
    contries = JSON.parse(localStorage.getItem('countries'));
  }

  contries.forEach(function (country) {});
}

//ADD FUNCTION

countryForm.addEventListener('submit', enteredInput);
function enteredInput(e) {
  if (countryInput.value === '') {
    //trgger alerts
    triggerAlerts(
      ` <strong>Please Enter Country in Text Field</strong>`,
      'alert alert-danger'
    );
  } else {
    //create a new link item
    const newLinkTag = document.createElement('li');
    newLinkTag.className = 'list-group-item list-group-item-success';
    //add the text node to the list item
    newLinkTag.appendChild(document.createTextNode(`${countryInput.value}`));
    //create itemtags
    const DeleteTag = document.createElement('i');
    const UpdateTag = document.createElement('i');
    //add classes to the item tags
    DeleteTag.className = 'delete fas fa-trash-alt float-right mr-4 mt-2 fa-lg';
    UpdateTag.className = 'update fas fa-pen-alt float-right mr-4 mt-2 fa-lg';
    //add styling to the color of the icons
    DeleteTag.style.color = '#ff0000';
    UpdateTag.style.color = '#ffff00';
    //appent icons to list item
    newLinkTag.appendChild(DeleteTag);
    newLinkTag.appendChild(UpdateTag);
    //commit to local storage
    commitToLocalStorage(`${countryInput.value}`);
    //trgger alerts
    triggerAlerts(
      ` <strong>${countryInput.value}</strong> has been added`,
      'alert alert-primary'
    );
    //clear the text input afterwards
    countryInput.value = '';
    //append the list item to the ul
    listCountry.appendChild(newLinkTag);
  }
  //retrive textinput from form
  e.preventDefault();
}

//UPDATE FUNCTION
listCountry.addEventListener('click', initUpdate);
function initUpdate(e) {
  if (e.target.classList.contains('update')) {
    //reveal update button
    updateCountry.style.display = 'block';
    addCountry.style.display = 'none';
    //retrieve parent element from the object element
    const oldElement = e.target.parentElement;
    //select text for displaying in text input
    const oldElementText = e.target.parentElement.childNodes[0].data;
    //assign the old to the input
    countryInput.value = oldElementText;

    // click event for the submit
    updateCountry.addEventListener('click', updateTheOld);
    function updateTheOld(e) {
      //check if the input value is empty or not
      if (countryInput.value === '') {
        //trgger alerts
        triggerAlerts(
          ` <strong>Please Enter Country in Text Field</strong>`,
          'alert alert-danger'
        );
      } else {
        addCountry.style.display = 'block';
        updateCountry.style.display = 'none';
        //create a new link tag
        const newTag = document.createElement('li');
        newTag.className = 'list-group-item list-group-item-success';
        //add the text node to the list item
        newTag.appendChild(document.createTextNode(`${countryInput.value}`));
        //trgger alerts
        triggerAlerts(
          ` <strong>${countryInput.value}</strong> has been updated`,
          'alert alert-warning'
        );

        //clear the text input afterwards
        countryInput.value = '';
        //create itemtags
        const upDeleteTag = document.createElement('i');
        const upUpdateTag = document.createElement('i');
        //add classes to the item tags
        upDeleteTag.className =
          'delete fas fa-trash-alt float-right mr-4 mt-2 fa-lg';
        upUpdateTag.className =
          'update fas fa-pen-alt float-right mr-4 mt-2 fa-lg';
        //add styling to the color of the icons
        upDeleteTag.style.color = '#ff0000';
        upUpdateTag.style.color = '#ffff00';
        //appent icons to list item
        newTag.appendChild(upDeleteTag);
        newTag.appendChild(upUpdateTag);
        // replacing
        listCountry.replaceChild(newTag, oldElement);
      }

      e.preventDefault();
    }
  }

  e.preventDefault();
}

// DELETE FUNCTIONALITY
listCountry.addEventListener('click', initDelete);
function initDelete(e) {
  if (e.target.classList.contains('delete')) {
    if (
      confirm(
        `Are you Sure You want to delete ${e.target.parentElement.childNodes[0].data}`
      )
    ) {
      //trgger alerts
      triggerAlerts(
        ` <strong>${e.target.parentElement.childNodes[0].data}</strong> has been deleted`,
        'alert alert-danger'
      );
      e.target.parentElement.remove();
    } else {
      //trgger alerts
      triggerAlerts(
        `<strong>${e.target.parentElement.childNodes[0].data}</strong> was <strong>not</strong> deleted`,
        'alert alert-success'
      );
    }
  }

  e.preventDefault();
}

function triggerAlerts(name, type) {
  alertDiv.innerHTML = `${name}`;
  alertDiv.classList = `${type}`;

  setTimeout(function () {
    alertDiv.innerHTML = ``;
    alertDiv.classList = ``;
  }, 3000);
}

function commitToLocalStorage(country) {
  let contries;

  if (localStorage.getItem('countries') === null) {
    contries = [];
  } else {
    contries = JSON.parse(localStorage.getItem('countries'));
  }

  contries.push(country);

  localStorage.setItem('countries', JSON.stringify(contries));
}
