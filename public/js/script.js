

let  btn=document.querySelector(".pink");
let body= document.querySelector("body")
let head= document.querySelector("head")

btn.addEventListener("click",()=>{
body.classList.toggle("dark");});
btn.addEventListener("click",()=>{
  head.classList.toggle("dark");});
  

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  