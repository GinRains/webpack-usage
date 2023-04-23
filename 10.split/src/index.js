import video from './video'
import jquery from 'jquery'

document.querySelector('#play').addEventListener('click', () => {
  // import(
  //   /* webpackChunkName: 'video' */
  //   /* webpackPrefetch: true */
  //   './video').then(vide => console.log(vide, video, jquery))
  console.log(video, jquery)
})

//  import(
//     /* webpackChunkName: 'video' */
//     /* webpackPrefetch: true */'./video').then(video => console.log(video))