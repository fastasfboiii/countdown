const countdownElement = document.getElementById('countdown');
const quoteContainer = document.getElementById('quote-container');
const quoteBlocks = quoteContainer.getElementsByTagName('blockquote');
const quoteAuthor = quoteContainer.querySelector('.quote-author');

let currentQuoteIndex = 0;

function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  if (distance > 0) {
    setTimeout(() => {
      updateCountdown(targetDate);
    }, 1000);
  } else {
    countdownElement.innerHTML = "Countdown expired";
  }
}

function displayNextQuote() {
  quoteBlocks[currentQuoteIndex].classList.remove('active');
  currentQuoteIndex = (currentQuoteIndex + 1) % quoteBlocks.length;
  quoteBlocks[currentQuoteIndex].classList.add('active');
  quoteAuthor.innerHTML = getQuoteAuthor(quoteBlocks[currentQuoteIndex].textContent);
}

function getQuoteAuthor(quote) {
  const startIndex = quote.lastIndexOf('-');
  if (startIndex !== -1) {
    return quote.slice(startIndex + 1).trim();
  }
  return '';
}

const targetDate = new Date('2023-07-12').getTime();
updateCountdown(targetDate);
displayNextQuote();
setInterval(displayNextQuote, 5000); // Change quote every 3 hours (3 hours = 3 * 60 * 60 * 1000 milliseconds)
