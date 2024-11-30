
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyACJclVcfGds9M9C7DcplKPjtBVXZ0Iy3w",
    authDomain: "gps-system-c1bff.firebaseapp.com",
    databaseURL: "https://gps-system-c1bff-default-rtdb.firebaseio.com",
    projectId: "gps-system-c1bff",
    storageBucket: "gps-system-c1bff.appspot.com",
    messagingSenderId: "428880230064",
    appId: "1:428880230064:web:812320cda5708753aa2d75",
    measurementId: "G-SYWLT8Q5J8",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const signupSection = document.getElementById("signup");
const loginSection = document.getElementById("login");


function showMessage(element, text, color, timeout = 5000) {
    element.textContent = text; 
    element.style.color = color; 
    element.classList.add("visible"); 

    
    setTimeout(() => {
        element.classList.remove("visible");
        element.textContent = "";  
    }, timeout);
}

 
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value;
    const phone = document.getElementById("signup-phone").value;
    const hasLicense = document.querySelector('input[name="driving-license"]:checked')?.value;
    const parentEmail = document.getElementById("parent-email").value;
    const parentPhone = document.getElementById("parent-phone").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const signupMessage = document.getElementById("signup-message");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            set(ref(database, `users/${user.uid}`), {
                name: name,
                phone: phone,
                hasLicense: hasLicense,
                parentEmail: parentEmail,
                parentPhone: parentPhone,
                email: email,
                password:password,
                uid: user.uid,
            })
                .then(() => {
                    showMessage(signupMessage, "Sign-Up Successful and Data Saved!", "green");
                    signupForm.reset();
                    setTimeout(() => {
                        window.location.href = "content.html";
                    }, 2000);
                })
                .catch((error) => {
                    showMessage(signupMessage, "Error saving user data: " + error.message, "red");
                });
        })
        .catch((error) => {
            showMessage(signupMessage, "Error during sign-up: " + error.message, "red");
        });
});

 
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const loginMessage = document.getElementById("login-message");

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            showMessage(loginMessage, "Login Successful!", "green");
            loginForm.reset();
            setTimeout(() => {
                window.location.href = "content.html";
            }, 2000);
        })
        .catch((error) => {
            showMessage(loginMessage, "Error during login: " + error.message, "red");
        });
});



 
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                alert("Logged out successfully!");
                window.location.href = "index.html"; // Redirect to login page
            })
            .catch((error) => {
                alert("Error during logout: " + error.message);
            });
    });
}

 
onAuthStateChanged(auth, (user) => {
    if (user) {
         
        console.log(`User is logged in: ${user.email}`);
        if (window.location.pathname.includes("content.html")) {
            window.location.href = "content.html";  
        }
    } else {
        console.log("No user is logged in.");
        if (window.location.pathname.includes("content.html")) {
            window.location.href = "content.html";  
        }
    }
});
