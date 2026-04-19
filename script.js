document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;

    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const modal = document.getElementById('cancel-modal');
    const closeModal = document.querySelector('.close-modal');

    // Timer logic (Simplified for multiple buttons)
    function startBtnTimer(btn) {
        let value = 30;
        btn.disabled = true;
        const originalText = btn.textContent;
        
        const interval = setInterval(() => {
            value--;
            btn.textContent = `${originalText} (${value}s)`;
            if (value <= 0) {
                clearInterval(interval);
                btn.disabled = false;
                btn.textContent = originalText;
            }
        }, 1000);
    }

    // Individual OTP Actions
    document.querySelectorAll('.resend-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            startBtnTimer(btn);
        });
    });

    document.querySelectorAll('.verify-submit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('OTP Verified Successfully');
        });
    });

    // Helper to focus next input
    function setupOtpFocus(containerId) {
        const inputs = document.querySelectorAll(`#${containerId} .otp-input`);
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    }

    setupOtpFocus('lm-otp');
    setupOtpFocus('cx-otp');

    // Function to update the view based on current step
    function updateStep(step) {
        // Update Tabs
        for (let i = 1; i <= totalSteps; i++) {
            const tab = document.getElementById(`step-tab-${i}`);
            const content = document.getElementById(`content-step-${i}`);
            
            if (tab) {
                if (i === step) {
                    tab.classList.add('active');
                    if (content) content.style.display = 'block';
                } else {
                    tab.classList.remove('active');
                    if (content) content.style.display = 'none';
                }
            }
        }

        const footer = document.getElementById('main-footer');
        const cancelTrigger = document.getElementById('request-cancel-trigger');

        // Update Buttons Visibility
        if (step === 1) {
            prevBtn.style.display = 'none';
            if (cancelTrigger) cancelTrigger.style.display = 'none';
            if (footer) footer.style.justifyContent = 'flex-end';
            nextBtn.style.display = 'block'; 
            nextBtn.textContent = 'Next';
        } else if (step === 2 || step === 3) {
            prevBtn.style.display = 'block';
            if (cancelTrigger) cancelTrigger.style.display = 'none';
            if (footer) footer.style.justifyContent = 'space-between';
            nextBtn.style.display = 'block';
            nextBtn.textContent = 'Next';
        } else if (step === 4) {
            prevBtn.style.display = 'block';
            if (cancelTrigger) cancelTrigger.style.display = 'block';
            if (footer) footer.style.justifyContent = 'space-between';
            nextBtn.textContent = 'Finish';
        }

        currentStep = step;
    }

    // Next Button Click
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            updateStep(currentStep + 1);
        } else {
            alert('Process Completed Successfully!');
        }
    });

    // Prev Button Click
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            updateStep(currentStep - 1);
        }
    });

    // Modal Logic
    const cancelTrigger = document.getElementById('request-cancel-trigger');
    if (cancelTrigger) {
        cancelTrigger.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize
    updateStep(1);
});
