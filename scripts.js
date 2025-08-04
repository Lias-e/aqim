const form = document.querySelector('form');
const cityInput = document.getElementById('city');

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

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    const apiURL = `https://api.aladhan.com/v1/calendarByCity/from/${startDate}/to/${endDate}?city=${city}&country=Algeria&shafaq=general&calendarMethod=UAQ`
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            
            // find today's prayer time

            const todayData = data.data[0]; 
            const timings = todayData.timings;

            const prayerDiv = document.getElementById('prayer-time');
            prayerDiv.innerHTML ='';

            for (const [prayer, time] of Object.entries(timings)){
                const div = document.createElement('div');
                div.innerHTML = `<div class="prayers__next"><h2 class="prayers__name">${prayer}</h2><h2 class="prayers__time">${time}</h2></div>`;
                prayerDiv.appendChild(div)
            }

        })
        .catch(error => {
            console.log("API Error:", error);
        });
}
);

// --------------------------UI: Prayers List------------------------------------


