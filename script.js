function formatConvertor(amount){
            return '$' + amount.toLocaleString();
        }
function removingSign(stringPrice){
    let price = stringPrice.split('').slice(1); // removing $ sign
    let index = price.indexOf(','); // process of removing , sign
    while(index != -1){
        price.splice(index,1);
        index = price.indexOf(',');
    }
    price = price.join(''); // converting array price into string after removing $ and , sign
    return price;
}
function shortForm(string){
    len = string.length
    if(len >= 4 && len <= 6){
        let number = (Number(string) / 1000)
        if(number % 1 != 0){
            number =  number.toFixed(1)
        }
        return `${number}K`
    }
    if(len >= 7 && len <= 9){
        let number = (Number(string) / 1000000)
        if(number % 1 != 0){
            number =  number.toFixed(1)
        }
        return `${number}M`
    }
    if(len >= 10){
        let number = (Number(string) / 1000000000)
        if(number % 1 != 0){
            number =  number.toFixed(1)
        }
        return `${number}B`
    }
    return string
}

let networth = 240000000000;
let networthDOM = document.querySelector('.networth'); 
networthDOM.textContent = formatConvertor(networth); 

// adding items 
let itemsWrapper = document.querySelector('.itemsWrapper');
let itemslist = [
    ['230px', 'images/burger.png', 'Big Mac Combo', '$5'],
    ['150px', 'images/ticket.png', 'Movie Ticket', '$12'],
    ['120px', 'images/game.png', 'Video Games', '$60'],
    ['200px', 'images/alexa.png', 'Alexa Echo', '$100'],
    ['250px', 'images/netflix.png', 'Year of Netflix', '$140'],
    ['150px', 'images/chanel.png', 'Chanel Perfume', '$205'],
    ['170px', 'images/playstation.png', 'PlayStation', '$500'],
    ['150px', 'images/iphone.png', 'Iphone', '$1,000'],
    ['180px', 'images/jordan.png', 'Air Jordan', '$2,000'],
    ['160px', 'images/pc.png', 'Gaming PC', '$5,000'],
    ['180px', 'images/lv.png', 'LV Bag', '$7,500'],
    ['150px', 'images/ring.png', 'Diamond Ring', '$10,000'],
    ['240px', 'images/bike.png', 'Motor Bikes', '$25,000'],
    ['250px', 'images/car.png', 'Tesla Model A', '$75,000'],
    ['240px', 'images/house.png', 'Family House', '$800,000'],
    ['250px', 'images/supercar.png', 'Super Car', '$5,000,000'],
    ['240px', 'images/helicopter.png', 'Helicopter', '$12,000,000'],
    ['250px', 'images/bighouse.png', 'Mansion', '$45,000,000'],
    ['240px', 'images/plane.png', 'Private Jet', '$60,000,000'],
    ['230px', 'images/yacht.png', 'Private Yacht', '$80,000,000'],
    ['220px', 'images/movie.png', 'Make a Movie', '$100,000,000'],
    ['240px', 'images/bigplane.png', 'Boeing Air', '$140,000,000'],
    ['150px', 'images/shuttle.png', 'Launch Space Shuttle', '$350,000,000'],
    ['240px', 'images/stadium.png', 'FootBall Stadium', '$500,000,000'],
    ['110px', 'images/monalisa.png', 'Mona Lisa', '$840,000,000'],
    ['100px', 'images/burjkhalifa.png', 'Burj Khalifa', '$1,500,000,000'],
    ['150px', 'images/club.png', 'Football Club', '$4,000,000,000'],
    ['150px', 'images/bbclub.png', 'BasketBall Club', '$7,500,000,000'],
    ['190px', 'images/twitter.png', 'Twitter', '$40,100,000,000'],
    ['150px', 'images/mcdonald.png', 'McDonalds', '$238,000,000,000'],
    ['240px', 'images/tesla.png', 'Tesla', '$744,000,000,000'],
    ['150px', 'images/microsoft.png', 'Microsoft', '$2,700,000,000,000'],
    ['220px', 'images/apple.png', 'Apple', '$2,900,000,000,000'],
]
for(let i=0;i<itemslist.length;i++){
    // creating items div
    let items = document.createElement('div');
    items.setAttribute('class', 'items'); 
    // creating image 
    let image = document.createElement('img');
    image.setAttribute('src',itemslist[i][1]);
    image.setAttribute('width',itemslist[i][0]);
    image.setAttribute('height','150px');
    items.appendChild(image); //appended image to items div
    //creating name span
    let spanName = document.createElement('span');
    spanName.setAttribute('class','name');
    spanName.setAttribute('id', itemslist[i][2]); // setting id to original name so that we dont lost it at counting 
    spanName.textContent = itemslist[i][2];
    items.appendChild(spanName); //appended name span div to items div
    //creating price span
    let spanPrice = document.createElement('span');
    spanPrice.setAttribute('class','price');
    spanPrice.textContent = itemslist[i][3];
    items.appendChild(spanPrice); //appended price span div to items div
    itemsWrapper.appendChild(items); // adding items to itemwrapper
}
// end of adding items

//resetting the networth
networthDOM.addEventListener('click', ()=>{
    location.reload(); // reloading the page 
})

//easter egg to spend all the remaining networth to specified product
let spendAll = false;
let easter = document.querySelector('.easter');
easter.addEventListener("click", ()=>{
    spendAll = true;
    easter.style.color = 'rgb(154, 46, 255)';
})

//onclick of an item
let items = document.querySelectorAll('.items');
items.forEach(item =>{
    item.addEventListener('click',()=>{
        // for counting of how many products have been bought
        let selecteditemnameDOM = item.children[1]; // selecting, selected item name
        // for easter egg feature
        if(spendAll){
            let selecteditemprice = item.children[2].textContent;
            let price = removingSign(selecteditemprice);
            let totalItem = Math.floor(Number(networth)/Number(price));
            totalItem = Number(totalItem) - 1; // for the one which executes after click;
            if(selecteditemnameDOM.getAttribute('value')){ // the item has already been purchased once without easter egg
                let newTotalItem = Number(totalItem) + Number(selecteditemnameDOM.getAttribute('value'));
                selecteditemnameDOM.setAttribute('value', newTotalItem);
            }
            else{ // for first touch with easter egg
                selecteditemnameDOM.setAttribute('value', totalItem);
            }
            let totalPrice = Number(totalItem) * Number(price);
            networth = Number(networth) - Number(totalPrice);
            easter.style.color = 'black';
            spendAll = false; //switching off the easter egg
        }
        // end of easter egg feature

        if(selecteditemnameDOM.getAttribute('value') === null){ // for the first touch of the item
            selecteditemnameDOM.setAttribute('value', 1);
        }
        else{ // increment in touch of the item
            let newValue = Number(selecteditemnameDOM.getAttribute('value')) + 1;
            selecteditemnameDOM.setAttribute('value', newValue);
        }
        let stringNumber = selecteditemnameDOM.getAttribute('value');
        selecteditemnameDOM.textContent = `${selecteditemnameDOM.getAttribute('id')} X ${shortForm(stringNumber)}`;

        // for taking the price of selected item
        let selecteditemprice = item.children[2].textContent; // taking the value of price
        let price = removingSign(selecteditemprice);

        // deducting the item price from networth
        networth = Number(networth) - Number(price);
        if(networth <= 0){
            networthDOM.style.color = '#C43C00';
            itemsWrapper.style.pointerEvents = 'none';
        }
        networthDOM.textContent = formatConvertor(networth); // changing the value after purchasing the item
    })
})