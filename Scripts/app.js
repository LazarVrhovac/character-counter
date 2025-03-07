const btn = document.querySelector('.button');
const body = document.querySelector('body');
const text = document.querySelector('.text');
const logo = document.querySelector('.logo img');
const txtbox = document.querySelector('textarea');
const pReadTime = document.querySelector('.read-time p');
const pWordsCount = document.querySelector('.word-count h2');
const pSentenceCount = document.querySelector('.sentence-count h2');
const pCharCount = document.querySelector('.total-count h2');
const pLetterDensity = document.querySelector('.main-bottom p');
const excludeSpacesInp = document.querySelector('.water-mages input');
const limitInp = document.querySelector('.mercenaries input');

const whiteTheme = () => {
  body.classList.toggle('white');
  text.classList.toggle('white');

  if (body.classList.contains('white')) {
    logo.src = '/assets/images/logo-light-theme.svg';
  } else {
    logo.src = '/assets/images/logo-dark-theme.svg';
  }

  if (body.classList.contains('white')) {
    btn.src = '/assets/images/icon-moon.svg';
  } else {
    btn.src = '/assets/images/icon-sun.svg';
  }
};

const timeWordsCount = () => {
  const textValue = txtbox.value;
  const wordsArray = textValue.split(/\s+/);
  const wordCount = wordsArray.length;
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  if (textValue) {
    pReadTime.innerHTML = `Approx. reading time: ${readingTime} minutes `;
  } else {
    pReadTime.innerHTML = `Approx. reading time: 0 minutes `;
  }
};

const wordsCount = () => {
  const textValue = txtbox.value;
  const wordsArray = textValue.split(/\s+/);
  const wordCount = wordsArray.length;

  if (textValue) {
    pWordsCount.innerHTML = `${wordCount}`;
  } else {
    pWordsCount.innerHTML = `00`;
  }
};

const sentenceCount = () => {
  const textValue = txtbox.value;
  const sentenceArray = textValue.split(/(?<=[.!?])\s+/);
  const sentenceCount = sentenceArray.length;

  if (textValue) {
    pSentenceCount.innerHTML = `${sentenceCount}`;
  } else {
    pSentenceCount.innerHTML = `00`;
  }
};

const charCount = () => {
  const textValue = txtbox.value;
  const charExc = textValue.replace(/\s+/g, '');
  const charExcCount = charExc.length;
  const charCount = textValue.length;

  if (excludeSpacesInp.checked) {
    if (textValue) {
      pCharCount.innerHTML = `${charExcCount}`;
    } else {
      pCharCount.innerHTML = `00`;
    }
  } else {
    if (textValue) {
      pCharCount.innerHTML = `${charCount}`;
    } else {
      pCharCount.innerHTML = `00`;
    }
  }
};

const letterDensity = () => {
  const letters = {};
  const textValue = txtbox.value.replace(/\s+/g, '');

  for (let i = 0; i < textValue.length; i++) {
    const currentLetter = textValue[i].toLowerCase();
    if (/[a-zA-Z]/.test(currentLetter)) {
      letters[currentLetter] = (letters[currentLetter] || 0) + 1;
    }
  }

  const top5 = Object.entries(letters)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (textValue) {
    pLetterDensity.innerHTML = top5
      .map(([letter, count]) => {
        const percentage = ((count / textValue.length) * 100).toFixed(2);
        return `${letter.toUpperCase()}: ${count} (${percentage}%)`;
      })
      .join('<br>');
  } else {
    pLetterDensity.innerHTML = `No characters found. Start typing to see letter density.`;
  }
};

const setLimit = () => {
  if (limitInp.checked) {
    txtbox.setAttribute('maxlength', '100');
  } else {
    txtbox.setAttribute('maxlength', '');
  }
};

const inputFunction = () => {
  timeWordsCount();
  wordsCount();
  sentenceCount();
  charCount();
  letterDensity();
};

txtbox.addEventListener('input', inputFunction);
btn.addEventListener('click', whiteTheme);
limitInp.addEventListener('click', setLimit);
excludeSpacesInp.addEventListener('click', charCount);
