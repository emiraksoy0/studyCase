const fetchProduct = () => {
  fetch('product.json')
    .then((reponse) => reponse.json())
    .then((data) => JSON.stringify(data))
}
