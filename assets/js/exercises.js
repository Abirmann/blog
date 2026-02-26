// Exercises JavaScript

// Данные упражнений
const exercisesData = {
    topics: [
        {
            id: 'beglye-glasnye',
            title: 'Правописание безударных беглых гласных',
            description: 'Выберите правильные варианты написания слов с беглыми гласными',
            difficulty: 'Средний',
            questionsCount: 10,
            questions: [
                {
                    id: 1,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'сон', correct: true },
                        { text: 'сен', correct: false }
                    ],
                    explanation: 'Правильно: сон (сна). Буква «о» является беглой гласной.'
                },
                {
                    id: 2,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'лёд', correct: true },
                        { text: 'льод', correct: false }
                    ],
                    explanation: 'Правильно: лёд (льда). Буква «ё» является беглой гласной.'
                },
                {
                    id: 3,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'день', correct: true },
                        { text: 'дейн', correct: false }
                    ],
                    explanation: 'Правильно: день (дня). Буква «е» является беглой гласной.'
                },
                {
                    id: 4,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'отец', correct: true },
                        { text: 'отиц', correct: false }
                    ],
                    explanation: 'Правильно: отец (отца). Буква «е» является беглой гласной.'
                },
                {
                    id: 5,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'огонь', correct: true },
                        { text: 'огойн', correct: false }
                    ],
                    explanation: 'Правильно: огонь (огня). Буква «о» является беглой гласной.'
                },
                {
                    id: 6,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'конец', correct: true },
                        { text: 'кониц', correct: false }
                    ],
                    explanation: 'Правильно: конец (конца). Буква «е» является беглой гласной.'
                },
                {
                    id: 7,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'замок', correct: true },
                        { text: 'замак', correct: false }
                    ],
                    explanation: 'Правильно: замок (замка). Буква «о» является беглой гласной.'
                },
                {
                    id: 8,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'пень', correct: true },
                        { text: 'пейн', correct: false }
                    ],
                    explanation: 'Правильно: пень (пня). Буква «е» является беглой гласной.'
                },
                {
                    id: 9,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'рожь', correct: true },
                        { text: 'рож', correct: false }
                    ],
                    explanation: 'Правильно: рожь (ржи). Беглая гласная здесь не используется.'
                },
                {
                    id: 10,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'кошелёк', correct: true },
                        { text: 'кошельок', correct: false }
                    ],
                    explanation: 'Правильно: кошелёк (кошелька). Буква «ё» является беглой гласной.'
                }
            ]
        },
        {
            id: 'udarnye-glasnye',
            title: 'Правописание ударных гласных',
            description: 'Упражнения на правописание слов с ударными гласными',
            difficulty: 'Лёгкий',
            questionsCount: 8,
            questions: [
                {
                    id: 1,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'мёд', correct: true },
                        { text: 'мед', correct: false }
                    ],
                    explanation: 'Правильно: мёд. После мягких согласных пишется «ё».'
                },
                {
                    id: 2,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'жёлтый', correct: true },
                        { text: 'желтый', correct: false }
                    ],
                    explanation: 'Правильно: жёлтый. В корне слова под ударением пишется «ё».'
                },
                {
                    id: 3,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'щётка', correct: true },
                        { text: 'щетка', correct: false }
                    ],
                    explanation: 'Правильно: щётка. После шипящих под ударением пишется «ё».'
                },
                {
                    id: 4,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'шёлк', correct: true },
                        { text: 'шелк', correct: false }
                    ],
                    explanation: 'Правильно: шёлк. После шипящих под ударением пишется «ё».'
                },
                {
                    id: 5,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'чёрный', correct: true },
                        { text: 'черный', correct: false }
                    ],
                    explanation: 'Правильно: чёрный. В корне слова под ударением пишется «ё».'
                },
                {
                    id: 6,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'пчёлка', correct: true },
                        { text: 'пчелка', correct: false }
                    ],
                    explanation: 'Правильно: пчёлка. В корне слова под ударением пишется «ё».'
                },
                {
                    id: 7,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'шёпот', correct: true },
                        { text: 'шепот', correct: false }
                    ],
                    explanation: 'Правильно: шёпот. После шипящих под ударением пишется «ё».'
                },
                {
                    id: 8,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'жёлудь', correct: true },
                        { text: 'желудь', correct: false }
                    ],
                    explanation: 'Правильно: жёлудь. В корне слова под ударением пишется «ё».'
                }
            ]
        },
        {
            id: 'pristavki',
            title: 'Правописание приставок',
            description: 'Упражнения на правильное написание приставок',
            difficulty: 'Сложный',
            questionsCount: 10,
            questions: [
                {
                    id: 1,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'разбить', correct: true },
                        { text: 'расбить', correct: false }
                    ],
                    explanation: 'Правильно: разбить. Перед звонкой согласной пишется «з».'
                },
                {
                    id: 2,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'расписание', correct: true },
                        { text: 'разписание', correct: false }
                    ],
                    explanation: 'Правильно: расписание. Перед глухой согласной пишется «с».'
                },
                {
                    id: 3,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'безопасный', correct: true },
                        { text: 'бесопасный', correct: false }
                    ],
                    explanation: 'Правильно: безопасный. Перед гласной пишется «з».'
                },
                {
                    id: 4,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'бесконечный', correct: true },
                        { text: 'безконечный', correct: false }
                    ],
                    explanation: 'Правильно: бесконечный. Перед глухой согласной пишется «с».'
                },
                {
                    id: 5,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'изгнать', correct: true },
                        { text: 'исгнать', correct: false }
                    ],
                    explanation: 'Правильно: изгнать. Перед звонкой согласной пишется «з».'
                },
                {
                    id: 6,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'испугать', correct: true },
                        { text: 'изпугать', correct: false }
                    ],
                    explanation: 'Правильно: испугать. Перед глухой согласной пишется «с».'
                },
                {
                    id: 7,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'воздать', correct: true },
                        { text: 'возтать', correct: false }
                    ],
                    explanation: 'Правильно: воздать. Перед звонкой согласной пишется «з».'
                },
                {
                    id: 8,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'восток', correct: true },
                        { text: 'возток', correct: false }
                    ],
                    explanation: 'Правильно: восток. Перед глухой согласной пишется «с».'
                },
                {
                    id: 9,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'разделить', correct: true },
                        { text: 'расделить', correct: false }
                    ],
                    explanation: 'Правильно: разделить. Перед звонкой согласной пишется «з».'
                },
                {
                    id: 10,
                    text: 'Выберите правильное написание:',
                    type: 'single',
                    options: [
                        { text: 'рассказать', correct: true },
                        { text: 'разсказать', correct: false }
                    ],
                    explanation: 'Правильно: рассказать. Перед глухой согласной пишется «с».'
                }
            ]
        }
    ]
};

