const searchQuery = 'apple';
const maxResults = 10;
const apiKey = 'your_api_key_here';

fetch(`https://api.example.com/search?q=${searchQuery}&maxResults=${maxResults}&apiKey=${apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data));



// In this example, we're constructing a URL that includes three parameters: q, maxResults, and apiKey. We're using template literals to include the values of these parameters in the URL string.

// When the API request is made using fetch, the parameters are included in the query string of the URL. The API server can then use these parameters to modify the response it returns.

// Note that the specific syntax for including parameters in a URL query string may vary depending on the API you're working with. Be sure to consult the API documentation for the correct syntax and parameter names.
