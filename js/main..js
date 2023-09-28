
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elSelect = document.querySelector(".select");
let region = [];







function getData(){
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        renderData(data, elList)
        // console.log(data);
        data.forEach(item => {
            if (!region.includes(item.region)) {
                region.push(item.region)
                let option = document.createElement('option')
                elSelect.innerHTML += `<option>${item.region}</option>`
            }   
        })
    })
}


getData();

function renderData(array, node){
    node.innerHTML = '';
    array.forEach(item => {
        let li = document.createElement('li');
        li.classList.add("p-3","mb-3","w-25")
        li.innerHTML +=
        `
            <div>
                <img src=${item.flags.svg} width="200"/>
                <h3>${item.name.common}</h3>
            </div>
        `
        node.appendChild(li);
    });
}

elInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    if(e.target.value != ''){
        fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
        .then(res => res.json())
        .then(data => renderData(data, elList))
    }
})

