// questions.js dosyası
var questionData = null

fetch('./json/questions.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then((data) => {
    // Veriyi global değişkende sakla
    questionData = data
    initializeWithFetchedData(questionData)
    // document.getElementById('question-data').textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => {
    // Hata yönetimi
    console.error('Fetch error:', error)
  })
let selectedCategoryValue = null
let selectedColorValue = null
let selectedPriceValue = null
let step = 0
let currentCategorySteps = null
document.location.search !=="" ? document.location.search ="" : ""

function initializeWithFetchedData(fetchedData) {
  let categoryForm = '<form id="categoryForm">'

  for (let i = 0; i < fetchedData.length; i++) {
    categoryForm += `
            <button
              type="checkbox"
              id=${fetchedData[i].name.toLowerCase()}
              name="category"
              value=${fetchedData[i].name}
            > ${fetchedData[i].name}</button>
            <br />`
  }
  // Form bitişini ekliyoruz
  categoryForm += '</form>'

  document.getElementById('form1').innerHTML = categoryForm
  // Event listener'ı ekleyelim.
  fetchedData.forEach((category) => {
    document
      .getElementById(category.name.toLowerCase())
      .addEventListener('click', function (event) {
        event.preventDefault()
        fetchedData.forEach((cat) => {
          document
            .getElementById(cat.name.toLowerCase())
            .classList.remove('active-button')
        })
        event.currentTarget.classList.add('active-button')
        selectedCategoryValue = event.target.value
      })
  })
}


function displayStepsForCategory(category) {
  currentCategorySteps = category.steps
  step = step + 1
  step > 2 ? console.log("index.js'te yönlendirme sağlanıyor.") : updateStep()
}
function updateStep() {

  // Eğer step 0'dan küçük veya currentCategorySteps'in uzunluğundan büyükse dön
  if (step < 0 || step >= step.length) return

  const stepData = currentCategorySteps[step]
  const stepElem = document.getElementById(`step${step + 1}`)
  stepElem.querySelector('.subTitle').innerHTML = `<h3>${stepData.title}</h3>`

  let formContent = ''
  let idType = stepData.type


  if (stepData.type === 'price') {
    stepData.answers.forEach((answer) => {
      formContent += `<button type="checkbox" value="${answer}" id="${idType}">€${answer}</button>` // Her bir değerin sonuna '€' işareti ekleniyor.
    })
  } else {
      // Metni düşük harfe çevir ve CSS sınıf isimlendirmesi için kullan
      stepData.answers.forEach((answer) => {
        let colorClass = `bg-${answer.toLowerCase()}`
        formContent += `<button type="checkbox" value="${answer}" id="${idType}" class="color-button ${colorClass} "></button>`
      })
  }
  stepElem.querySelector(`#form${step + 1}`).innerHTML = formContent

  const colorElements = document.querySelectorAll('#color')
  colorElements.forEach((element) => { 
    element.addEventListener('click', function (event) {
      event.preventDefault()
      selectedColorValue = event.target.value
      console.log(selectedColorValue)
    })
  })
  const priceElements = document.querySelectorAll('#price')

  priceElements.forEach((element) => {
    element.addEventListener('click', function (event) {
      event.preventDefault()
      selectedPriceValue = event.target.value
      console.log(selectedPriceValue)
    })
  })
}

function changeStep(direction) {
  if(selectedCategoryValue === null){
    alert("Kategori seçiminizi yapınız!")
  }else if (step=== 1 && selectedColorValue === null){
    alert("Color seçiminizi yapınız!")
  }else if(step=== 2 &&  selectedPriceValue === null){
    alert("Price seçiminizi yapınız!")

  }else{
     window.history.pushState({}, '', '?category=' + selectedCategoryValue);
    if (selectedColorValue !== null) {
      let currentURL = window.location.href
      let separator = currentURL.includes('?') ? '&' : '?'
      window.history.pushState(
        {},
        '',
        currentURL + separator + 'color=' + selectedColorValue
      )
    };
    if (selectedPriceValue !== null) {
      let currentURL = window.location.href
      let separator = currentURL.includes('?') ? '&' : '?'
      window.history.pushState(
        {},
        '',
        currentURL + separator + 'price=' + selectedPriceValue
      )
    };

    const step1Data = questionData.find(
      (item) => item.name === selectedCategoryValue
    );
    console.log(step);
    displayStepsForCategory(step1Data);
    
  }
 
  
}

//-----------------------------------
