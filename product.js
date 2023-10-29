var productData = null

fetch('./json/products.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then((data) => {

   
    filterData=filterData(data)
    filterData.length > 0 ? initializeWithProductData(filterData) : emptyData()
  })
  .catch((error) => {
    console.error('Fetch error:', error)
  })

function initializeWithProductData(filterData) {
  let productDom=''
  for (let i = 0; i < filterData.length; i++) {
    product = `
    <div id="product" class="product swiper-slide"><img src=${filterData[i].image} alt="product-image"  loading="lazy" class="swiper-lazy" />
            <h3>${filterData[i].name}</h3>
            ${
              filterData[i].oldPrice // Eğer eski fiyat varsa, eski ve yeni fiyatı göster.
              ? `<h4>${filterData[i].currency} ${filterData[i].oldPrice}</h4>
                 <h4 class="text-red">${filterData[i].currency} ${filterData[i].price}</h4>`
              : `<h4>${filterData[i].currency} ${filterData[i].price}</h4>` // Eski fiyat yoksa, sadece mevcut fiyatı göster.
          }

             <div class="viewProduct">
            <button id="viewProduct">VIEW PRODUCT</button>
          </div>
          </div>`
    productDom =productDom+ product         
  }
document.querySelector('.productInfo').innerHTML = productDom

const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
  },
  lazy:true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }

});
}

function filterData(data){
  const urlParams = new URLSearchParams(window.location.search);

  //  query parametreler
  const query_category = urlParams.get('category')?.toLowerCase() || "";
  const query_color = urlParams.get('color')?.toLowerCase() || "";
  const query_priceRange = urlParams.get('price')?.split('-') ||  [];
  const query_minPrice = Number(query_priceRange[0]) || "";
  const query_maxPrice = Number(query_priceRange[1]) || "";

  // Parametrelere göre veriyi filtreleyin
  const filteredProducts = data.filter(product => {
    // Ürün kategorisinin sorgu ile eşleşip eşleşmediğini kontrol edin (kategori bir dizi olabileceği için)
    console.log(product.category)
    const categoryMatch = product.category[0].toLowerCase().includes(query_category);
    
    // Ürün renginin sorgu ile eşleşip eşleşmediğini kontrol edin (renkler bir dizi olabileceği için)
    const colorMatch = query_color ? product.colors.some(color => color.toLowerCase().includes(query_color)) : true;

    // Ürün fiyatının sorgu aralığında olup olmadığını kontrol edin
    const priceMatch = query_minPrice ? product.price >= query_minPrice && product.price <= query_maxPrice : true;

    return categoryMatch && colorMatch && priceMatch;
  });

  return filteredProducts.splice(0,20); // Bu özelliklere sahip ürünleri döndürür
}

function emptyData() {
  let productDom= `
    <div id="product" class="product swiper-slide">
            <h3>Products Not Found.</h3>

          </div>`        

document.querySelector('.productInfo').innerHTML = productDom

}