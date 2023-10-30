document.addEventListener('DOMContentLoaded', function () {
  let currentStep = 0
  let selections = {
    category: null,
    color: null,
    price: null,
  }

  function initializeSteps() {
    const dots = document.querySelectorAll('.dot')
    step === 0 ? dots[0].classList.add('active') : ''
    document.querySelectorAll('.step').forEach((elem, index) => {
      elem.style.display = index === 0 ? 'block' : 'none'
    })
  }

  function generateStepContent() {
    const dots = document.querySelectorAll('.dot')
    dots.forEach((dot) => dot.classList.remove('active'))
    for (let i = 0; i <= currentStep; i++) {
      currentStep !== 3 ? dots[i].classList.add('active') : ''
    }

    if (currentStep === 1 && selectedColorValue !== null) {
      //step 2 color aşaması

      const colors = getColorsForCategory(selections.category)

      const form = document.getElementById('form2')
      form.innerHTML = ''

      colors.forEach((color) => {
        const button = document.createElement('button')
        button.type = 'button'
        button.textContent = color
        button.value = color
        button.addEventListener('click', function () {
          selections.color = color
          nextStep()
        })
        form.appendChild(button)
      })
    } else if (currentStep === 2 && selectedPriceValue !== null) {
      //step 3 price aşaması

      const prices = getPriceRangesForSelections(selections)

      const form = document.getElementById('form3')
      form.innerHTML = ''

      prices.forEach((price) => {
        const button = document.createElement('button')
        button.type = 'button'
        button.textContent = price
        button.value = price
        button.addEventListener('click', function () {
          selections.price = price
          nextStep()
        })
        form.appendChild(button)
      })
    }
  }

  function setStep(step) {
    document.querySelectorAll('.step').forEach((elem) => {
      elem.style.display = 'none'
    })

    const stepElem = document.getElementById(`step${step + 1}`)
    if (stepElem) {
      stepElem.style.display = 'block'
    }

    generateStepContent()

    if (step >= 3) {
      redirectToProductPage()
    }
  }

  function nextStep() {
    if (
      (selectedCategoryValue !== null && currentStep === 0) ||
      (selectedColorValue !== null && currentStep === 1) ||
      (selectedPriceValue !== null && currentStep === 2)
    ) {
      currentStep++
      setStep(currentStep)
    }
  }

  function previousStep() {
    if (selectedCategoryValue !== null && currentStep > 0) {
      currentStep--
      setStep(currentStep)
    }
  }

  function redirectToProductPage() {
    fetchProducts()
  }

  initializeSteps()

  function filterProducts(data) {
    const urlParams = new URLSearchParams(window.location.search)

    const query_category = urlParams.get('category')?.toLowerCase() || ''
    const query_color = urlParams.get('color')?.toLowerCase() || ''
    const query_priceRange = urlParams.get('price')?.split('-') || []
    const query_minPrice = Number(query_priceRange[0]) || 0
    const query_maxPrice =
      Number(query_priceRange[1]) || Number.MAX_SAFE_INTEGER
    const isMobile = window.innerWidth <= 768 ? 7 : 15

    return data
      .filter((product) => {
        const categoryMatch = product.category.some((cat) =>
          cat.toLowerCase().includes(query_category)
        )
        const colorMatch = query_color
          ? product.colors.some((color) =>
              color.toLowerCase().includes(query_color)
            )
          : true
        const priceMatch =
          product.price >= query_minPrice && product.price <= query_maxPrice

        return categoryMatch && colorMatch && priceMatch
      })
      .slice(0, isMobile)
  }

  async function fetchProducts() {
    try {
      const response = await fetch('../json/products.json')

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const filteredProducts = filterProducts(data)
      if (filteredProducts.length > 0) {
        localStorage.setItem(
          'filteredProducts',
          JSON.stringify(filteredProducts)
        )

        document.querySelector('#steps').innerHTML = 'LOADING..'

        const stepsElement = document.querySelector('#steps')
        stepsElement.innerHTML = 'LOADING...'
        stepsElement.className = ' loading-message'
        let productUrl = 'product.html'
        let query = document.location.search

        productUrl += query
        window.location.href = productUrl
      } else {
        displayNoProductsFound()
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  function displayNoProductsFound() {
    //  localStorage'dan önceki products'ı sil
    localStorage.removeItem('filteredProducts')

    document.querySelector('#steps').innerHTML = `
      <div id="product" class="product swiper-slide">
        <h3>Products Not Found.</h3>
      </div>`
  }
  document.getElementById('nextButton').addEventListener('click', nextStep)
  document.getElementById('backButton').addEventListener('click', previousStep)
})