// Состояние приложения
let currentTopic = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// DOM элементы
const topicSelection = document.getElementById('topic-selection');
const exerciseContainer = document.getElementById('exercise-container');
const resultsContainer = document.getElementById('results-container');
const topicsGrid = document.getElementById('topics-grid');
const exerciseTitle = document.getElementById('exercise-title');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const feedback = document.getElementById('feedback');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const retryBtn = document.getElementById('retry-btn');
const topicsBtn = document.getElementById('topics-btn');

// Инициализация
function init() {
    renderTopics();
    setupEventListeners();
}

// Отрисовка тем
function renderTopics() {
    topicsGrid.innerHTML = '';
    exercisesData.topics.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.innerHTML = `
            <h3>${topic.title}</h3>
            <p>${topic.description}</p>
            <div class="topic-meta">
                <span>📊 ${topic.difficulty}</span>
                <span>📝 ${topic.questionsCount} вопросов</span>
            </div>
        `;
        card.addEventListener('click', () => startExercise(topic.id));
        topicsGrid.appendChild(card);
    });
}

// Настройка слушателей событий
function setupEventListeners() {
    backBtn.addEventListener('click', showTopics);
    checkBtn.addEventListener('click', checkAnswer);
    nextBtn.addEventListener('click', nextQuestion);
    retryBtn.addEventListener('click', retryExercise);
    topicsBtn.addEventListener('click', showTopics);
}

// Показать список тем
function showTopics() {
    topicSelection.classList.remove('hidden');
    exerciseContainer.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    resetExercise();
}

// Начать упражнение
function startExercise(topicId) {
    currentTopic = exercisesData.topics.find(t => t.id === topicId);
    if (!currentTopic) return;

    resetExercise();
    topicSelection.classList.add('hidden');
    exerciseContainer.classList.remove('hidden');
    exerciseTitle.textContent = currentTopic.title;
    
    renderQuestion();
}

