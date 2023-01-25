let quizzes = [];

todosQuizzes();

function todosQuizzes() {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

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
        <li>
            <img src="${quizzes[i].image}" alt="">
            <p>${quizzes[i].title}</p>
        </li>
        `;
        iniciais.innerHTML += boxQuizz

        console.log(quizzes[i].image)
    }
}