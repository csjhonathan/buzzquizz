const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
const telaTres = document.querySelector('.telaTres');
const btn = telaTres.querySelector('button');
const quizzTitle = telaTres.querySelector('.quizzTitle');
const quizzImgUrl = telaTres.querySelector('.quizzImgUrl');
const quizzQuestionsQtt = telaTres.querySelector('.quizzQuestionsQtt');
const quizzLevelsQtt = telaTres.querySelector('.quizzLevelsQtt');



const oiVoceMeChamou = (titulo, img, questionsQtt, lvlsQtt) => {
    console.log(titulo, img, questionsQtt, lvlsQtt)
    const clearScreen = setTimeout( clear => telaTres.innerHTML = '', 1000);
}






btn.addEventListener('click', sendQuiz =>{
    
    if( quizzTitle.value === '' ||
        quizzImgUrl.value === '' ||
        quizzQuestionsQtt.value === '' ||
        quizzLevelsQtt.value === ''){

        alert('preencha os campos corretamente');
            return;

    }

    oiVoceMeChamou(quizzTitle.value, quizzImgUrl.value, quizzQuestionsQtt.value, quizzLevelsQtt.value);
    
    quizzTitle.value = '';
    quizzImgUrl.value = '';
    quizzQuestionsQtt.value = '';
    quizzLevelsQtt.value ='';
    
});
