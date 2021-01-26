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
  userName: '',
  userEmail: '',
  userTel: '',
}

const toStorage = () =>
  localStorage.setItem('answer', JSON.stringify(answerObject))

let isErrorMessage = false
let errorText1 = 'Please select the desired option'
let errorText2 = 'All fields should be filled'
let errorText3 = 'Please fill "email" field in correct way'

const setErrorMessage = (text) => {
  if (!isErrorMessage) {
    const span = document.createElement('span')
    span.classList.add('signup__error')
    span.innerHTML = text
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

// const thankYouBtn = `<button type="button" onclick="completeSignup()" style="justify-content: center" class="signup__button main-btn main-btn_hollow">
// Ok
// </button>`

// const completeTemplate = () => {
//   let choose3D = answerObject.service.find(
//     (item) => item === '3D animation / short videos'
//   )
//   if (
//     choose3D &&
//     answerObject.userEmail &&
//     answerObject.userName &&
//     answerObject.userTel
//   ) {
//     signUpContainer.innerHTML = `<h1 style="text-align: center">Thank you for your interest in our services! We will send you an email outlining your price estimate after reviewing your project specifications</h1>${thankYouBtn}`
//   } else if (
//     answerObject.userEmail &&
//     answerObject.userName &&
//     answerObject.userTel
//   ) {
//     signUpContainer.innerHTML = `<h1 style="text-align: center">Thank you!</h1>${thankYouBtn}`
//   } else setErrorMessage(errorText2)
// }

const completeSignup = () => {
  const emailInput = document.querySelector('[type="email"]')
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const namesend =answerObject.userName;
    const phonesend =answerObject.userTel;
    let desc = "Beverly";
        desc+="\n 1) describe: " + answerObject.describe;
        desc+="\n 2) service: " + answerObject.service;
        desc+="\n 3) photoFor:" + answerObject.photoFor;
        desc+="\n 4) photoFor:" + answerObject.moreInfo;
        desc+="\n 5) primaryIndustry: " + answerObject.primaryIndustry;
        desc+="\n 6) primaryIndustryCustom: " + answerObject.primaryIndustryCustom;
        desc+="\n 7) Email: " + answerObject.userEmail;
  if (answerObject.userEmail && answerObject.userName && answerObject.userTel) {
    if (emailInput.value.match(mailformat)) {
      document.location.href = 'index.html'
      localStorage.removeItem('answer')
      ajaxform(desc , namesend,phonesend);
    } else {
      emailInput.focus()
      setErrorMessage(errorText3)
    }
  } else {
    setErrorMessage(errorText2)
  }
}

const toHtml = (
  button
) => `<input type="checkbox" name="${button.value}" class="signup__input" id="${button.id}" data-step="${button.step}" data-current="${button.currentStep}" value="${button.value}"><label for="${button.id}" class="${button.class}" >
<img src="${button.img}" alt="${button.value}" /> ${button.value}
</label>`

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

// begin rendering
const renderInit = () => {
  toTemplate('step1')
  h1.innerHTML = 'What Best Describes you?'
  nextStep.style.display = 'none'
  backButton.onclick = completeSignup
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
  } else setErrorMessage(errorText1)
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
    label.className = 'signup__label'
    label.innerHTML = 'Other: please specify'
    label.setAttribute('for', input.id)
    selectContainer.append(label)
    selectContainer.append(input)
    setListeners(step5Render, step3Render)
  } else setErrorMessage(errorText1)
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
      toStorage()
      removeErrorMessage()
    }
    const label = document.createElement('label')
    label.className = 'signup__label'
    label.setAttribute('for', textarea.id)
    h1.innerHTML =
      'What else should we know about your project? Any more information you can provide would be great!'
    selectContainer.append(label)
    selectContainer.append(textarea)
    setListeners(step6Render, step4Render)
  } else setErrorMessage()
}
const step6Render = () => {
  selectContainer.innerHTML = ''
  const input1 = document.createElement('input')
  const input2 = document.createElement('input')
  const input3 = document.createElement('input')
  input1.id = 'input-name'
  input2.id = 'input-email'
  input3.id = 'input-phone'
  input1.name = input1.id
  input2.name = input2.id
  input3.name = input3.id
  input1.type = 'text'
  input2.type = 'email'
  input3.type = 'tel'
  const inputs = [input1, input2, input3]

  const setInputValue = (el, field) => {
    let value = el.value
    removeErrorMessage()
    answerObject[field] = value
    toStorage()
  }

  input1.addEventListener('change', function () {
    setInputValue(input1, 'userName')
  })
  input2.addEventListener('change', function () {
    setInputValue(input2, 'userEmail')
  })
  input3.addEventListener('change', function () {
    setInputValue(input3, 'userTel')
  })
  h1.innerHTML = `Great! Let's save your deets`
  inputs.forEach((item) => selectContainer.append(item))
  setListeners(completeSignup, step5Render)
}

// listeners for buttons
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

// ajax for PHP

function ajaxform(desc , namesend,phonesend) {
  let o = {
      desc: desc,
      name: namesend,
      phone: phonesend
  };
   let t = new XMLHttpRequest;
  t.addEventListener("load", (function () {

  })), t.open("POST", "/mail.php", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send("name=" + encodeURIComponent(o.name) + "&phone=" + encodeURIComponent(o.phone) + "&desc=" + encodeURIComponent(o.desc))
}
