const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "I am in the first week of the Project Phase. What is my task?",
        choice1: "Just chill, now is time to relax and let others do the work",
        choice2: "It's not my turn to engage much yet, I need UX to deliver first",
        choice3: "I am waiting on AI or DS teammates to tell me what to do",
        choice4: "I need to meet with everyone to brainstorm about how our app will look like and what we need to do first",
        answer: 4,
    },
    {
        question:"I am in the first meeting with my teammates. What do I do there?",
        choice1: "I will ask UX teammates if they can deliver everything until the end of the week",
        choice2: "I'll suggest to the team that we decide upon main app's features, so I can plan further my next steps",
        choice3: "I'm the smartest person in the room and I'll tell everyone how it should be done! WD rUlZzZ!!!1 ",
        choice4: "I will only be a silent observer and listen to what others have to say",
        answer: 2,
    },
    {
        question: "It's the 2nd week of the Project Phase. I still don't know what to do.",
        choice1: "I'm gonna drop out, maybe next semester they'll tell me what I should do",
        choice2: "I'm thinking about asking UX teammates if they can do their stuff quicker, I have a birthday, a wedding and a baby shower for this weekend and I need them to hurry up",
        choice3: "I'll meet with my WD/UX teammate(s) to check if we have our ideation completed and our primary features decided. Let's understand what to build first, which tools to use, etc. Also, let's avoid repeating and double work",
        choice4: "I'm thinking of changing the track, I don't like my teammates",
        answer: 3,
    },
    {
        question: "I am a BackEnd WD techie and I am not sure what my tasks can be?",
        choice1: "No tasks for me yet, I need a psychological preparation before I deep dive into servers, databases and querying",
        choice2: "I can do it in a day or two, I coded once my Binary search app in Python for a Hackathon and I am a well experienced h4cK3r!",
        choice3: "I need to refresh my knowledge on APIs, MongoDB and Nodemon first, I'll need another week or two",
        choice4: "I'll start building my (Express) server, then think through about do we need a DB server, too. I'll check what AI/DS needs from me, so I can prep things for them",
        answer: 4,
    },
    {
        question: "I want to start with my work, but there's only main branch in the project and you said we don't push directly to main branch...",
        choice1: "They say, I obey. Don't know how to make a new branch anyways",
        choice2: "I'll simply make my own branch and start working on it!",
        choice3: "Gonna ask if I can contribute to another project, they have other branches",
        choice4: "I know Git well enough, I feel free to git push --force to main branch",
        answer: 2,
    },
    {
        question:"It's the 3rd week of the Project Phase and I'm already done with my footer. Do I get my certificate?",
        choice1: "Yes, header and footer are the most important part of the app",
        choice2: "Yes, because I also styled our app's Navbar!",
        choice3: "Yes, because I also have other projects which I did on my own and I deployed them on Uglify",
        choice4: "No. This is just a little piece of work expected from me. There's a ton of work to come",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('finish.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const correctAnswer = currentQuestion.answer;
        let classToApply = selectedAnswer == correctAnswer ? 'correct' : 'incorrect';

        choices.forEach(choice => {
            const choiceNumber = choice.dataset['number'];
            if (choiceNumber == correctAnswer) {
                choice.parentElement.classList.add('correct');
            } else if (choiceNumber == selectedAnswer) {
                choice.parentElement.classList.add('incorrect');
            }
        });

        setTimeout(() => {
            choices.forEach(choice => {
                choice.parentElement.classList.remove('correct', 'incorrect');
            });
            if (classToApply === 'correct') {
                incrementScore(SCORE_POINTS);
            }
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()