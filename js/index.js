const monsterUrl = 'http://localhost:3000/monsters'

function main(){
    document.addEventListener('DOMContentLoaded', function(){
        makeForm()
        fetchMonsters()
        createFormListener()
    })
}

function createFormListener(){
    const monForm = document.getElementById('monster-form')

    monForm.addEventListener('submit', function(e) {
        e.preventDefault()
        // console.log('e', e)
        // debugger
            postMonster(e.target)
            e.target.reset()
        // monForm.reset() // also works
    })

    // monFormDiv.addEventListener('click', e => {
    //     console.log(e.target)
    // })
}


function makeForm(){
    const monFormDiv = document.querySelector('#create-monster')

    const f = document.createElement('form')
    f.setAttribute('id', 'monster-form')

    const nameI = document.createElement("input");
    nameI.setAttribute('type',"text");
    nameI.setAttribute('id',"name");
    nameI.setAttribute('placeholder', 'name...');

    const ageI = document.createElement('input');
    ageI.setAttribute('type', 'text');
    ageI.setAttribute('id', 'age');
    ageI.setAttribute('placeholder', 'age...')

    const descI = document.createElement('input');
    descI.setAttribute('type', 'text');
    descI.setAttribute('id', 'description');
    descI.setAttribute('placeholder', 'description...')

    const create = document.createElement("input");
    create.setAttribute('type',"submit");
    create.setAttribute('id', 'create')
    create.setAttribute('value',"Create");

    f.append(nameI, ageI, descI, create);
    monFormDiv.append(f);
}

function postMonster(newMon){
    fetch(monsterUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'name': newMon.name.value,
            'age': newMon.age.value,
            'description': newMon.description.value
        })
    })
    .then(resp => resp.json())
    .then(objMon => { renderMonster(objMon)
    })
}


function fetchMonsters(){
    return fetch(monsterUrl)
    .then(resp => resp.json())
    .then(monsters => {
        renderMonsters(monsters)
    })
}

function renderMonsters(monsters){
    monsters.forEach(renderMonster)
}

function renderMonster(monObj){
    const monConDiv = document.querySelector('#monster-container')

    const div = document.createElement('div')
    div.className = "monstar"
    
    const h2 = document.createElement('h2')
    h2.innerText = monObj.name
    
    const h4 = document.createElement('h4')
    h4.innerText = `Age: ${monObj.age}`
    
    const p = document.createElement('p')
    p.innerText = `Bio: ${monObj.description}`
    
    div.append(h2, h4, p)
    monConDiv.append(div)
}


main()