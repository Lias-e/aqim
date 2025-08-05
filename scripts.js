const cityForm = document.getElementById('cityForm');
const cityInput = document.getElementById('city');
const cityAuto = document.getElementById('cityAuto');

const today = new Date();
const startDay = today.getDate();
const startMonth = today.getMonth() + 1;
const startYear = today.getFullYear();
const startDate = `${startDay}-${startMonth}-${startYear}`;

const end = new Date();
end.setDate(end.getDate() + 6);

const endDay = end.getDate();
const endMonth = end.getMonth() + 1;
const endYear = end.getFullYear();
const endDate = `${endDay}-${endMonth}-${endYear}`;

// -------------------------------------------------
// Geo location
// -------------------------------------------------

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve({ lat, lon });
            },
            (error) => {
                reject(error);
            }
        );
    });
}


// -------------------------------------------------

cityForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const { lat, lon } = await getUserLocation();

        const apiURL = `https://api.aladhan.com/v1/calendar/from/${startDate}/to/${endDate}?latitude=${lat}&longitude=${lon}&shafaq=general&calendarMethod=UAQ`;

        const response = await fetch(apiURL);
        const data = await response.json();

        const todayData = data.data[0];
        const timings = todayData.timings;

        const prayerDiv = document.getElementById('prayer-time');
        prayerDiv.innerHTML = '';

        for (const [prayer, time] of Object.entries(timings)) {
            const div = document.createElement('div');
            div.innerHTML = `<div class="prayers__next"><h2 class="prayers__name">${prayer}</h2><h2 class="prayers__time">${time}</h2></div>`;
            prayerDiv.appendChild(div)
        }

    }
    catch (error) {
        console.error('Error fetching prayer times:', error);
        alert("Failed to get prayer times. Please check your internet connection.");
    }

});

// --------------------------UI: Prayers List------------------------------------


