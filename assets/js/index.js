fetch("https://world.openfoodfacts.org/api/v2/product/5997523313111")
.then(response => response.json())
.then(product => {
    console.log(product);
    const card = 
})