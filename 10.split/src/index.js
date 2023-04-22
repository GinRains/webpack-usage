document.querySelector('#play').addEventListener('click', () => {
  import('./video').then(video => console.log(video))
})