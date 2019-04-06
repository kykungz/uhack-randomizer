let text = document.getElementById('text')
let bgTop = document.getElementById('bg-top')
let bgBottom = document.getElementById('bg')
let randomButton = document.getElementById('random-button')
let logo = document.getElementById('logo')
let ok = document.getElementById('ok')
let modal = document.getElementById('modal')
let textarea = document.getElementById('textarea')

let award = new Audio('./sounds/award.mp4')
let pop = new Audio('./sounds/pop.mp4')

let isRunning = false

const duration = 0 * 1000

// let answers = ['1', '2', '3', '4']

let answers = [
  'ศุภวิชญ์ เเสงสุวรรณ',
  'Leon Ongfong',
  'Mint Narisa',
  'Punsita Bualert',
  'Sarunyu Chankong',
  'Chalermchon Onbua',
  'Chomtana Chanjaraswichai',
  'Jiraporn Kowuttitam',
  'Sern Chinnawong',
  'Jirawan Chuapradit',
  'Samatchaya Jai-in',
  'รล. ร. ล.',
  'Sitsakul Amaro',
  'Setthwut Prasobpiboon',
  'Kittiya Ku-kiattikun',
  'Sukibong Phobia',
  'Ping-Ping Pusith Rattanakosol',
  'Narawit Boonsorn',
  'Mix Chattarin',
  'Authapong Somboonwarakon',
  'Anawin Wongsadit',
  'Bankkeez Stk'
]

const eng = 'abcdefghijklmnopqrstuvwxyz'
const vowel = `ะ
ั
็
าาาาาา
ิ
่
ํ
"
ุ
ู
เ
ใ
ไ
โ`
const thai = 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ'

const letters = _.shuffle(eng.replace(/\s+/g, '').split('')).join('')

text.innerText = 'UHACK KASETSART'

const randomInt = (max = 1) => {
  return parseInt(Math.random() * max)
}

const randomBoolean = () => {
  return Math.random() > 0.5
}

const addLetter = () => {
  changeBg()
  // const letter = letters[randomInt(letters.length)]
  const ls = answers.join('')
  const letter = ls[randomInt(ls.length)]
  // text.innerText += randomBoolean() ? letter : letter.toUpperCase()
  text.innerText += letter.toUpperCase()
}

const changeLetter = () => {
  changeBg()
  // const letter = letters[parseInt(randomInt(letters.length))]
  const ls = answers.join('')
  const letter = ls[randomInt(ls.length)].toUpperCase()

  const index = parseInt(randomInt(text.innerText.length))
  text.innerText =
    text.innerText.substring(0, index) +
    letter +
    text.innerText.substring(index + 1, text.innerText.length)
}

const removeLetter = (amount = 1) => {
  changeBg()
  const index = parseInt(randomInt(text.innerText.length))

  text.innerText =
    text.innerText.substring(0, index) +
    text.innerText.substring(index + amount, text.innerText.length)
}

const complete = () => {
  if (answers.length <= 0) {
    logo.classList.remove('is-spining')
    return (text.innerText = 'สุ่มหมดละจ้า')
  }

  let delay = 0
  let threshold = 1
  let counter = 0

  let loop = setInterval(() => {
    counter++
    delay += 30

    if (delay >= threshold) {
      changeBg()
      playPop()
      text.innerText = answers[randomInt(answers.length)]
      threshold += threshold * 0.05
      delay = 0
    }

    if (threshold > 200) {
      clearInterval(loop)
      logo.classList.remove('is-spining')
      randomButton.classList.add('is-error')
      randomButton.classList.remove('is-disabled')
      randomButton.disabled = false
      isRunning = false

      const answer = answers[randomInt(answers.length)]
      const found = answers.indexOf(answer)
      if (found > -1) {
        answers.splice(found, 1)
      }
      text.innerText = answer
    }
  }, 60)
}

const changeBg = () => {
  bgTop.style.backgroundPosition = `${randomInt(100)}vw ${randomInt(20)}vh`
  bgTop.style.backgroundImage = `url('./images/template-bg${randomInt(
    13
  )}.png')`
  bg.style.backgroundPosition = `${randomInt(100)}vw ${randomInt(20)}vh`
  bg.style.backgroundImage = `url('./images/template-bg${randomInt(13)}.png')`
}

const playPop = () => {
  pop = new Audio('./sounds/pop.mp4')
  pop.play()
}

const onRandom = () => {
  let counter = 0
  isRunning = true
  award.play()

  randomButton.classList.remove('is-error')
  randomButton.classList.add('is-disabled')
  randomButton.disabled = true

  logo.classList.add('is-spining')

  let interval = setInterval(() => {
    counter += 1 % 2
    if (counter % 2 === 0) {
      playPop()
    }
    text.innerText = answers[randomInt(answers.length)]
  }, 60)

  setTimeout(() => {
    clearInterval(interval)
    complete()
  }, duration)
}

randomButton.addEventListener('click', onRandom)

logo.addEventListener('click', () => {
  textarea.value = answers.join('\n')
  modal.style.display = 'flex'
})

ok.addEventListener('click', () => {
  const list = textarea.value.trim()
  answers = list === '' ? [] : list.split('\n')
  modal.style.display = 'none'
})

window.addEventListener('keydown', e => {
  if (e.key === 'Enter' && modal.style.display !== 'flex' && !isRunning) {
    onRandom()
  }
})
