setTimeout(() => {
  const pageClasses = ['x-wallpaper', 'x-fabric', 'x-home-good']
  const imageSelector = 'img.swiper-image'
  const addedClass = 'spoonflower-xl'

  const updateImage = (img) => {
    img.src = img.src
      .replace('/xs/', '/l/')
      .replace('/s/', '/l/')
      .replace('/m/', '/l/')
    img.classList.add(addedClass)
  }

  const updateLazyImages = () => {
    // updates lazy loaded images in the products overview, for example
    // https://www.spoonflower.com/en/products/16981942-party-style-m-floral-spinning-wheel-fireworks-yellow-on-dark-eggplant-violet-background-by-klaipina?product=homegoods-kitchen-dining
    const parentDiv = document.querySelector('.b-products-overview')

    if (!parentDiv) {
      return
    }

    const config = { attributes: false, childList: true, subtree: true }

    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          const nodes = mutation.addedNodes
          for (const node of nodes) {
            if (node.nodeName === 'IMG' && node.classList.contains('image')) {
              updateImage(node)
            }
          }
        }
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(parentDiv, config)
  }

  const updateImmediateImages = () => {
    // updates images that are immediately loaded on the page, for example
    // https://www.spoonflower.com/en/fabric/16981942-party-style-m-floral-spinning-wheel-fireworks-yellow-on-dark-eggplant-violet-background-by-klaipina
    const productsSelectors = ['.b-products-overview img.image']
    const designsSelectors = pageClasses.map((c) => `.${c} ${imageSelector}`)

    const selector = productsSelectors.concat(designsSelectors).join(', ')

    const images = document.querySelectorAll(selector)
    images.forEach(updateImage)
  }

  updateImmediateImages()
  updateLazyImages()
}, 2000)
