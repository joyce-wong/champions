// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://champions-c22af-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const recommendationsInDB = ref(database, "recommendations")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const recommendationsListEl = document.getElementById("recommendations-list")

onValue(recommendationsInDB, function(snapshot){
   

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearRecommendationsListEl()
    
        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let [currentItemID, currentItemValue] = currentItem
           
    
            addToList(currentItem)
            
        }
    } else {
        recommendationsListEl.innerHTML = "No items here...yet"
        // console.log("recommendationsListEl.innerHTML", recommendationsListEl.innerHTML)
    }

    
    // recommendationsArray.map(recommendation => {
    //     addToList(recommendation)
    // })
})

function clearRecommendationsListEl(){
    recommendationsListEl.innerHTML = ""
}

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(recommendationsInDB, inputValue)

    clearInputFieldEl()
    // addToList(inputValue)

})

onValue(recommendationsInDB, function(snapshot){
    console.log(snapshot.val())
})

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function addToList(item){
   let [itemID, itemValue] = item

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        console.log(itemID)
        let exactLocationOfItemInDB = ref(database, `recommendations/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    recommendationsListEl.append(newEl)
    
}