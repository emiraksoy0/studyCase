document.addEventListener('DOMContentLoaded', () => {
  const products = JSON.parse(localStorage.getItem('filteredProducts') || '[]')

  function displayProducts(products) {
    let productElements = products
      .map(
        (product) => `
      <div id="product" class="product swiper-slide">
        <img src=${
          product.image
        } alt="product-image" loading="lazy" class="swiper-lazy" />
        <h3 class="product-title">${product.name}</h3>
        ${
          product.oldPrice
            ? `<h4>${product.currency}${product.oldPrice}</h4>
            <h4 class="text-red">${product.currency}${product.price}</h4>`
            : `<h4>${product.currency}${product.price}</h4><br/>`
        }
        <div class="viewProduct">
          <button id="viewProduct">VIEW PRODUCT</button>
        </div>
      </div>`
      )
      .join('')

    document.querySelector('.productInfo').innerHTML = productElements
    initializeSwiper()
  }

  function initializeSwiper() {
    new Swiper('.swiper', {
      pagination: {
        el: '.swiper-pagination',
      },
      lazy: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })

    // DOM'dan belirli span'ları seç
    let spanElements = document.querySelectorAll('.swiper-pagination-bullet')

    // Her birine 'dot' sınıfını ekleyin
    spanElements.forEach(function (span) {
      span.classList.add('dot')
    })
  }

  displayProducts(products)
})
