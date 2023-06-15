export default {
  preloadImage(img) {
    const src = img.getAttribute('data-src')
    if (!src) {
      return
    }

    img.src = src
  },

  observeImages() {
    const imageOptions = {
      rootMargin: '0px 0px -50px 0px',
      threshold: 1
    }

    return new IntersectionObserver((entries, imageObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        } else {
          this.preloadImage(entry.target)
          imageObserver.unobserve(entry.target)
        }
      })
    }, imageOptions)
  }
}
