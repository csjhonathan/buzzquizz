const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/';
const container = document.querySelector('.container');
const newQuizz = container.querySelector('.novoQuizz');
const allQuizzes = container.querySelector('.todosQuizzes');
const quizzTeste = {
    title: "SEGUNDATESTETESTETEJSTETESTETESTE",
    image: "https://http.cat/411.jpg",
    questions: [
        {
            title: "Título da pergunta 1",
            color: "#123456",
            answers: [
                {
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
        },
        {
            title: "Título da pergunta 2",
            color: "#123456",
            answers: [
                {
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
        },
        {
            title: "Título da pergunta 3",
            color: "#123456",
            answers: [
                {
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
        }
    ],
    levels: [
        {
            title: "Título do nível 1",
            image: "https://http.cat/411.jpg",
            text: "Descrição do nível 1",
            minValue: 0
        },
        {
            title: "Título do nível 2",
            image: "https://http.cat/412.jpg",
            text: "Descrição do nível 2",
            minValue: 50
        }
    ]
}
const localQuizzes = Object.keys(localStorage).reverse();
let resultado = [];
const respostas = []
let data = []

//VARIAVEIS DA TELA 3 5
let newUserQuizz;
//VARIAVEIS DA TELA 3
let lvlList = '';
let lvlNodeList;
let quizzes = [];
let questionsList = '';
let questionsNodeList;
let quizzTitle;
let quizzImgUrl;
let quizzQuestionsQtt;
let quizzLevelsQtt;
let successUserQuizz;
let failedUserQuizz;
const userQuizz = {
    title: quizzTitle,
    image: quizzImgUrl,
    questions: [],
    levels: []
};
const telaUm = document.querySelector('.telaUm')
const telaTres = document.querySelector('.telaTres');
const telaDois = document.querySelector('.telaDois');
//TELA 3.1
const basicInfo = document.querySelector('.basicInfo');
//TELA 3.2
const quizzQuestions = document.querySelector('.telaTres .quizzQuestions');
//TELA 3.3
const selectLevel = document.querySelector('.telaTres .selectLevel');
//TELA 3.4
const quizzCreated = document.querySelector('.telaTres .quizzCreated');
//================================

todosQuizzes();


function ShowUserQuizz() {


    const userQuizzesScreen = document.querySelector('.userQuizz');
    const userQuizzTitle = document.querySelector('.userQuizzes .titulo')

    if (localQuizzes.length <= 0) {
        return
    }

    userQuizzesScreen.classList.add('userQuizzDisplayed');
    userQuizzesScreen.classList.remove('userQuizz');
    userQuizzTitle.innerHTML = `Seus Quizzes <ion-icon onclick ="goTocreatQuizz()" class = "addQuizz" name="add-circle"></ion-icon>`
    userQuizzesScreen.innerHTML = '';
    for (let i = 0; i < localQuizzes.length; i++) {
        axios
            .get(url + localQuizzes[i])
            .then(response => {
                const individualQuizz = response.data
                userQuizzesScreen.innerHTML += `
                <li onclick = 'openQuizz(this)' data-id = '${individualQuizz.id}' data-key ='${localStorage.getItem(localQuizzes[i])}' >
                    <img src="${individualQuizz.image}" alt="">
                    <div class="gradient"><p>${individualQuizz.title}</p></div>
                </li>
                `
            })
    }
}
function todosQuizzes() {


    const promisse = axios.get(url);

    promisse.then((resposta) => {
        container.innerHTML = `
        <div class="telaUm ">
        <div class = 'userQuizzes'>
            <p class="titulo"></p>
            <ul class="userQuizz">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button onclick = 'goTocreatQuizz()'>Criar Quizz</button>
            </ul>
        </div>
        <div class="todosQuizzes">
            <p class="titulo">
                Todos os Quizzes
            </p>
            <ul class="listaQuizzes">

            </ul>
        </div>
    </div>`
        quizzes = resposta.data;
        quizzesIniciais();
        ShowUserQuizz();
    })

    promisse.catch(() => {
        alert("Algo inesperado aconteceu, a pagina sera reiniciada")
        window.location.reload(true)
    })


}
function quizzesIniciais() {
    const iniciais = document.querySelector('.listaQuizzes');
    let serverQuizzList = 0;
    iniciais.innerHTML = ''
    if (localQuizzes !== null) {
        for (let i = 0; serverQuizzList < 6; i++) {
            if (localQuizzes.includes(quizzes[i].id.toString())) {
            } else {
                const boxQuizz = `
            <li onclick = openQuizz(this) data-id = '${quizzes[i].id}' class='serverQuizz' >
                <img src="${quizzes[i].image}" alt="">
                <div class="gradient"><p>${quizzes[i].title}</p></div>
                
            </li>
            `
                    ; iniciais.innerHTML += boxQuizz
                serverQuizzList = document.querySelectorAll('.serverQuizz').length;

            }
        }
    }
}
const openQuizz = (quizz) => {
    const quizzId = quizz.getAttribute('data-id');
    axios
        .get(url + quizzId)
        .then(response => {
            showQuizz(response)
        })
        .catch(ErroExibirQuizz)
}
const showQuizz = receivedQuizz => {
    const quizzData = receivedQuizz.data;
    resultado = receivedQuizz.data.levels;
    data = receivedQuizz
    container.innerHTML = `
    <div class="telaDois">
    <div class="topo">
        <img src="${quizzData.image}" alt="Imagem Não Encontrada" class="quizzHeader">
        <div></div>
        <div><span>${quizzData.title}</span></div>
    </div>
    <div class="questionBox">${getQuestionTemplate(quizzData)}</div>
    <footer class="hidden"></footer>
    <div class="botoes hidden"></div>`;

    document.querySelector(".telaDois").scrollIntoView({ behavior: "smooth" })
}

function getQuestionTemplate(quizzData) {
    let questionsTemplate = '';
    const quizzQuestions = quizzData.questions;
    for (let i = 0; i < quizzQuestions.length; i++) {
        questionsTemplate += `
        <div class="perguntas proxima">
            <div class="pergunta" style = "background-color: ${quizzQuestions[i].color}">
                <h1>${quizzQuestions[i].title}</h1>
            </div>
            <ul class="respostas">${getAnswers(quizzQuestions[i].answers, [i])}</ul>
        </div>`
    }
    return questionsTemplate;
}
function getAnswers(quizzAnswers) {
    const sortedAnswers = quizzAnswers.sort(embaralhar);
    let answersTemplate = '';
    for (let i = 0; i < quizzAnswers.length; i++) {
        answersTemplate += `
            <li onclick="marcar(this)" data-iscorrect = '${sortedAnswers[i].isCorrectAnswer}'>
                <img src="${sortedAnswers[i].image}" alt="Imagem Não Encontrada">
                <div class="opcao ${sortedAnswers[i].isCorrectAnswer}">${sortedAnswers[i].text}</div>
            </li>`

    }
    return answersTemplate;
}
//FUNÇÕES 3 =======================================================


function goTocreatQuizz() {
    container.innerHTML = `
    <div class="telaTres">
            <div class="basicInfo">
                <p>Comece pelo começo</p>
                <div class="inputs">
                    <div><input onkeyup="inputValidatorQuizz(this)" type="text" placeholder="Título do seu quizz" required class="quizzTitle"><p class='warning'></p></div>
                    <div><input onkeyup="inputValidatorQuizz(this)" type="text" placeholder="URL da imagem do seu quizz" required class="quizzImgUrl"><p class='warning'></p></div>
                    <div><input onkeyup="inputValidatorQuizz(this)" type="text" placeholder="Quantidade de perguntas do quizz" required class="quizzQuestionsQtt"><p class='warning'></p></div>
                    <div><input onkeyup="inputValidatorQuizz(this)" type="text" placeholder="Quantidade de níveis do quizz" required class="quizzLevelsQtt"><p class='warning'></p></div>
                </div>
                <button onclick = goToCreatQuestions()>Prosseguir pra criar perguntas</button>
            </div>
        </div>`
}

function goToCreatQuestions() {
    if (isBlank() === false) {
        return
    } else if (isValid(quizzTitle, quizzImgUrl, quizzQuestionsQtt, quizzLevelsQtt) === false) {
        return
    }

    container.querySelector('.telaTres').innerHTML = `
    <div class="quizzQuestions">
    <p>Crie suas perguntas</p>
    <div>${questionsCards(quizzQuestionsQtt)}</div>
    <button onclick = 'goToCreatLevels()'>Prosseguir pra criar níveis</button>
    </div>
    `
}

function goToCreatLevels() {
    const questionsNodeList = document.querySelectorAll('.question');
    if (checkQuestionsIsBlank(questionsNodeList) === false) {
        return
    }

    if (checkQuestionsIsValid(questionsNodeList) === false) {
        return
    }

    creatQuizzObj();
    container.querySelector('.telaTres').innerHTML = `
    <div class="selectLevel">
    <p>Agora, decida os níveis </ion-icon></p>
    <div class="levels">${levelsCards(quizzLevelsQtt)}</div>
    <button onclick = 'goToQuizzCreated()'>Finalizar Quizz</button>
    </div>`
    lvlNodeList = document.querySelectorAll('.level');
}

function goToQuizzCreated() {
    const levelsNodeList = document.querySelectorAll('.level');
    if (checkLevelsIsBlank(levelsNodeList) === false) {
        return
    }

    if (checkLevelsIsValid(levelsNodeList) === false) {
        return
    }
    setLvlObj();
    sendRequest(userQuizz);
}
function sendRequest(newQuizz) {
    axios
        .post(url, newQuizz)
        .then(response => {
            localStorage.setItem(response.data.id, response.data.key)
            container.querySelector('.telaTres').innerHTML = `
    <div class="quizzCreated">
        <p>Seu quizz está pronto!</p>
        <div class="photo">
            <img src="${newQuizz.image}" alt="">
            <p>${newQuizz.title}</p>
        </div>
        <button onclick = 'accessQuizz()'> Acessar Quizz</button>
        <button onclick = 'goToHome()'> Voltar pra home</button>
    </div>`
            newUserQuizz = response;
        })
        .catch(() => {
            alert('erro ao enviar o quizz')
        })


}
function isBlank() {
    if (quizzTitle === undefined ||
        quizzImgUrl === undefined ||
        quizzQuestionsQtt === undefined ||
        quizzLevelsQtt === undefined) {
        alert('Preencha todos os campos')
        return false
    }

}

function isValid() {
    if (quizzTitle.length < 20 || quizzTitle.length > 65) {
        alert('Titulo com tamanho invalido');
        return false
    }
    if (quizzImgUrl.includes('https://') || quizzImgUrl.includes('http://')) {
        if (quizzImgUrl.includes('.jpg') || quizzImgUrl.includes('.jpeg') || quizzImgUrl.includes('.png') || quizzImgUrl.includes('.webp')) {
        } else {
            alert('insira uma URL válida para sua imagem')
            return false
        }
    } else {
        alert('insira uma URL válida para sua imagem')
        return false
    }
    if (!Number(quizzQuestionsQtt) || Number(quizzQuestionsQtt) < 3) {
        alert('Quantidade de perguntas inválida (pelo menos 3)')
        return false
    }
    if (!Number(quizzLevelsQtt) || Number(quizzLevelsQtt) < 2) {
        alert('Quantidade de níveis inválida (pelo menos 2)')
        return false
    }

}

function creatQuizzObj() {
    questionsNodeList = document.querySelectorAll('.question');
    userQuizz.title = quizzTitle;
    userQuizz.image = quizzImgUrl;

    const questionsListObj = [];
    for (let i = 0; i < quizzQuestionsQtt; i++) {
        const question = {
            title: questionsNodeList[i].querySelector('.questionText').value,
            color: questionsNodeList[i].querySelector('.questionColor').value,
            answers: [{
                text: questionsNodeList[i].querySelector('.questionCorrectAnswer').value,
                image: questionsNodeList[i].querySelector('.questionCorrectAnswerImg').value,
                isCorrectAnswer: true
            }, {
                text: questionsNodeList[i].querySelector('.wrongOne').value,
                image: questionsNodeList[i].querySelector('.wrongOneImg').value,
                isCorrectAnswer: false
            }]
        }
        if (questionsNodeList[i].querySelector('.wrongTwo').value !== '' && questionsNodeList[i].querySelector('.wrongTwoImg').value !== '') {
            question.answers.push({
                text: questionsNodeList[i].querySelector('.wrongTwo').value,
                image: questionsNodeList[i].querySelector('.wrongTwoImg').value,
                isCorrectAnswer: false
            })
        }
        if (questionsNodeList[i].querySelector('.wrongThree').value !== '' && questionsNodeList[i].querySelector('.wrongThreeImg').value !== '') {
            question.answers.push({
                text: questionsNodeList[i].querySelector('.wrongThree').value,
                image: questionsNodeList[i].querySelector('.wrongThreeImg').value,
                isCorrectAnswer: false
            })
        }
        questionsListObj.push(question)
    }

    userQuizz.questions = questionsListObj;
}

function setLvlObj() {
    for (let i = 0; i < quizzLevelsQtt; i++) {
        userQuizz.levels.push({
            title: lvlNodeList[i].querySelector('.lvlTitle').value,
            image: lvlNodeList[i].querySelector('.lvlImgUrl').value,
            text: lvlNodeList[i].querySelector('.lvlDescription').value,
            minValue: lvlNodeList[i].querySelector('.lvlPercentage').value
        })
    }
}

function levelsCards(l) {
    for (let i = 1; i <= l; i++) {

        lvlList += `
        <div class="level closed">
        <p>Nível ${i} <ion-icon name="create" onclick = showLevel(this)></ion-icon></p>
        <div><input onkeyup="inputValidatorLevel(this)" type="text" required placeholder="Título do nível" class='lvlTitle'><p class ="warning"></p></div>
        <div><input onkeyup="inputValidatorLevel(this)" type="text" required placeholder="% de acerto mínima(apenas numeros)" class='lvlPercentage'><p class ="warning"></p></div>
        <div><input onkeyup="inputValidatorLevel(this)" type="text" required placeholder="URL da imagem do nível" class='lvlImgUrl'><p class ="warning"></p></div>
        <div><input onkeyup="inputValidatorLevel(this)" type="text" required placeholder="Descrição do nível" class='lvlDescription'><p class ="warning"></p></div>
    </div>`
    }

    return lvlList;
}

function questionsCards(quizzQuestionsQtt) {
    for (let i = 1; i <= quizzQuestionsQtt; i++) {
        questionsList += `
        <div class="question">
        <div class="doQuestion ">
            <p>Pergunta ${i} <ion-icon name="create" onclick="showQuestion(this)"></ion-icon></p>
            <div><input onkeyup="inputValidatorQuestion(this)" type="text" required placeholder="Texto da pergunta" class='questionText' ><p class ="warning">campo obrigatório</p></div>
            <div><input onkeyup="inputValidatorQuestion(this)" type="text" required placeholder="Cor de fundo da pergunta" class='questionColor'><p class ="warning">campo obrigatório</p></div>            
        </div>
        <div class="correctAnswer">
            <p>Resposta correta</p>
            <div><input onkeyup="inputValidatorQuestion(this)" type="text" required placeholder="Resposta correta" class='questionCorrectAnswer'><p class ="warning">campo obrigatório</p></div>
            <div><input onkeyup="inputValidatorQuestion(this)" type="text" required placeholder="URL da imagem" class='questionCorrectAnswerImg'><p class ="warning">campo obrigatório</p></div>
        </div>
        <div class="wrongAnswers">
            <p>Respostas incorretas</p>
            <div class="wrong">
                <div><input onkeyup="inputValidatorQuestion(this)" type="text" required placeholder="Resposta incorreta 1" class = 'wrongOne'><p class ="warning">campo obrigatório</p></div>
                <div><input onkeyup="inputValidatorQuestion(this)" type="text" required placeholder="URL da imagem 1" class = 'wrongOneImg'><p class ="warning">campo obrigatório</p></div>
            </div>
            <div class="wrong">
                <div><input onkeyup="inputValidatorQuestion(this)" type="text" placeholder="Resposta incorreta 2" class = 'wrongTwo'><p class ="warning"></p></div>
                <div><input onkeyup="inputValidatorQuestion(this)" type="text" placeholder="URL da imagem 2" class = 'wrongTwoImg'><p class ="warning"></p></div>
            </div>
            <div class="wrong">
                <div><input onkeyup="inputValidatorQuestion(this)" type="text" placeholder="Resposta incorreta 3" class = 'wrongThree'><p class ="warning"></p></div>
                <div><input onkeyup="inputValidatorQuestion(this)" type="text" placeholder="URL da imagem 3" class = 'wrongThreeImg'><p class ="warning"></p></div>
            </div>
        </div>
    </div>`
    }

    return questionsList;
}
function showLevel(cardLvl) {
    const clickedCardLvl = cardLvl.parentElement.parentElement;
    const selectedBefore = document.querySelector('.level.openedLvl');

    if (selectedBefore !== null) {
        selectedBefore.classList.remove('openedLvl');
    }
    clickedCardLvl.classList.add('openedLvl');
}

function showQuestion(cardQuestion) {
    const clickedCardQuestion = cardQuestion.parentElement.parentElement.parentElement;
    const selectedBefore = document.querySelector('.question.opened');

    if (selectedBefore !== null) {
        selectedBefore.classList.remove('opened');
    }
    clickedCardQuestion.classList.add('opened');
}

function goToHome() {
    window.location.reload()
}
function accessQuizz() {
    axios
        .get(url + newUserQuizz.data.id)
        .then(response => {
            showQuizz(response)
        })
        .catch(() => {
            alert('falha ao acessar o quizz')
        })
}
function checkQuestionsIsBlank(questionsNodeList) {
    for (let i = 0; i < questionsNodeList.length; i++) {
        const questionTitle = questionsNodeList[i].querySelector('.questionText').value;
        const questionColor = questionsNodeList[i].querySelector('.questionColor').value;
        const questionCorrectAnswer = questionsNodeList[i].querySelector('.questionCorrectAnswer').value;
        const questionCorrectAnswerImg = questionsNodeList[i].querySelector('.questionCorrectAnswerImg').value;
        const wrongOne = questionsNodeList[i].querySelector('.wrongOne').value;
        const wrongOneImg = questionsNodeList[i].querySelector('.wrongOneImg').value;
        if (questionTitle === ''
            || questionColor === ''
            || questionCorrectAnswer === ''
            || questionCorrectAnswerImg === ''
            || wrongOne === ''
            || wrongOneImg === '') {
            alert('Preencha todos os campos obrigatórios')
            return false
        }
    }
}

function checkQuestionsIsValid(questionsNodeList) {

    for (let i = 0; i < questionsNodeList.length; i++) {
        const questionTitle = questionsNodeList[i].querySelector('.questionText').value;
        const questionColor = questionsNodeList[i].querySelector('.questionColor').value;
        const questionCorrectAnswerImg = questionsNodeList[i].querySelector('.questionCorrectAnswerImg').value;
        const wrongOneImg = questionsNodeList[i].querySelector('.wrongOneImg').value;
        const wrongTwo = questionsNodeList[i].querySelector('.wrongTwo').value;
        const wrongTwoImg = questionsNodeList[i].querySelector('.wrongTwoImg').value;
        const wrongThree = questionsNodeList[i].querySelector('.wrongThree').value;
        const wrongThreeImg = questionsNodeList[i].querySelector('.wrongThreeImg').value;
        if (questionTitle.length < 20) {
            alert(`seu titulo da pergunta ${i + 1} é pequeno`)
            return false
        }

        if ((questionColor.length < 4 || questionColor.length > 7) && !questionColor.includes("#")) {
            alert(`sua cor da pergunta ${i + 1} está no formato incorreto`)
            return false
        }

        if (questionCorrectAnswerImg.includes('https://') || questionCorrectAnswerImg.includes('http://')) {
            if (!questionCorrectAnswerImg.includes('.jpg') && !questionCorrectAnswerImg.includes('.jpeg') && !questionCorrectAnswerImg.includes('.png') && !questionCorrectAnswerImg.includes('.webp')) {
                alert(`A URL INFORMADA NA RESPOSTA CORRETA DA PERGUNTA ${i + 1} NÃO É UMA IMAGEM`)
                return false
            }
        } else {
            alert(`A URL INFORMADA NA RESPOSTA CORRETA DA PERGUNTA ${i + 1} NÃO É VÁLIDA`)
            return false
        }

        if (wrongOneImg.includes('https://') || wrongOneImg.includes('http://')) {
            if (!wrongOneImg.includes('.jpg') && !wrongOneImg.includes('.jpeg') && !wrongOneImg.includes('.png') && !wrongOneImg.includes('.webp')) {
                alert(`A URL INFORMADA NA RESPOSTA INCORRETA(1) DA PERGUNTA ${i + 1} NÃO É UMA IMAGEM`)
                return false
            }
        } else {
            alert(`A URL INFORMADA NA RESPOSTA INCORRETA(1) DA PERGUNTA ${i + 1} NÃO É VÁLIDA`)
            return false
        }

        if (wrongTwo !== '') {
            if (wrongTwoImg.includes('https://') || wrongTwoImg.includes('http://')) {
                if (!wrongTwoImg.includes('.jpg') && !wrongTwoImg.includes('.jpeg') && !wrongTwoImg.includes('.png') && !wrongTwoImg.includes('.webp')) {
                    alert(`A URL INFORMADA NA RESPOSTA INCORRETA(2) DA PERGUNTA ${i + 1} NÃO É UMA IMAGEM`)
                    return false
                }
            } else {
                alert(`A URL INFORMADA NA RESPOSTA INCORRETA(2) DA PERGUNTA ${i + 1} NÃO É VÁLIDA`)
                return false
            }
        }
        if (wrongThree !== '') {
            if (wrongThreeImg.includes('https://') || wrongThreeImg.includes('http://')) {
                if (!wrongThreeImg.includes('.jpg') && !wrongThreeImg.includes('.jpeg') && !wrongThreeImg.includes('.png') && !wrongThreeImg.includes('.webp')) {
                    alert(`A URL INFORMADA NA RESPOSTA INCORRETA(3) DA PERGUNTA ${i + 1} NÃO É UMA IMAGEM`)
                    return false
                }
            } else {
                alert(`A URL INFORMADA NA RESPOSTA INCORRETA(3) DA PERGUNTA ${i + 1} NÃO É VÁLIDA`)
                return false
            }
        }
    }
    // http://.jpg
}
function checkLevelsIsBlank(levelsNodeList) {
    for (let i = 0; i < levelsNodeList.length; i++) {
        const lvlTitle = levelsNodeList[i].querySelector('.lvlTitle').value;
        const lvlPercentage = levelsNodeList[i].querySelector('.lvlPercentage').value;
        const lvlImgUrl = levelsNodeList[i].querySelector('.lvlImgUrl').value;
        const lvlDescription = levelsNodeList[i].querySelector('.lvlDescription').value;
        if (lvlTitle === ''
            || lvlPercentage === ''
            || lvlImgUrl === ''
            || lvlDescription === '') {
            alert('Preencha todos os campos')
            return false
        }
    }
}

function checkLevelsIsValid(levelsNodeList) {
    const setLevelsComparasion = [];
    let comparador = '';
    for (let i = 0; i < levelsNodeList.length; i++) {
        const lvlTitle = levelsNodeList[i].querySelector('.lvlTitle').value;
        const lvlPercentage = levelsNodeList[i].querySelector('.lvlPercentage').value;
        const lvlImgUrl = levelsNodeList[i].querySelector('.lvlImgUrl').value;
        const lvlDescription = levelsNodeList[i].querySelector('.lvlDescription').value;

        if (lvlTitle.length < 10) {
            alert(`seu titulo do nível ${i + 1} é pequeno`)
            return false
        }

        if (Number(lvlPercentage) < 0 || Number(lvlPercentage) > 100) {
            alert(`a porcentagem de acerto do nivel ${i + 1} deve estar entre 0 e 100`)
            return false
        }

        if (lvlImgUrl.includes('https://') || lvlImgUrl.includes('http://')) {
            if (!lvlImgUrl.includes('.jpg') && !lvlImgUrl.includes('.jpeg') && !lvlImgUrl.includes('.png') && !lvlImgUrl.includes('.webp')) {
                alert(`A URL INFORMADA NO NÍVEL ${i + 1} NÃO É UMA IMAGEM`)
                return false
            }
        } else {
            alert(`A URL INFORMADA NO NÍVEL ${i + 1} NÃO É VÁLIDA`)
            return false
        }

        if (lvlDescription.length < 30) {
            alert(`sua descrição do nível ${i + 1} é pequena`)
            return false
        }
        setLevelsComparasion.push(Number(lvlPercentage))
    }
    for (let i = 0; i < setLevelsComparasion.length; i++) {
        if (comparador === '' && setLevelsComparasion[i] === 0) {
            comparador = Number(setLevelsComparasion[i]);
        }
    }

    if (comparador !== 0) {
        alert('Pelo menos um nivel deve ter taxa de acerto igual a 0')
        return false
    }
    // http://.jpg
}
// Tela Dois 
function ErroExibirQuizz(resposta) {
    alert("O Quizz que você procura não se encontra disponível, selecione outro para continuar com a diversão");
    window.location.reload(true);
}
function embaralhar() {
    return Math.random() - 0.5;
}
function marcar(selecionado) {
    const Jaselecionada = document.querySelector("ul .marcada");
    const UlJaMarcada = selecionado.parentNode.classList.contains("Ulmarcada");
    const proxima = document.querySelector('.proxima');
    if (Jaselecionada === null && !UlJaMarcada) {
        selecionado.classList.add("marcado");
        selecionado.parentNode.classList.add("Ulmarcada");
        proxima.classList.remove('proxima');
    }
    setTimeout(rolar, 2000);

}
function rolar() {
    const proxima = document.querySelector('.proxima');
    if (proxima !== null) {
        proxima.scrollIntoView({ behavior: "smooth" });
    } else {
        avaliar();
    }
}
function avaliar() {
    const verdadeiro = document.querySelectorAll(".marcado .true");
    const falso = document.querySelectorAll(".marcado .false");
    const total = verdadeiro.length + falso.length;
    const score = Math.floor((verdadeiro.length / total) * 100);
    CreateFinal(resultado, score);
}
function CreateFinal(final, pontuacao) {
    const rodape = document.querySelector("footer");
    const buttons = document.querySelector(".botoes")
    buttons.classList.remove("hidden")
    rodape.classList.remove("hidden")
    buttons.innerHTML = `
    <button onclick = 'RefazerQuizz(${data.data.id})'>Reiniciar Quizz</button>
    <button onclick = 'goToHome()'> Voltar pra home</button>`

    for (let i = 0; i < final.length; i++) {
        if (pontuacao >= final[i].minValue) {
            rodape.innerHTML = `
        <div class="resultado">${final[i].title}</div>
        <div class="conteudo">
            <img src="${final[1].image}" alt="Imagem não encontrada">
            <div class="texto">${final[i].text}</div>
        </div>`;
        }
    }
    document.querySelector("footer").scrollIntoView({ behavior: "smooth" });
}

function RefazerQuizz(identificador) {
    axios
        .get(url + identificador)
        .then(response => {
            showQuizz(response)
        })
        .catch(() => {
            alert('falha ao acessar o quizz')
        })
}
//BONUS

//VALIDADORES DE INPUT
function inputValidatorQuizz(input) {
    //verifica se o titulo tem a quantidade esperada de caracteres e muda seu background de acordo
    if (input.classList.contains("quizzTitle")) {
        let warningArea = input.parentElement.querySelector('.warning');
        if (input.value.length === 0) {
            warningArea.innerHTML = '';
            input.classList.remove('invalidInput')
        } else if (input.value.length < 20 || input.value.length >= 65) {
            if (input.value.length < 20) {
                warningArea.innerHTML = `o titulo deve ter pelo menos 20 caracteres (${input.value.length}) `
            } else if (input.value.length >= 65) {
                warningArea.innerHTML = `o titulo deve ter no máximo 65 caracteres(${input.value.length})`
            }
            input.classList.add('invalidInput')
        } else if (input.value.length > 20 || input.value.length <= 65) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }

        quizzTitle = input.value;
    }

    //verifica se a url é válida e muda seu background de acordo
    if (input.classList.contains("quizzImgUrl")) {
        let warningArea = input.parentElement.querySelector('.warning');
        if (input.value.length === 0) {
            warningArea.innerHTML = ``;
            input.classList.remove('invalidInput')
        }

        if (input.value.length > 0) {
            warningArea.innerHTML = ` O valor informado não é uma URL`
            input.classList.add('invalidInput')
        }

        if (input.value.includes('https://') || input.value.includes('http://')) {
            if (input.value.includes('.jpg') || input.value.includes('.jpeg') || input.value.includes('.png') || input.value.includes('.webp')) {
                input.classList.remove('invalidInput')
                warningArea.innerHTML = ``
            } else {
                input.classList.add('invalidInput')
                warningArea.innerHTML = ` O valor informado não é uma URL válida`
            }
        }
        quizzImgUrl = input.value;
    }

    //verifica se o input é um numero e se é > 3 mudando seu estilo de acordo
    if (input.classList.contains("quizzQuestionsQtt")) {
        let warningArea = input.parentElement.querySelector('.warning');
        let inputNumber = Number(input.value)

        //fail-safe limpa o warningArea sempre e remove a invalidação
        if (input.value.length !== 0) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }

        if (input.value.length === 0) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')

        } else if (isNaN(inputNumber)) {
            warningArea.innerHTML = `você deve digitar apenas numeros`
            input.classList.add('invalidInput')
        } else if (inputNumber < 3) {
            warningArea.innerHTML = `o quizz deve ter, pelo menos, 3 perguntas`
            input.classList.add('invalidInput')
        } else if (inputNumber > 3) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')

        }
        quizzQuestionsQtt = input.value;

    }

    //verifica se o input é um numero e se é > 2 mudando seu estilo de acordo
    if (input.classList.contains("quizzLevelsQtt")) {
        let warningArea = input.parentElement.querySelector('.warning');
        let inputNumber = Number(input.value)
        //fail-safe limpa o warningArea sempre e remove a invalidação
        if (input.value.length !== 0) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }

        if (input.value.length === 0) {
            warningArea.innerHTML = ``;
            input.classList.remove('invalidInput')
        } else if (isNaN(inputNumber)) {
            warningArea.innerHTML = `você deve digitar apenas numeros`
            input.classList.add('invalidInput')
        } else if (inputNumber < 2) {
            warningArea.innerHTML = `o quizz deve ter, pelo menos, 2 niveis`
            input.classList.add('invalidInput')
        } else if (inputNumber > 2) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }
        quizzLevelsQtt = input.value;
    }
}//FEITO
function inputValidatorQuestion(input) {

    if (input.classList.contains("questionText")) {
        let warningArea = input.parentElement.querySelector('.warning');
        console.log(warningArea)
        if (input.value.length === 0) {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
        } else if (input.value.length <= 20) {
            warningArea.innerHTML = `o titulo deve ter pelo menos 20 caracteres (${input.value.length}) `
            input.classList.add('invalidInput')
        } else if (input.value.length > 20) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }
    }
    if (input.classList.contains("questionColor")) {
        let warningArea = input.parentElement.querySelector('.warning');
        if (input.value.length === 0 || input.value === '') {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
            return
        }
        if (!input.value.startsWith("#") || (input.value.length < 4 || input.value.length > 7)) {
            console.log('caiu aqui')
            warningArea.innerHTML = `formato de cor inválido `
            input.classList.add('invalidInput')
        }
        if (input.value.startsWith("#") && (input.value.length >= 4 && input.value.length <= 7)) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }
    }

    if (input.classList.contains("questionCorrectAnswer")) {
        let warningArea = input.parentElement.querySelector('.warning');
        console.log(warningArea)
        if (input.value.length === 0) {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
        } else if (input.value.length < 10) {
            warningArea.innerHTML = `o titulo deve ter pelo menos 10 caracteres (${input.value.length}) `
            input.classList.add('invalidInput')
        } else if (input.value.length > 10) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }
    }
    if (input.classList.contains("questionCorrectAnswerImg")) {
        let warningArea = input.parentElement.querySelector('.warning');
        if (input.value.length === 0) {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
        }

        if (input.value.length > 0) {
            warningArea.innerHTML = ` O valor informado não é uma URL`
            input.classList.add('invalidInput')
        }

        if (input.value.includes('https://') || input.value.includes('http://')) {
            if (input.value.includes('.jpg') || input.value.includes('.jpeg') || input.value.includes('.png') || input.value.includes('.webp')) {
                input.classList.remove('invalidInput')
                warningArea.innerHTML = ``
            } else {
                input.classList.add('invalidInput')
                warningArea.innerHTML = ` O valor informado não é uma URL válida`
            }
        }
    }


    if (input.classList.contains("wrongOne") || input.classList.contains("wrongTwo") || input.classList.contains("wrongThree")) {
        let warningArea = input.parentElement.querySelector('.warning');
        
        if ((input.classList.contains("wrongTwo") || input.classList.contains("wrongThree")) && (input.value.length === 0 || input.value === '' )) {
            warningArea.innerHTML = '';
            input.classList.remove('invalidInput')
            return
        }

        if (input.value.length === 0) {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
        } else if (input.value.length < 10) {
            warningArea.innerHTML = `o titulo deve ter pelo menos 10 caracteres (${input.value.length}) `
            input.classList.add('invalidInput')
        } else if (input.value.length > 10) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }
    }
    if (input.classList.contains("wrongOneImg") || input.classList.contains("wrongTwoImg") || input.classList.contains("wrongThreeImg")) {
        let warningArea = input.parentElement.querySelector('.warning');
        
        if ((input.classList.contains("wrongTwoImg") || input.classList.contains("wrongThreeImg")) && (input.value.length === 0 || input.value === '' )) {
            console.log('estou em branco')
            warningArea.innerHTML = '';
            input.classList.remove('invalidInput')
            return
        }
        
        if (input.value.length === 0 || input.value === '') {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
            return
        }

        if (input.value.length > 0) {
            warningArea.innerHTML = ` O valor informado não é uma URL`
            input.classList.add('invalidInput')
        }

        if (input.value.includes('https://') || input.value.includes('http://')) {
            if (input.value.includes('.jpg') || input.value.includes('.jpeg') || input.value.includes('.png') || input.value.includes('.webp')) {
                input.classList.remove('invalidInput')
                warningArea.innerHTML = ``
            } else {
                input.classList.add('invalidInput')
                warningArea.innerHTML = ` O valor informado não é uma URL válida`
            }
        }
    }
}//FEITO
function inputValidatorLevel(input) {
    if (input.classList.contains("lvlTitle")) {
        let warningArea = input.parentElement.querySelector('.warning');
        if (input.value.length === 0) {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
            return
        } else if (input.value.length <= 10) {
            warningArea.innerHTML = `o titulo deve ter pelo menos 10 caracteres (${input.value.length}) `
            input.classList.add('invalidInput')
        } else if (input.value.length > 10) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }
    }
    if (input.classList.contains("lvlImgUrl")) {
        let warningArea = input.parentElement.querySelector('.warning');
        if (input.value.length === 0) {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
            return
        }

        if (input.value.length > 0) {
            warningArea.innerHTML = ` O valor informado não é uma URL`
            input.classList.add('invalidInput')
        }

        if (input.value.includes('https://') || input.value.includes('http://')) {
            if (input.value.includes('.jpg') || input.value.includes('.jpeg') || input.value.includes('.png') || input.value.includes('.webp')) {
                input.classList.remove('invalidInput')
                warningArea.innerHTML = ``
            } else {
                input.classList.add('invalidInput')
                warningArea.innerHTML = ` O valor informado não é uma URL válida`
            }
        }
    }
    if (input.classList.contains("lvlDescription")) {
        let warningArea = input.parentElement.querySelector('.warning');
        if (input.value.length === 0) {
            warningArea.innerHTML = 'campo obrigatório';
            input.classList.remove('invalidInput')
            return
        } else if (input.value.length < 30) {
            warningArea.innerHTML = `o titulo deve ter pelo menos 30 caracteres (${input.value.length}) `
            input.classList.add('invalidInput')
        } else if (input.value.length > 30) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
        }
    }
    if (input.classList.contains("lvlPercentage")) {
        let warningArea = input.parentElement.querySelector('.warning');
        let inputNumber = Number(input.value)

        //fail-safe limpa o warningArea sempre e remove a invalidação
        if (input.value.length === 0) {
            warningArea.innerHTML = `campo obrigatório`
            input.classList.remove('invalidInput')
            return
        }

        if (input.value < 0 || input.value > 100 ) {
            warningArea.innerHTML = `digite um numero entre 0-100`
            input.classList.remove('invalidInput')
            return
        }

        if (input.value.length === 0) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')

        } else if (isNaN(inputNumber)) {
            warningArea.innerHTML = `você deve digitar apenas numeros`
            input.classList.add('invalidInput')
        } else if (input.value >= 0 || input.value <= 100) {
            warningArea.innerHTML = ``
            input.classList.remove('invalidInput')
            return
        } 

    }
}//FEITO 



