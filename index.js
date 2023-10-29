document.addEventListener('DOMContentLoaded', function () {
  let currentStep = 0
  let selections = {
    category: null,
    color: null,
    price: null,
  }

  function initializeSteps() {
    // Initially hide all steps except the first
    document.querySelectorAll('.step').forEach((elem, index) => {
      elem.style.display = index === 0 ? 'block' : 'none'
    })

    // Initialize the first step's content here if necessary
  }

  function generateStepContent() {
    // Based on the current step and previous selections, generate the appropriate content
    // For example, if on step 2, use the 'category' selection to determine what colors to show
    if (currentStep === 1 && selectedColorValue !== null) {
      // assuming 0-index, this is step 2
      const colors = getColorsForCategory(selections.category) // define this function to return an array of colors based on the category
      // Add these colors to the form, e.g., by creating buttons or other input elements as needed
      // You might need to clear the existing form content first

      const form = document.getElementById('form2')
      form.innerHTML = '' // Clear existing content

      colors.forEach((color) => {
        const button = document.createElement('button')
        button.type = 'button' // prevent form submission
        button.textContent = color
        button.value = color
        button.addEventListener('click', function () {
          selections.color = color // update selection
          nextStep()
        })
        form.appendChild(button)
      })
    } else if (currentStep === 2 && selectedPriceValue !== null) {
      // this is step 3
      // Similar to above, use the selections to determine what content to generate
      // For example, use both 'category' and 'color' to determine available price ranges

      const prices = getPriceRangesForSelections(selections) // define this function based on your logic
      // Add these prices to the form in a similar way as the colors above

      const form = document.getElementById('form3')
      form.innerHTML = '' // Clear existing content

      prices.forEach((price) => {
        const button = document.createElement('button')
        button.type = 'button' // prevent form submission
        button.textContent = price
        button.value = price
        button.addEventListener('click', function () {
          selections.price = price // update selection
          nextStep()
        })
        form.appendChild(button)
      })
    }
  }

  function setStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach((elem) => {
      elem.style.display = 'none'
    })

    // Show the current step
    const stepElem = document.getElementById(`step${step + 1}`)
    if (stepElem) {
      stepElem.style.display = 'block'
    }

    // Generate content for the current step based on selections
    generateStepContent()

    // If we're past the last step, redirect to the product page
    if (step >= 3) {
      redirectToProductPage()
    }
  }

  function nextStep() {
    if (( selectedCategoryValue !== null && currentStep ===0 ) || ( selectedColorValue !== null && currentStep ===1 ) || ( selectedPriceValue !== null && currentStep ===2 )) {
      currentStep++
      setStep(currentStep)
    }
  }

  function previousStep() {
    if (selectedCategoryValue !== null &&  currentStep > 0) {
      currentStep--
      setStep(currentStep)
    }
  }

  function redirectToProductPage() {
    // Construct the URL with the selections

    //todo: loading css verilecek
    document.querySelector('#steps').innerHTML = "LOADİNG.."
    let productUrl = 'product.html'
    let query =  document.location.search
   
    productUrl += query
    window.location.href = productUrl
  }

  // Initialize the step views
  initializeSteps()
     // Attach click event listeners to the next and back buttons
    document.getElementById('nextButton').addEventListener('click', nextStep)
    document.getElementById('backButton').addEventListener('click', previousStep)
})
