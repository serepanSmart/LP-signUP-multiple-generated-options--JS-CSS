const signUpContainer = document.querySelector('.signup__container')
const h1 = signUpContainer.querySelector('h1')
const nextStep = signUpContainer.querySelector('#next-step')
const backButton = signUpContainer.querySelector('.signup__container button')
const selectContainer = document.querySelector('#steps')

let answerObject = {
  describe: '',
  service: [],
  photoFor: [],
  primaryIndustry: [],
  primaryIndustryCustom: '',
  moreInfo: '',
}

const toStorage = () =>
  localStorage.setItem('answer', JSON.stringify(answerObject))

const thankYouBtn = `<button type="button" onclick = "toHome()" style="justify-content: center" class="signup__button main-btn main-btn_hollow">
Ok
</button>`

const completeTemplate = () => {
  let choose3D = answerObject.service.find(
    (item) => item === '3D animation / short videos'
  )
  if (choose3D) {
    signUpContainer.innerHTML = `<h1 style="text-align: center">Thank you for your interest in our services! We will send you an email outlining your price estimate after reviewing your project specifications</h1>${thankYouBtn}`
  } else
    signUpContainer.innerHTML = `<h1 style="text-align: center">Thank you!</h1>${thankYouBtn}`
}

let isErrorMessage = false

const setErrorMessage = () => {
  if(!isErrorMessage) {
    const span = document.createElement('span')
    span.classList.add('signup__error')
    span.innerHTML = `Please select the desired option`
    signUpContainer.append(span)
    isErrorMessage = true
  }
}

const removeErrorMessage = () => {
  const errorText = signUpContainer.querySelector('.signup__error')
  if (errorText) {
    isErrorMessage = false
    return errorText.parentNode.removeChild(errorText)
  }
}

const toHome = () => {
  document.location.href = 'index.html'
  localStorage.removeItem('answer')
}

const toHtml = (
  button
) => `<button type="button" class="${button.class}" data-step="${button.step}" data-current="${button.currentStep}" value="${button.value}">
<img src="${button.img}" alt="${button.alt}" /> ${button.value}
</button>`

const toTemplate = (step) => {
  const html = buttons
    .filter((item) => item.currentStep === step)
    .map(toHtml)
    .join('')
  selectContainer.innerHTML = html
}

const setListeners = (step, render) => {
  nextStep.onclick = null
  nextStep.onclick = step
  backButton.onclick = null
  backButton.onclick = render
}

const renderInit = () => {
  toTemplate('step1')
  h1.innerHTML = 'What Best Describes you?'
  nextStep.style.display = 'none'
  backButton.onclick = toHome
}
renderInit()

const step2Render = () => {
  toTemplate('step2')
  h1.innerHTML = 'What services are you looking for? (can choose multiple)'
  nextStep.style.display = 'flex'
  setListeners(step3Render, renderInit)
}

const step3Render = () => {
  if (answerObject.service.length) {
    toTemplate('step3')
    h1.innerHTML =
      'What do you want to use the photos / videos for? (can choose multiple)'
    setListeners(step4Render, step2Render)
  } else setErrorMessage()
}
const step4Render = () => {
  if (answerObject.photoFor.length) {
    toTemplate('step4')
    h1.innerHTML = 'What is the primary industry the photos / videos are for?'
    const input = document.createElement('input')
    input.id = 'add-info-input'
    input.onchange = function () {
      let value = this.value
      answerObject.primaryIndustryCustom = value
    }
    input.oninput = function () {
      removeErrorMessage()
    }
    const label = document.createElement('label')
    label.innerHTML = 'Other: please specify'
    label.setAttribute('for', input.id)
    selectContainer.append(label)
    selectContainer.append(input)
    setListeners(step5Render, step3Render)
  } else setErrorMessage()
}
const step5Render = () => {
  if (
    answerObject.primaryIndustry.length ||
    answerObject.primaryIndustryCustom
  ) {
    selectContainer.innerHTML = ''
    const textarea = document.createElement('textarea')
    textarea.id = 'new-info-textarea'
    textarea.onchange = function () {
      let value = this.value
      answerObject.moreInfo = value
      removeErrorMessage()
    }
    textarea.oninput = function () {
      removeErrorMessage()
    }
    const label = document.createElement('label')
    label.setAttribute('for', textarea.id)
    h1.innerHTML =
      'What else should we know about your project? Any more information you can provide would be great!'
    selectContainer.append(label)
    selectContainer.append(textarea)
    setListeners(completeTemplate, step4Render)
  } else setErrorMessage()
}

const setToArray = (arr, val) => {
  let newValue = arr.find((item) => item === val)
  if (val !== newValue) {
    arr.push(val)
  }
}

const completeStep = (arr, val) => {
  setToArray(arr, val)
  toStorage()
  removeErrorMessage()
}

document.querySelector('#steps').addEventListener('click', function (e) {
  let target = e.target
  let current = target.dataset.current
  let value = target.value
  if (target.dataset.step) {
    target.classList.toggle('checked')
    removeErrorMessage()
  }
  switch (current) {
    case 'step1':
      {
        this.onclick = step2Render()
        answerObject.describe = value
        toStorage()
      }
      break
    case 'step2':
      {
        completeStep(answerObject.service, value)
      }
      break
    case 'step3':
      {
        completeStep(answerObject.photoFor, value)
      }
      break
    case 'step4':
      {
        completeStep(answerObject.primaryIndustry, value)
      }
      break
  }
})
