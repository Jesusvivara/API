// Open Trivia
// https://opentdb.com/api_config.php

// Instrucciones
// 1. Muestra al usuario las distintas categorias entre las cuáles puede elegir para
// las preguntas
// 2. Le das al usuario la opción de elegir entre preguntas de opción múltiple o preguntas de
// verdadero o falso
// 3. Mostramos 10 preguntas aplicando los filtros anteriores junto con las respuestas posibles



// 3.1 El usuario selecciona las respuestas 
// 4. Le indicas al usuario cuántos aciertos tuvo y cuántos errores tuvo



// Está función se ecargara de obtener todas las categorías disponibles
function getCategories() {
    const endpointCategories = 'https://opentdb.com/api_category.php'
    fetch(endpointCategories)
        .then(response => response.json())
        .then(dataJson => {
            console.log(dataJson)
            printCategories(dataJson.trivia_categories)
        })
        .catch(error => {
            console.error(error)
        })
}
// 1. obtengo el elemento donde quiero imprimir las categorías
// 2. Genero el html
// 3. Imprimo las categorías
function printCategories(categories) {
    const selectCategories = document.getElementById('select-categories')
    // console.log(categories)

    let html = ''
    categories.forEach(category => {
        html += `<option value="${category.id}"> ${category.name}</option>`
    });

    // value="${category.id}"
    selectCategories.innerHTML = html


    // Esta es la estructura de la respuesta de la API
    // {
    //     trivia_categories: [
    //         { name: 'category 1', id: 1},
    //         { name: 'category 2', id: 2}
    //     ]
    // }
}

getCategories()


function selectCategory() {
    const categoryID = document.getElementById('select-categories').value
    console.log(categoryID)
    // alert(`Se seleccionó la categoría con el id ${categoryID}`)
    return categoryID
}

function selectNumber() {
    const numberAmount = document.getElementById('selectNumberQuestions').value
    console.log(numberAmount)
    // alert(`Se seleccionaron ${numberAmount} preguntas`)
    return numberAmount
}

function selectType() {
    const Typequestion = document.getElementById('selectTypeQuest').value
    console.log(Typequestion)
    // alert(`Se seleccionaron preguntas de tipo ${Typequestion}`)
    return Typequestion
}

function ReceiveData() {
    const endpoint = `https://opentdb.com/api.php?amount=${selectNumber()}&category=${selectCategory()}&type=${selectType()}`
    console.log(endpoint)
    return endpoint
}


function getDataTrivia() {
    fetch(ReceiveData())
        .then(response => response.json())
        .then(dataJsonT => {
            console.log(dataJsonT)
            PrintQuestions(dataJsonT.results)
        })
        .catch(error => {
            console.error(error)
        })
}



function PrintQuestions(Questions) {
     const PrintQuestions = document.getElementById(`Questions`)
     const IncorrectQuest = Questions.map(function(incorrectAnswer) {
         return incorrectAnswer.incorrect_answers
     })
     console.log(IncorrectQuest)

     let html = ``
     Questions.forEach(question=>{
         html += `<div class="card m-2 card-boddy">
         <div class="card-body">
           ${question.question}
           <div class="input-group">
  <div class="input-group-prepend">
    <div class="input-group-text">
      <input type="radio" aria-label="Radio button for following text input">
    </div>
  </div>
   ${question.correct_answer}
   ${IncorrectQuest}
</div>
         </div>
       </div>`
     })
     PrintQuestions.innerHTML = html
}
