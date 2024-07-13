import './style.css'; 
import mod1 from './mod1.js';
import mod2 from './mod2.js'

const content = document.querySelector('#content');
const mod21 = document.querySelector('.mod2');
const mod11 = document.querySelector('.mod1');
mod21.addEventListener('click', ()=>{
  mod2()
})
mod11.addEventListener('click', ()=>{
  mod1()
})
content.textContent = 'ciao'


//HMR
if (module.hot) {
  module.hot.accept('./mod2.js', function() {
    mod2();
  });
}
if (module.hot) {
  module.hot.accept('./mod1.js', function() {
    mod1();
  });
}

