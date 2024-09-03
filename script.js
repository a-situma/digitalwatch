// Populate the timezone selector. Exlude continents
function populateTimeZones() {
    const timeZoneSelector = document.getElementById('timezone-selector');
    const timeZones = Intl.supportedValuesOf('timeZone');

    // Exclude continents by filtering out entries that don't have a slash ("/")
    const filteredTimeZones = timeZones.filter(timeZone => timeZone.includes('/'));

    filteredTimeZones.forEach(timeZone => {
        const option = document.createElement('option');
        option.value = timeZone;
        option.textContent = timeZone.replace('_', ' ');
        timeZoneSelector.appendChild(option);
    });
}

// Update the time based on the selected time zone
function updateTime() {
    const timeDisplay = document.getElementById('time');
    const timeZoneSelector = document.getElementById('timezone-selector');
    const selectedTimeZone = timeZoneSelector.value || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const now = new Date();
    const options = { timeZone: selectedTimeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);

    timeDisplay.textContent = timeString;
}

// Update the full date
function updateDate() {
    const fullDateDisplay = document.getElementById('full-date');
    const now = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    fullDateDisplay.textContent = `${day}, ${month} ${date}, ${year}`;
}

// Update both time and date
function updateWatch() {
    updateTime();
    updateDate();
}

populateTimeZones();
document.getElementById('timezone-selector').addEventListener('change', updateTime);
setInterval(updateWatch, 1000);
updateWatch();
