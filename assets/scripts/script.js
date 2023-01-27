const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
const btnCreatQuizz = document.querySelector('.novoQuizz button'); //<== botão de criar quizz
const container = document.querySelector('.container');
const newQuizz = container.querySelector('.novoQuizz');
const allQuizzes = container.querySelector('.todosQuizzes');
const containerTelaDois = document.querySelector(".containerTelaDois")

let quizzes = [];

todosQuizzes();

function todosQuizzes() {
    const promisse = axios.get(url);

    promisse.then((resposta) => {
        quizzes = resposta.data;
        quizzesIniciais();
    })

    promisse.catch(() => {
        alert("Algo inesperado aconteceu, a pagina sera reiniciada")
        window.location.reload(true)
    })
}

function quizzesIniciais() {
    const iniciais = document.querySelector('.listaQuizzes');
    iniciais.innerHTML = ''

    for (let i = 0; i < 6; i++) {
        const boxQuizz = `
        <li onclick="AbrirQuizz(${quizzes[i].id})">
            <img src="${quizzes[i].image}" alt="">
            <p>${quizzes[i].title}</p>
        </li>
        `;
        iniciais.innerHTML += boxQuizz

        console.log(quizzes[i].image)
        console.log(quizzes[i].id)
    }
}

//FUNÇÕES E VARIAVEIS DA TELA 3 =======================================================
const telaTres = document.querySelector('.telaTres');

//TELA 3.1
const basicInfo = document.querySelector('.telaTres .basicInfo');
const btnGetCreatQuestions = basicInfo.querySelector('button');
let quizzTitle = basicInfo.querySelector('.quizzTitle');
let quizzImgUrl = basicInfo.querySelector('.quizzImgUrl');
let quizzQuestionsQtt = basicInfo.querySelector('.quizzQuestionsQtt');
let quizzLevelsQtt = basicInfo.querySelector('.quizzLevelsQtt');

//TELA 3.2
const quizzQuestions = document.querySelector('.telaTres .quizzQuestions');


const isBlank = () => {
    if (quizzTitle.value === '' ||
        quizzImgUrl.value === '' ||
        quizzQuestionsQtt.value === '' ||
        quizzLevelsQtt.value === '') {
        alert('Preencha todos os campos')
        return
    }
    isValid(quizzTitle.value, quizzImgUrl.value, quizzQuestionsQtt.value, quizzLevelsQtt.value);
}

const isValid = (titulo, imgUrl, questionsQtt, lvlQtt) => {

    if (titulo.length < 20 || titulo.length > 65) {
        alert('Titulo com tamanho invalido');
        return
    }
    if (!imgUrl.includes('https') && !imgUrl.includes('http')) {
        alert('Insira uma url válida');
        return
    }
    if (!Number(questionsQtt) || Number(questionsQtt) < 3) {
        alert('Quantidade de perguntas inválida (pelo menos 3)')
        return
    }
    if (!Number(lvlQtt) || Number(lvlQtt) < 2) {
        alert('Quantidade de níveis inválida (pelo menos 2)')
        return
    }

    quizzTitle = titulo;
    quizzImgUrl = imgUrl;
    quizzQuestionsQtt = questionsQtt;
    quizzLevelsQtt = lvlQtt;

    basicInfo.classList.add('hidden');
    quizzQuestions.classList.remove('hidden');

    questionsCards(quizzTitle, quizzImgUrl, quizzQuestionsQtt, quizzLevelsQtt);

};
userQuizz = [];
const creatQuizzObj = () =>{
    userQuizz.push({
        title: quizzTitle,
        image: quizzImgUrl,
        questions: [{
            title: "Título da pergunta 1",
            color: "#123456",
            answers: [{
                text: "Texto da resposta 1",
                image: "https://http.cat/411.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Texto da resposta 2",
                image: "https://http.cat/412.jpg",
                isCorrectAnswer: false
            }
        ]
    }]
    })
}
const questionsCards = (quizzTitle, quizzImgUrl, quizzQuestionsQtt, quizzLevelsQtt) => {
    for(let i = 1 ; i <= quizzQuestionsQtt; i++){
        quizzQuestions.querySelector('div').innerHTML += `
        <div class="question">
        <div class="doQuestion ">
            <p>Pergunta ${i} <ion-icon name="create" onclick="showQuestion(this)"></ion-icon></p>
            <input type="text" required placeholder="Texto da pergunta">
            <input type="text" required placeholder="Cor de fundo da pergunta">
        </div>
        <div class="correctAnswer">
            <p>Resposta correta</p>
            <input type="text" required placeholder="Resposta correta">
            <input type="text" required placeholder="URL da imagem">
        </div>
        <div class="wrongAnswers">
            <p>Respostas incorretas</p>
            <div class="wrong">
                <input type="text" required placeholder="Resposta incorreta 1">
                <input type="text" required placeholder="URL da imagem 1">
            </div>
            <div class="wrong">
                <input type="text" placeholder="Resposta incorreta 2">
                <input type="text" placeholder="URL da imagem 2">
            </div>
            <div class="wrong">
                <input type="text" placeholder="Resposta incorreta 3">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        </div>
    </div>`
    }
}

