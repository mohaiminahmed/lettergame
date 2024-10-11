// Function to show keyboard based on selection
function showKeyboard(type) {
    const keysContainer = document.getElementById('keyboard-container');
    const display = document.getElementById('display');

    // Clear previous keys
    keysContainer.innerHTML = '';

    // Clear active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the clicked nav item
    event.target.classList.add('active');

    if (type === 'capital') {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        createKeys(letters);
    } else if (type === 'small') {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        createKeys(letters);
    } else if (type === 'numbers') {
        const numbers = '012345678910';
        createKeys(numbers);
    }
}

// Function to create keys dynamically
function createKeys(chars) {
    const keysContainer = document.getElementById('keyboard-container');
    for (let i = 0; i < chars.length; i++) {
        const key = document.createElement('div');
        key.classList.add('key');
        key.innerText = chars[i];
        key.onclick = function() {
            // Remove 'selected' class from all keys
            const allKeys = document.querySelectorAll('.key');
            allKeys.forEach(k => {
                k.classList.remove('selected'); // Reset the selected state
            });

            // Set selected class for the clicked key
            key.classList.add('selected'); // Highlight the clicked key

            // Update the display with the clicked key
            const display = document.getElementById('display');
            display.innerText = chars[i]; // Show only the clicked key

            // Show the popup with the clicked key
            showPopup(chars[i]);

            // Play the sound associated with the clicked key
            playSound(chars[i]);
        };
        keysContainer.appendChild(key);
    }
}

// Function to play sound
function playSound(key) {
    let audioFile;

    // Determine the audio file based on the clicked key
    if (key >= 'A' && key <= 'Z') { // Capital letters
        audioFile = `sounds/a.mp3`; // Shared sound for A, etc.
        if (key !== 'A') {
            audioFile = `sounds/${key.toLowerCase()}.mp3`; // Sound for other capital letters
        }
    } else if (key >= 'a' && key <= 'z') { // Small letters
        audioFile = `sounds/a.mp3`; // Shared sound for a, etc.
        if (key !== 'a') {
            audioFile = `sounds/${key}.mp3`; // Sound for other small letters
        }
    } else { // Numbers
        audioFile = `sounds/${key}.mp3`; // Sound for numbers
    }

    // Create an audio object and play the sound
    const audio = new Audio(audioFile);
    audio.play();
}

// Function to show popup with the selected key
function showPopup(key) {
    // Check if a popup already exists, if so, remove it first
    let existingPopup = document.getElementById('popup');
    if (existingPopup) {
        document.body.removeChild(existingPopup);
    }

    // Create a new popup
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.innerText = key;
    popup.style.backgroundColor = '#FFB6C1'; // Light background
    popup.style.color = 'black'; // Text color
    popup.style.padding = '20px';
    popup.style.borderRadius = '5px';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = '2000'; // Ensure it's above other elements
    document.body.appendChild(popup);

    // Close the popup when clicked
    popup.onclick = function() {
        document.body.removeChild(popup);
    };
}

// Initial setup
showKeyboard('capital'); // Show capital letters by default
