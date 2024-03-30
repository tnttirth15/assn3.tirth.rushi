// event.js
document.addEventListener("DOMContentLoaded", function() {
    fetchEventData();
});

function fetchEventData() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var eventData = JSON.parse(xhr.responseText);
                displayEvents(eventData);
            } else {
                console.error('Failed to fetch event data');
            }
        }
    };

    xhr.open('GET', '../../data/event.json', true);
    xhr.send();
}

function displayEvents(events) {
    var eventsContainer = document.getElementById('events-container');

    events.forEach(function (event) {
        var eventBox = document.createElement('div');
        eventBox.classList.add('event-box');

        var image = document.createElement('img');
        image.src = event.image;
        eventBox.appendChild(image);

        var title = document.createElement('h3');
        title.textContent = event.title;
        eventBox.appendChild(title);

        var date = document.createElement('p');
        date.textContent = event.date;
        eventBox.appendChild(date);

        var description = document.createElement('p');
        description.textContent = event.description;
        eventBox.appendChild(description);

        eventsContainer.appendChild(eventBox);
    });
}

//Calender
document.addEventListener("DOMContentLoaded", function() {
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const daysContainer = document.querySelector('.days');

    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar() {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        currentMonthYear.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        daysContainer.innerHTML = '';

        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(currentYear, currentMonth, i);
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;
            if (day.getDay() === 0 || day.getDay() === 6) {
                dayElement.classList.add('weekend');
            }
            if (Math.random() < 0.2) {
                dayElement.classList.add('event');
            }
            daysContainer.appendChild(dayElement);
        }
    }

    prevMonthBtn.addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar();
    });

    renderCalendar();
});
