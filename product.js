var productData = null

fetch('./json/products.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then((data) => {
    productData = data
    initializeWithFetchData(productData)
    initializeWithProductData(productData)
  })
  .catch((error) => {
    console.error('Fetch error:', error)
  })

function initializeWithFetchData(fetchData) {
  for (let i = 0; i < fetchData.length; i++) {
    product = `
            <img src=${fetchData[i].image} alt="product-image" />`
  }

  document.getElementById('imageProduct').innerHTML = product
}

function initializeWithProductData(fetchData) {
  for (let i = 0; i < fetchData.length; i++) {
    title = `<h3>${fetchData[i].name}</h3>
            <h4>${fetchData[i].oldPrice} ${fetchData[i].currency}</h4>
            <h4 class="text-red">${fetchData[i].price} ${fetchData[i].currency}</h4>`
  }

  document.getElementById('title').innerHTML = title
}
