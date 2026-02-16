const notify = document.getElementById('notify');
const clickSound = document.getElementById('clickSound');
const successSound = document.getElementById('successSound');
const bgMusic = document.getElementById('bgMusic');
let audioInitialized = false;

function initAudio() {
    if (!audioInitialized) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play blocked"));
        audioInitialized = true;
    }
}

function showNotification(message, type) {
    notify.textContent = message;
    notify.className = `notification ${type}`;
    notify.style.display = 'block';
    setTimeout(() => { notify.style.display = 'none'; }, 4000);
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.currentTarget; // Sử dụng currentTarget để chính xác hơn
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🔒";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
    if(clickSound) clickSound.play().catch(()=>{});
}

function checkStrength(password) {
    const bar = document.getElementById('strengthBar');
    const label = document.getElementById('strengthLabel');
    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (password.length === 0) {
        bar.style.width = "0%";
        label.textContent = "Strength: -";
        label.style.color = "#4a5568";
    } else if (strength <= 1) {
        bar.style.width = "33%";
        bar.style.backgroundColor = "#f56565";
        label.textContent = "Strength: Weak";
        label.style.color = "#f56565";
    } else if (strength === 2 || strength === 3) {
        bar.style.width = "66%";
        bar.style.backgroundColor = "#ed8936";
        label.textContent = "Strength: Medium";
        label.style.color = "#ed8936";
    } else {
        bar.style.width = "100%";
        bar.style.backgroundColor = "#48bb78";
        label.textContent = "Strength: Strong";
        label.style.color = "#48bb78";
    }
}

function toggleForm(type) {
    if(clickSound) clickSound.play().catch(()=>{});
    
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    
    document.querySelectorAll('.password-container input').forEach(i => i.type = "password");
    document.querySelectorAll('.toggle-password').forEach(s => s.textContent = "👁️");

    document.getElementById('strengthBar').style.width = "0%";
    document.getElementById('strengthLabel').textContent = "Strength: -";

    document.getElementById('loginSection').classList.toggle('form-active', type === 'login');
    document.getElementById('registerSection').classList.toggle('form-active', type === 'register');
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const trainerName = document.getElementById('regTrainerName').value.trim();
    const account = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value;
    const confirm = document.getElementById('regPassConfirm').value;

    if (trainerName.length < 2) { showNotification("Trainer Name must be at least 2 characters!", "error"); return; }
    if (!/^[a-zA-Z0-9]+$/.test(account)) { showNotification("Account ID cannot contain accents, spaces, or symbols!", "error"); return; }
    if (account.length < 3) { showNotification("Account ID must be at least 3 characters!", "error"); return; }
    if (pass.length < 6) { showNotification("Password must be at least 6 characters!", "error"); return; }
    if (pass !== confirm) { showNotification("Passwords do not match!", "error"); return; }

    const users = JSON.parse(localStorage.getItem('pokemon_users') || '{}');
    
    if (users[account]) {
        showNotification("Account ID already exists!", "error");
    } else {
        users[account] = { password: pass, trainerName: trainerName };
        localStorage.setItem('pokemon_users', JSON.stringify(users));
        showNotification("Registration successful!", "success");
        document.getElementById('registerForm').reset();
        toggleForm('login');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if(clickSound) clickSound.play().catch(()=>{});

    const account = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;

    const users = JSON.parse(localStorage.getItem('pokemon_users') || '{"admin":{"password":"123456","trainerName":"Admin"}}');

    const userData = users[account];
    if (userData) {
        const storedPass = (typeof userData === 'object') ? userData.password : userData;
        const trainerName = (typeof userData === 'object') ? userData.trainerName : account;

        if (storedPass === pass) {
            showNotification("Login successful!", "success");
            if(successSound) successSound.play().catch(()=>{});
            sessionStorage.setItem('trainerName', trainerName);
            localStorage.setItem('last_logged_in', JSON.stringify({account: account, password: pass}));
            setTimeout(() => { window.location.assign("game.html"); }, 1500);
        } else {
            showNotification("Invalid password!", "error");
            document.getElementById('loginPass').value = "";
        }
    } else {
        showNotification("Account does not exist!", "error");
    }
});

window.addEventListener('load', function() {
    const saved = localStorage.getItem('last_logged_in');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('loginUser').value = data.account;
        document.getElementById('loginPass').value = data.password;
    }
});