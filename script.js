const jokeText = document.querySelector('#joke-text');
const statusText = document.querySelector('#status');
const newJokeButton = document.querySelector('#new-joke');

const API_URL = 'https://v2.jokeapi.dev/joke/Any?safe-mode&type=single,twopart';

function setLoading(isLoading) {
  newJokeButton.disabled = isLoading;
  newJokeButton.innerHTML = isLoading
    ? '<span aria-hidden="true">⏳</span> Finding a joke...'
    : '<span aria-hidden="true">😂</span> Tell me a joke';
}

async function fetchJoke() {
  setLoading(true);
  statusText.textContent = '';
  jokeText.textContent = 'Loading a fresh joke...';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

    const data = await response.json();
    if (data.error) throw new Error(data.message || 'The API returned an error.');

    jokeText.textContent = data.type === 'twopart'
      ? `${data.setup} ${data.delivery}`
      : data.joke;
  } catch (error) {
    jokeText.textContent = 'Oops! We could not fetch a joke right now.';
    statusText.textContent = 'Please check your connection and try again.';
    console.error('Joke fetch error:', error);
  } finally {
    setLoading(false);
  }
}

newJokeButton.addEventListener('click', fetchJoke);
