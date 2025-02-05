// Check if user has completed onboarding
if (!localStorage.getItem('lunaUserData')) {
    window.location.href = 'onboarding.html';
}

// Load user data
const userData = JSON.parse(localStorage.getItem('lunaUserData'));
document.getElementById('userName').textContent = userData.name;
document.getElementById('cycleLength').textContent = userData.cycleLength;
document.getElementById('periodLength').textContent = userData.periodLength;

// Initialize the progress ring
const circle = document.querySelector('.progress-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

// Calculate cycle progress
const lastPeriod = new Date(userData.lastPeriod);
const today = new Date();
const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
const cycleProgress = (daysSinceLastPeriod / userData.cycleLength) * 100;

setProgress(cycleProgress);
document.querySelector('.cycle-day').textContent = `Day ${daysSinceLastPeriod}`;

// Initialize Charts
function initializeCharts() {
    // Symptoms Chart
    const symptomsCtx = document.getElementById('symptomsChart').getContext('2d');
    new Chart(symptomsCtx, {
        type: 'bar',
        data: {
            labels: ['Cramps', 'Headache', 'Bloating', 'Fatigue', 'Mood Swings'],
            datasets: [{
                label: 'Frequency this month',
                data: [4, 2, 5, 3, 4],
                backgroundColor: 'rgba(255, 105, 180, 0.6)',
                borderColor: 'rgba(255, 105, 180, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    // Mood Chart
    const moodCtx = document.getElementById('moodChart').getContext('2d');
    new Chart(moodCtx, {
        type: 'pie',
        data: {
            labels: ['Happy', 'Sad', 'Angry', 'Neutral'],
            datasets: [{
                data: [8, 3, 2, 5],
                backgroundColor: [
                    'rgba(255, 105, 180, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    // Sleep Chart
    const sleepCtx = document.getElementById('sleepChart').getContext('2d');
    new Chart(sleepCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Hours of Sleep',
                data: [7, 6.5, 8, 7.5, 6, 8.5, 7],
                borderColor: 'rgba(255, 105, 180, 1)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(255, 105, 180, 0.1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// Initialize charts when the page loads
initializeCharts();

// Mood selection
const moodButtons = document.querySelectorAll('.mood-btn');
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        moodButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Calendar generation
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const daysInMonth = 30;
    const firstDay = 0;

    // Add day labels
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.className = 'calendar-day-label';
        dayLabel.textContent = day;
        calendar.appendChild(dayLabel);
    });

    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendar.appendChild(emptyDay);
    }

    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        if (i >= 5 && i <= 10) {
            day.classList.add('period-day');
        }
        
        calendar.appendChild(day);
    }
}

generateCalendar();

// Populate symptoms from user data
function populateSymptoms() {
    const symptomTags = document.getElementById('symptomTags');
    userData.symptoms.forEach(symptom => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = symptom;
        symptomTags.appendChild(tag);
    });
    
    // Add the "+ Add" button
    const addTag = document.createElement('span');
    addTag.className = 'tag';
    addTag.textContent = '+ Add';
    symptomTags.appendChild(addTag);
}

populateSymptoms();