// Сбросить упражнение
function resetExercise() {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
}

// Отрисовать вопрос
function renderQuestion() {
    if (!currentTopic || currentQuestionIndex >= currentTopic.questions.length) {
        showResults();
        return;
    }

    const question = currentTopic.questions[currentQuestionIndex];
    
    // Обновить прогресс
    const progress = ((currentQuestionIndex) / currentTopic.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex + 1}/${currentTopic.questions.length}`;
    
    // Отрисовать вопрос
    questionNumber.textContent = `Вопрос ${currentQuestionIndex + 1}`;
    questionText.textContent = question.text;
    
    // Отрисовать варианты ответов
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        const inputType = question.type === 'single' ? 'radio' : 'checkbox';
        optionDiv.innerHTML = `
            <input type="${inputType}" name="answer" id="option-${index}" value="${index}">
            <label for="option-${index}">${option.text}</label>
        `;
        
        optionDiv.addEventListener('click', () => {
            const input = optionDiv.querySelector('input');
            if (question.type === 'single') {
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            }
            input.checked = !input.checked;
            optionDiv.classList.toggle('selected', input.checked);
        });
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Сбросить кнопки и feedback
    checkBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    feedback.classList.add('hidden');
}

// Проверить ответ
function checkAnswer() {
    const question = currentTopic.questions[currentQuestionIndex];
    const selectedOptions = Array.from(document.querySelectorAll('input[name="answer"]:checked'))
        .map(input => parseInt(input.value));
    
    if (selectedOptions.length === 0) {
        showFeedback('Выберите хотя бы один вариант ответа!', 'error');
        return;
    }
    
    // Проверка правильности ответа
    const correctOptions = question.options
        .map((opt, idx) => opt.correct ? idx : -1)
        .filter(idx => idx !== -1);
    
    const isCorrect = selectedOptions.length === correctOptions.length &&
        selectedOptions.every(idx => correctOptions.includes(idx));
    
    userAnswers.push({
        questionId: question.id,
        selected: selectedOptions,
        correct: correctOptions,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        score++;
    }
    
    // Визуальная обратная связь
    document.querySelectorAll('.option').forEach((optionDiv, index) => {
        optionDiv.classList.add('disabled');
        const input = optionDiv.querySelector('input');
        input.disabled = true;
        
        if (correctOptions.includes(index)) {
            optionDiv.classList.add('correct');
        } else if (selectedOptions.includes(index)) {
            optionDiv.classList.add('incorrect');
        }
    });
    
    // Показать объяснение
    if (isCorrect) {
        showFeedback(`
            <div class="feedback-title">✓ Правильно!</div>
            <div>${question.explanation}</div>
        `, 'success');
    } else {
        showFeedback(`
            <div class="feedback-title">✗ Неправильно</div>
            <div>${question.explanation}</div>
        `, 'error');
    }
    
    checkBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
}

// Следующий вопрос
function nextQuestion() {
    currentQuestionIndex++;
    renderQuestion();
}

// Показать результаты
function showResults() {
    exerciseContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    const percentage = Math.round((score / currentTopic.questions.length) * 100);
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    
    document.getElementById('score-circle').style.strokeDashoffset = offset;
    document.getElementById('score-percentage').textContent = `${percentage}%`;
    document.getElementById('correct-count').textContent = score;
    document.getElementById('total-count').textContent = currentTopic.questions.length;
    
    let message = '';
    if (percentage === 100) {
        message = 'Отлично! Вы ответили на все вопросы правильно! 🎉';
    } else if (percentage >= 80) {
        message = 'Очень хорошо! Продолжайте в том же духе! 👏';
    } else if (percentage >= 60) {
        message = 'Хорошо! Есть над чем поработать. 👍';
    } else {
        message = 'Стоит повторить материал и попробовать ещё раз. 📚';
    }
    
    document.getElementById('score-message').textContent = message;
}

// Повторить упражнение
function retryExercise() {
    resetExercise();
    resultsContainer.classList.add('hidden');
    exerciseContainer.classList.remove('hidden');
    renderQuestion();
}

// Показать обратную связь
function showFeedback(message, type) {
    feedback.innerHTML = message;
    feedback.className = `feedback ${type}`;
    feedback.classList.remove('hidden');
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', init);


















