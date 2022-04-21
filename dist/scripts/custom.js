console.log('Ciao!');

function confirmSubmit(e)
{
  var agree = confirm("Are you sure you wish to continue?");
  if (agree)
    return true ;
  else
    e.preventDefault();
    e.stopPropagation();
    return false ;
}

window.addEventListener('load', () => {
  console.log('Test');
  let submitBtn = document.querySelector('.cart__submit');
  submitBtn.addEventListener('click', (e) => {
    confirmSubmit(e);
  })
});