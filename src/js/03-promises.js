import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelayInput = form.querySelector('[name="delay"]');
const delayInput = form.querySelector('[name="step"]');
const amountInput = form.querySelector('[name="amount"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstDelay = parseInt(firstDelayInput.value);
  const delayStep = parseInt(delayInput.value);
  const amount = parseInt(amountInput.value);

  let position = 1;
  let delay = firstDelay;


  for (i = 0; i < amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
      position += 1;
    delay += delayStep;
  }
})

function createPromise(position, delay) {
   return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}