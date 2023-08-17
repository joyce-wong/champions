// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://champions-c22af-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const recommendationsInDB = ref(database, "recommendations")

onValue(recommendationsInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())
    let recommendationsArray = itemsArray
    
    clearInputFieldEl()

    recommendationsArray.map(recommendation => {
        addToList(recommendation)
    })
})

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const recommendationsListEl = document.getElementById("recommendations-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(recommendationsInDB, inputValue)

    clearInputFieldEl()
    addToList(inputValue)

})

onValue(recommendationsInDB, function(snapshot){
    console.log(snapshot.val())
})

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function addToList(itemValue){
    recommendationsListEl.innerHTML += `<li>${itemValue}</li>`
    
}