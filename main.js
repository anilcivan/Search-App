// Select necessary elements from the HTML
const formWrapper = document.querySelector('.form-wrapper'); // Select the div containing the form
const form = document.querySelector('#form'); // Select the form element
const searchInput = document.querySelector('#search'); // Select the search input
const buttonWrapper = document.querySelector('.button-wrapper'); // Select the div containing the buttons
const submit = document.querySelector('#submit'); // Select the submit button
const reset = document.querySelector('#reset'); // Select the reset button
const image = document.querySelector('.img-wrapper'); // Select the div where images will be displayed

// Initialize event listeners
runEventListeners();

function runEventListeners(){
    form.addEventListener('submit', search); // Call the search function when the form is submitted
}

function search(e){
    // Get the value from the search input, trimming any leading or trailing spaces
    const value = searchInput.value.trim();

    // Fetch request to Unsplash API
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method: 'GET',
        headers: {
            Authorization: 'Client-ID ...' // Client ID required for Unsplash API
        }
    })
    .then(res => res.json()) // Convert response to JSON
    .then(data => {
        // For each image in the results, call the addImage function
        Array.from(data.results).forEach((image)=> {
            addImage(image.urls.small);
        })
    })
    .catch(err => console.log(err)); // Log any errors to the console

    e.preventDefault(); // Prevent the page from refreshing when the form is submitted
}

function addImage(url) {
    // Create a new div element
    const div = document.createElement('div');
    div.className='card'; // Add the 'card' class to the newly created div

    // Create a new img element
    const img = document.createElement('img');
    img.setAttribute( 'src', url); // Set the src attribute of the newly created img element to the provided URL
    img.height = 400; // Set the height of the image
    img.width = 400; // Set the width of the image

    // Append the newly created img element to the newly created div element
    div.appendChild(img);
    // Append the newly created div element to the image div
    image.appendChild(div);
}
