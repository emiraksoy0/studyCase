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

function initializeWithFetchedData(fetchedData) {
  let categoryForm = '<form id="categoryForm">'

  for (let i = 0; i < fetchedData.length; i++) {
    categoryForm += `
            <input
              type="button"
              id=${fetchedData[i].name.toLowerCase()}
              name="category"
              value=${fetchedData[i].name}
            />
            <br />`
  }
  // Form bitişini ekliyoruz
  categoryForm += '</form>'

  document.getElementById('form1').innerHTML = categoryForm
}

//---------------------------------

function initializeWithFetchedData(questionData) {
  var colorData = questionData.map(function (color) {
    return color.steps[1].answers
  })
  console.log(colorData)
}

//-----------------------------
