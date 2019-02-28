import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

document.querySelector('.content-console button').addEventListener('click',()=>{
    
document.querySelectorAll('.imgChal').forEach((el)=>{
          el.classList.add("whoosh");
          setTimeout(()=>el.classList.remove("whoosh"),500)
  })
})
  