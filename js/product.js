async function fetchProducts() {
  try {
    const response = await fetch('../json/products.json')

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    const filteredProducts = filterProducts(data)
    filteredProducts.length > 0
      ? displayProducts(filteredProducts)
      : displayNoProductsFound()
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

function filterProducts(data) {
  const urlParams = new URLSearchParams(window.location.search)

  const query_category = urlParams.get('category')?.toLowerCase() || ''
  const query_color = urlParams.get('color')?.toLowerCase() || ''
  const query_priceRange = urlParams.get('price')?.split('-') || []
  const query_minPrice = Number(query_priceRange[0]) || 0
  const query_maxPrice = Number(query_priceRange[1]) || Number.MAX_SAFE_INTEGER

  return data
    .filter((product) => {
      const categoryMatch = product.category.some((cat) =>
        cat.toLowerCase().includes(query_category)
      )
      const colorMatch = query_color
        ? product.colors.some((color) =>
            color.toLowerCase().includes(query_color)
          )
        : true
      const priceMatch =
        product.price >= query_minPrice && product.price <= query_maxPrice

      return categoryMatch && colorMatch && priceMatch
    })
    .slice(0, 20)
}

function displayProducts(products) {
  let productElements = products
    .map(
      (product) => `
    <div id="product" class="product swiper-slide">
      <img src=${
        product.image
      } alt="product-image" loading="lazy" class="swiper-lazy" />
      <h3>${product.name}</h3>
      ${
        product.oldPrice
          ? `<h4>${product.currency} ${product.oldPrice}</h4>
           <h4 class="text-red">${product.currency} ${product.price}</h4>`
          : `<h4>${product.currency} ${product.price}</h4>`
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

function displayNoProductsFound() {
  document.querySelector('.productInfo').innerHTML = `
    <div id="product" class="product swiper-slide">
      <h3>Products Not Found.</h3>
    </div>`
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
}

fetchProducts()
