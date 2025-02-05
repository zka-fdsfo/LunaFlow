document.addEventListener('DOMContentLoaded', () => {
    // Initialize cycle progress
    const circle = document.querySelector('.progress-ring-circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100 * circumference);
        circle.style.strokeDashoffset = offset;
    }

    // Set initial progress (example: 50%)
    setProgress(50);

    // Mood Selection
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            moodButtons.forEach(b => b.style.backgroundColor = '');
            btn.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary');
        });
    });

    // Flow Intensity Selection
    const flowButtons = document.querySelectorAll('.flow-btn');
    flowButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            flowButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Generate Mini Calendar
    function generateCalendar() {
        const calendar = document.querySelector('.mini-calendar');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        // Create calendar header
        const header = document.createElement('div');
        header.className = 'calendar-header';
        days.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            header.appendChild(dayEl);
        });
        calendar.appendChild(header);

        // Create calendar grid
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        for(let i = 1; i <= 31; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = i;
            if(i === 14) day.classList.add('current');
            if(i >= 12 && i <= 16) day.classList.add('period');
            grid.appendChild(day);
        }
        calendar.appendChild(grid);
    }

    generateCalendar();

    // Add hover animations
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Symptom tag click handler
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            if(tag.textContent === '+ Add') {
                const symptom = prompt('Enter new symptom:');
                if(symptom) {
                    const newTag = document.createElement('span');
                    newTag.className = 'tag';
                    newTag.textContent = symptom;
                    tag.parentNode.insertBefore(newTag, tag);
                }
            }
        });
    });

    // Save notes automatically
    const notesTextarea = document.querySelector('textarea');
    notesTextarea.addEventListener('input', () => {
        localStorage.setItem('periodTrackerNotes', notesTextarea.value);
    });

    // Load saved notes
    const savedNotes = localStorage.getItem('periodTrackerNotes');
    if(savedNotes) {
        notesTextarea.value = savedNotes;
    }
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});