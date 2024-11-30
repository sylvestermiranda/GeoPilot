import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";


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


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.uid);
        fetchUserData(user.uid); 
    } else {
        console.log("No user is logged in.");
        window.location.href = "index.html"; 
    }
});


function fetchUserData(userId) {
    const userRef = ref(database, 'users/' + userId);
    
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User data fetched:", userData);

            
            document.getElementById('userName').textContent = userData.name || 'N/A';
            document.getElementById('licenseStatus').textContent = userData.hasLicense || 'N/A';
            document.getElementById('userPhone').textContent = userData.phone || 'N/A';
            document.getElementById('parentEmail').textContent = userData.parentEmail || 'N/A';
            document.getElementById('parentPhone').textContent = userData.parentPhone || 'N/A';
            document.getElementById('userEmail').textContent = userData.email || 'N/A';
        } else {
            console.log("No user data found in Firebase.");
        }
    }).catch((error) => {
        console.error("Error fetching user data:", error);
    });
}


const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
         
        window.location.href = "index.html";  
    }).catch((error) => {
        console.error("Error during logout:", error);
    });
});