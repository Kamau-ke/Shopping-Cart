if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}
else{
    ready()
}

function ready(){
var removeBtn=document.querySelectorAll('.btn-danger');

removeBtn.forEach(button=>{
    button.addEventListener('click',removeCartItem)
})

let quantityinput=document.querySelectorAll('.cart-quantity-input')

quantityinput.forEach(input =>{
    input.addEventListener('change', quantityChanged)
})

let addBtn=document.querySelectorAll('.shop-item-button');
addBtn.forEach(button=>{
    button.addEventListener('click', addToCart)
})

document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked)

function purchaseClicked(){
    alert('Thank you for your purchase')

    let cartItems=document.querySelectorAll('.cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCart(e){
    let button=e.target;
    let shopItem=button.parentElement.parentElement;
   
    let title=document.getElementsByClassName('shop-item-title')[0].innerText
    let price=document.getElementsByClassName('shop-item-price')[0].innerText
    let imgSrc=shopItem.querySelectorAll('.shop-item-image')[0].src
    
    addItemToCart(title,price,imgSrc);
    
  
    
}

function addItemToCart(title,price,imgSrc){
    let cartRow=document.createElement('div')
    let cartItems=document.querySelector('.cart-items');
    cartItems.append(cartRow);

    let cartItemName=cartItems.querySelectorAll('.cart-item-title');

    for(let i=0; i<cartItemName.length;i++){
        if(cartItemName[i].innerText==title){
            alert('This item is already added')
            return
        }
    }
   

    let cartRowContent=`
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `

    cartRow.innerHTML=cartRowContent;
    cartRow.classList.add('cart-row');
    cartRow.querySelectorAll('.btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(e){
    let input=e.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value=1
    }
    updateCartTotal()
}

function removeCartItem(e){
    let buttonEl=e.target
    buttonEl.parentElement.parentElement.remove()
    updateCartTotal()
} 

function updateCartTotal(){
    var cartContainer=document.getElementsByClassName('cart-items')[0];
    var cartRows=cartContainer.querySelectorAll('.cart-row');
    let total=0;
    for(let i=0; i < cartRows.length; i++){
        var cartRow=cartRows[i]
        let priceEl=cartRow.getElementsByClassName('cart-price')[0];
        let quantityEl=cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price=parseFloat(priceEl.innerText.replace('$', ''));
        let quantity=quantityEl.value;

        total=total +(price * quantity)

    }
    total=Math.round(total *100) /100
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+total;

}

}
        
 
    