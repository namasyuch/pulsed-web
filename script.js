const apiKey = "NdZHWisb9sffkidMu8wrSmEHXftHzgKMEb1FOF1i";

const title = document.getElementById("title");
const date = document.getElementById("date");
const image = document.getElementById("space-image");
const description = document.getElementById("description");
const datePicker = document.getElementById("date-picker");
const exploreButton = document.getElementById("explore-button");
const errorMessage = document.getElementById("error");

async function getPicture(selectedDate = "") {

    title.textContent = "Loading...";
    description.textContent = "Getting today's astronomy picture...";
    errorMessage.textContent = "";
    image.style.display = "none";

    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    if (selectedDate) {
        url += `&date=${selectedDate}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("NASA API request failed");
        }

        const data = await response.json();

        title.textContent = data.title;
        date.textContent = data.date;
        description.textContent = data.explanation;

        if (data.media_type === "image") {
            image.src = data.url;
            image.alt = data.title;
            image.style.display = "block";
        } else {
            image.style.display = "none";
            description.textContent += "\n\nToday's NASA post is a video.";
        }

    } catch (error) {
        title.textContent = "Something went wrong";
        description.textContent = "";
        errorMessage.textContent =
            "Could not load the NASA picture. Please try again.";
    }
}

exploreButton.addEventListener("click", function () {

    const selectedDate = datePicker.value;

    if (selectedDate) {
        getPicture(selectedDate);
    } else {
        getPicture();
    }

});

getPicture();
