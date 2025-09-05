const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLessons(json.data))
};

const removeActive = ()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn) => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
     fetch(url)
     .then((res) => res.json())
     .then(data =>{
        removeActive() //remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add("active")//add active class
        displayLevelWords(data.data)
     })
}

const displayLevelWords = (words) =>{
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ""
    if(words.length === 0){
        wordContainer.innerHTML = `
              <div class="text-center col-span-full">
              <img class="mx-auto"
              src="./assets/alert-error.png" alt="">
            
        <p class="bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
        
        <h2 class="font-bold text-4xl bangla-font mt-2">নেক্সট Lesson এ যান</h2>
        </div>
        `
        return
    }
    for(let word of words){
        const card = document.createElement("div")
        card.innerHTML= `
              <div class="bg-white rounded-xl shadow-sm text-center px-4 py-10">
            <h2 class="font-bold text-xl mb-2"> ${word.word ? word.word:"শব্দ পাওয়া যায়নি"} </h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <div class="text-2xl mt-2 font-medium bangla-font"> ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি" } / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি" } </div>
            <div class="flex justify-between item-center mt-5 ">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card)
        
    }
}

const displayLessons = (lessons)=>{
    //get the container & empty
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML =""
//get into every lesson
    for(let lesson of lessons){
        //3.create element
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
             <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary lesson-btn">Lesson - ${lesson.level_no}
             </button>
        `
        //4.append into container
        levelContainer.append(btnDiv)
    }
        
}

loadLessons();