let currentStep = 1

function changeStep(increment) {
  const totalSteps = 3
  let newStep = currentStep + increment

  if (newStep < 1 && currentStep === 1) {
    return
  } else if (newStep < 1) {
    newStep = totalSteps
  } else if (newStep > totalSteps) {
    window.location.href = 'product.html'
    return
  }

  document.getElementById('step' + currentStep).classList.remove('active')
  currentStep = newStep
  document.getElementById('step' + currentStep).classList.add('active')
  document.getElementById('dot' + currentStep).classList.add('active-dot')
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('step1').classList.add('active')
  document.getElementById('dot1').classList.add('active-dot')
})