const showQuestion = (cardQuestion) => {
    const clickedCardQuestion = cardQuestion.parentElement.parentElement.parentElement;
    const selectedBefore = telaTres.querySelector('.question.opened');
    
    if(selectedBefore!==null){
        selectedBefore.classList.remove('opened');
    }
    clickedCardQuestion.classList.add('opened');
}

// telaTres.querySelector(".quizzQuestions").addEventListener('click', e =>{
//     e.target.querySelector('.question.opened').classList.remove('opened');
// })
btnGetCreatQuestions.addEventListener('click', inputAnalyzer => {
    isBlank();
});
btnCreatQuizz.addEventListener('click', callScreeThree => {
    newQuizz.classList.add('hidden');
    allQuizzes.classList.add('hidden');
    telaTres.classList.remove('hidden');
})

// Tela Dois 

function AbrirQuizz(identificador){
    container.classList.add("hidden");
    containerTelaDois.classList.remove("hidden");
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificador}`);
    promise.then(ExibiQuizz);
    promise.catch(ErroExibirQuizz);
}
function ExibiQuizz(resposta){
    const fundo = document.querySelector(".topo img");
    fundo.src = resposta.data.image;
    const texto = document.querySelector(".topo div");
    texto.innerHTML = resposta.data.title;
    ExibirPerguntas(resposta.data.questions);
}
function ErroExibirQuizz(resposta){
    alert("O Quizz que você procura não se encontra disponível, selecione outro para continuar com a diversão");
        window.location.reload(true);
}

/*function ExibirPerguntas(absol){
    console.log(absol)

}*/

function ExibirPerguntas(perguntas){
    console.log(perguntas);
    const exibindo = document.querySelector(".telaDois .caixote");
    console.log(exibindo);
    for (let i=0; i<perguntas.length; i++){
        exibindo.innerHTML +=`
                <div class="perguntas">
                <div class="pergunta">
                    ${perguntas[i].title}
                </div>
                <ul class="respostas indice${i}">       
                </ul>
            </div>
        `
    }
    ExibirQuest(perguntas)
}

function ExibirQuest(data){
    console.log(data);
    for(let i=0; i<data.length; i++){
        const listaUl = document.querySelector(`.indice${i}`)
        const embaralhado = data[i].answers
        embaralhado.sort(embaralhar);
        for(let b=0; b<data[i].answers.length; b++){
            listaUl.innerHTML +=`
            <li>
                <img src="${data[i].answers[b].image}" alt="Imagem Não Encontrada">
                <div class="opcao">${embaralhado[b].text}</div>
            </li>
            `
        }
    }
}
function embaralhar() { 
	return Math.random() - 0.5; 
}