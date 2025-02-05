let userData = {
    name: '',
    lastPeriod: '',
    cycleLength: 28,
    periodLength: 5,
    symptoms: [],
    trackingGoals: ['period']
};

function nextStep(currentStep) {
    // Validate and save data for current step
    if (!validateStep(currentStep)) return;

    // Hide current step
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    // Show next step
    document.getElementById(`step${currentStep + 1}`).classList.remove('hidden');
}

function prevStep(currentStep) {
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    // Show previous step
    document.getElementById(`step${currentStep - 1}`).classList.remove('hidden');
}

function validateStep(step) {
    switch(step) {
        case 1:
            const name = document.getElementById('userName').value.trim();
            if (!name) {
                alert('Please enter your name');
                return false;
            }
            userData.name = name;
            break;
        case 2:
            const lastPeriod = document.getElementById('lastPeriod').value;
            const cycleLength = document.getElementById('cycleLength').value;
            const periodLength = document.getElementById('periodLength').value;
            
            if (!lastPeriod || !cycleLength || !periodLength) {
                alert('Please fill in all fields');
                return false;
            }
            
            userData.lastPeriod = lastPeriod;
            userData.cycleLength = parseInt(cycleLength);
            userData.periodLength = parseInt(periodLength);
            break;
        case 3:
            const selectedSymptoms = Array.from(document.querySelectorAll('.symptom-checkbox input:checked'))
                .map(checkbox => checkbox.value);
            userData.symptoms = selectedSymptoms;
            break;
    }
    return true;
}

function finishOnboarding() {
    const selectedGoals = Array.from(document.querySelectorAll('.goal-checkbox input:checked'))
        .map(checkbox => checkbox.value);
    userData.trackingGoals = selectedGoals;

    // Save user data to localStorage
    localStorage.setItem('lunaUserData', JSON.stringify(userData));
    
    // Redirect to main dashboard
    window.location.href = 'ex.html';
}