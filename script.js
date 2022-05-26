const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

// Unsplash API
const count = 30
const apiKey = 'ARHf2wm3ZbYKpEgEoJqkwEFEhhWodcSElntHJVMbf8I'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// loaders
function loadingIconOn() {
  loader.hidden = false
  imageContainer.hidden = true
}
function loadingIconOff() {
  loader.hidden = true
  imageContainer.hidden = false
}

// check if images are loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

//Create elements for links and photos- add to dom
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach((picture) => {
    const newImage = document.createElement('a')
    setAttributes(newImage, { href: picture.links.html, target: '_blank' })
    const img = document.createElement('img')
    setAttributes(img, {
      src: picture.urls.regular,
      alt: picture.alt_description,
      title: picture.alt_description,
    })
    img.addEventListener('load', imageLoaded)
    newImage.appendChild(img)
    imageContainer.appendChild(newImage)
  })
}

// Get photos from unsplash api
const getPictures = async () => {
  loadingIconOn()
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (err) {
    console.log(err)
  }
  loadingIconOff()
}

// check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPictures()
  }
})
// on load - get photos
getPictures()
