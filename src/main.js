import './style.css'

document.querySelector('#app').innerHTML = `
    <h1>Pulse Web 🌌</h1>
    <p>NASA Astronomy Picture of the Day</p>

    <h2 id="title">Loading...</h2>

    <p id="date"></p>

    <img id="space-image" src="" alt="NASA Astronomy Picture">

    <p id="description">Loading picture...</p>
`

const title = document.querySelector('#title')
const date = document.querySelector('#date')
const image = document.querySelector('#space-image')
const description = document.querySelector('#description')

fetch('https://science.nasa.gov/wp-json/wp/v2/apod-basic/')
    .then(response => response.json())
    .then(data => {
        const picture = data[0]

        title.textContent = picture.title
        date.textContent = picture.date
        image.src = picture.hdurl
        image.alt = picture.alt
        description.innerHTML = picture.explanation
    })
    .catch(() => {
        description.textContent = 'Could not load the NASA picture.'
    })