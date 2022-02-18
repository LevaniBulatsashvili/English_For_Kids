
const body = document.body;
const cards = document.querySelector('#cards');
const allText = document.querySelectorAll('.front div .text');
const dropdown = document.getElementById('drop');
const ul = document.getElementById('menu');
const toggle = document.querySelector('.toggle input');
const state = document.querySelector('.toggle .state');
const cardContainers = document.getElementsByClassName('card-container');
const flip = document.querySelectorAll('.flip');
const cardFronts = document.querySelectorAll('.front');
const cardBacks = document.querySelectorAll('.back');
const containers = document.querySelectorAll('.container');
const mainPage = document.querySelector('.main-page');
const stars = document.querySelector('#stars');

let wrongAnswers = 0;
let cardTexts = [];
let chosenText;

// categories
const flags = [['Argentina', 'Аргентина'], ['Australia', 'Австралия'], ['Brazil', 'Бразилия'], ['Canada', 'Канада'], ['France', 'Франция'], ['Georgia', 'Грузия'], ['Germany', 'Германия'], ['India', 'Индия']];
const flags2 = [['Ireland', 'Ирландия'], ['Italy', 'Италия'], ['Japan', 'Япония'], ['Mexico', 'Мексика'], ['Norway', 'Норвегия'], ['Poland', 'Польша'], ['Russia', 'Россия'], ['Singapore', 'Сингапур']];
const flags3 = [['Denmark', 'Дания'], ['Finland', 'Финляндия'], ['Iceland', 'Исландия'], ['Monaco', 'Монако'], ['Spain', 'Испания'], ['Sweden', 'Швеция'], ['Switzerland', 'Швейцария'], ['Ukraine', 'Украина']];
const birds = [['Chicken', 'Курица'], ['Falcon', 'Сокол'], ['Owl', 'Сова'], ['Parrot', 'Попугай'], ['Pelican', 'Пеликан'], ['Pigeon', 'Голубь'], ['Turkey', 'Индейка'], ['Woodpecker', 'Дятел']];
const amphibians = [['Chameleon', 'Хамелеон'], ['Frog', 'Лягушка'], ['Lizard', 'Ящерица'], ['Salamander', 'Саламандра'], ['Snail', 'Улитка'], ['Snake', 'Змея'], ['Toad', 'Жаба'], ['Turtle', 'Черепаха']];
const mammals = [['Cat', 'Кот'], ['Cow', 'Корова'], ['Dog', 'Собака'], ['Elephant', 'Слон'], ['Kangaroo', 'Кенгуру'], ['Lion', 'Лев'], ['Monkey', 'Обезьяна'], ['Skunk', 'Скунс']];
const cars = [['Audi', 'Audi'], ['Bugatti', 'Bugatti'], ['Ferrari', 'Феррари'], ['Jaguar', 'Ягуар'], ['Lamborgini', 'Ламборджини'], ['Mersedes', 'Mersedes'], ['Porsche', 'Порше'], ['Toyota', 'Тойота']];
const fruits = [['Ananas', 'Ананас'], ['Apple', 'яблоко'], ['Banana', 'Банан'], ['Cherry', 'вишня'], ['Coconut', 'Кокос'], ['Grape', 'Виноград'], ['Kiwi', 'киви'], ['Melon', 'Дыня']];

body.addEventListener('click', (e) => {
    if (ul.style.display === 'block' && e.target.tagName !== 'UL' && e.target.tagName !== 'IMG') {
        ul.style.display = 'none';
        ul.style.animation = 'slide 0s';
        dropdown.textContent = '≡';
    } else {
        ul.style.animation = '';
    }
}, true)

for (let i = 0; i < cardFronts.length; i += 1) {
    cardFronts[i].addEventListener('click', (e) => {
        if (!toggle.checked) {
                cardTexts.splice(0, cardTexts.length);
                const targetElementTag = e.target.tagName;
                if (targetElementTag === 'IMG' && e.target.className !== 'flip') {
                    speechSynthesis.speak(new SpeechSynthesisUtterance(e.target.nextElementSibling.textContent));
                } else if (targetElementTag === 'P') {
                    speechSynthesis.speak(new SpeechSynthesisUtterance(e.target.textContent));
                } else if (e.target.className === 'description') {
                    speechSynthesis.speak(new SpeechSynthesisUtterance(e.target.querySelector('p').textContent));
                }
        }  else if (cardTexts.length && e.target.parentElement.parentElement.style.opacity !== '0.5') {
            if (e.target.nextElementSibling.querySelector('p').textContent === chosenText) {
                stars.textContent += '★';
                if (stars.textContent.length > 20) {
                    stars.textContent = stars.textContent.slice(1);
                }
                const audio = new Audio('./audio/correct.mp3');
                audio.play();
                e.target.parentElement.parentElement.style.opacity = '0.5';
                removeArrayElement(cardTexts);
                if (cardTexts.length > 0) {
                    chosenText = cardTexts[Math.floor(Math.random()*cardTexts.length)];
                    setTimeout(() => speechSynthesis.speak(new SpeechSynthesisUtterance(chosenText)), 1500);
                } else {
                    if (wrongAnswers === 0) {
                        body.innerHTML = '<img src="./pictures/Win.png" alt=""> <h2>You won!</h2>';
                        body.style.textAlign = 'center';
                        setTimeout(() => window.location.href = 'index.html', 3000);
                    } else {
                        body.innerHTML = `<img src="./pictures/Lose.png" alt=""> <h2>You got ${wrongAnswers} answers wrong</h2>`;
                        body.style.textAlign = 'center';
                        setTimeout(() => window.location.href = 'index.html', 3000);
                    }
                }
            } else {
                stars.textContent += '✰';
                if (stars.textContent.length > 20) {
                    stars.textContent = stars.textContent.slice(1);
                }
                const audio = new Audio('./audio/error.mp3');
                audio.play();
                wrongAnswers += 1;
            }
        }
    })
}

dropdown.addEventListener('click', () => {
    if (!ul.style.animation) {
        ul.style.display = 'block';
        ul.style.animation = 'slide 1s';
        dropdown.textContent = 'x';
    }
    else {
        ul.style.display = 'none';
        ul.style.animation = '';
    }
})

function removeArrayElement (arr) {
    const index = arr.indexOf(chosenText);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

toggle.addEventListener('click', () => {
    if (toggle.checked) {
        for (container of cardContainers) {
            container.style.background = 'linear-gradient(180deg, rgba(255,97,5,1) 0%, rgba(255,255,255,1) 40%)';
        }
        state.textContent = 'PLAY';
        state.setAttribute('class', 'state play');
        ul.style.background = 'orangered';
    } else {
        stars.textContent = '';
        for (container of cardContainers) {
            container.style.background = 'linear-gradient(180deg, rgba(18,196,203,1) 0%, rgba(254,254,254,1) 40%)';
        }
        state.textContent = 'TRAIN';
        state.setAttribute('class', 'state train');
        ul.style.background = 'green';
    }

    if (state.textContent === 'PLAY' && containers.length) {
        for (let i = 0; i < cardFronts.length; i += 1) {
            cardFronts[i].querySelector('div').style.display = 'none';
        }
        const div = document.createElement('div');
        div.className = 'start';
        const button = document.createElement('button');
        button.className = 'start-button';
        button.textContent = 'Start Game';
        div.appendChild(button)
        body.appendChild(div);
        button.addEventListener('click', () => {
            while (cardTexts.length > 0) {
                cardTexts.pop();
            }
            for (let i = 0; i < allText.length; i += 1) {
                cardTexts.push(allText[i].textContent);
            }
            chosenText = cardTexts[Math.floor(Math.random()*cardTexts.length)];
            setTimeout(() => speechSynthesis.speak(new SpeechSynthesisUtterance(chosenText)), 500);
            removeArrayElement(cardTexts);
        })
    } else {
        for (let i = 0; i < cardFronts.length; i += 1) {
            cardFronts[i].querySelector('div').style.display = 'flex';
            cardFronts[i].parentElement.style.opacity = '1';
        }
        if (document.querySelector('.start')) {
            body.removeChild(document.querySelector('.start'));
        }
    }
})

flip.forEach(button => {
    button.addEventListener('click', (e) => {
        const clickedCard = e.target.parentElement.parentElement.parentElement;
        for (let i = 0; i < cardFronts.length; i += 1) {
            if (cardFronts[i] === clickedCard) {
                containers[i].addEventListener('mouseleave', () => {
                    cardFronts[i].style.animation = 'rotate-back 0.2s ease-in-out forwards';
                    cardBacks[i].style.animation = 'rotate-back 0s ease-in-out forwards reverse';
                    cardBacks[i].querySelector('div p').style.display = 'none';
                })
                cardFronts[i].style.animation = 'rotate 0.2s ease-in-out forwards';
                cardBacks[i].style.animation = 'rotate 0.2s 0.2s ease-in-out forwards reverse';
                cardBacks[i].querySelector('div p').style.display = 'block';
                break;
            }
        }
    })
})

ul.addEventListener('click', (e) => {
    localStorage.setItem('category', e.target.textContent);
})

if (mainPage !== null) {
    mainPage.addEventListener('click', (e) => {
        const targetElementTag = e.target.tagName;
        if (targetElementTag === 'IMG') {
            localStorage.setItem('category', e.target.nextElementSibling.textContent);
            window.location.href = 'cardSet.html'
        } else if (targetElementTag === 'H2') {
            localStorage.setItem('category', e.target.textContent);
            window.location.href = 'cardSet.html'
        } else if (targetElementTag === 'A') {
            localStorage.setItem('category', e.target.querySelector('h2').textContent)
            window.location.href = 'cardSet.html'
        } else if (e.target.className === 'card-container') {
            localStorage.setItem('category', e.target.querySelector('a h2').textContent);
            window.location.href = 'cardSet.html'
        }
    })
}

function setCategory (chosenCategory, categoryInfo) {
    for (let i=0; i < containers.length; i += 1) {
        const fullCard = containers[i].querySelectorAll('.card-set');
        fullCard[0].querySelector('img').src = `./pictures/${chosenCategory}/${categoryInfo[i][0]}.png`;
        fullCard[0].querySelector('div p').textContent = `${categoryInfo[i][0]}`;
        fullCard[1].querySelector('img').src = `./pictures/${chosenCategory}/${categoryInfo[i][0]}.png`;
        fullCard[1].querySelector('div p').textContent = `${categoryInfo[i][1]}`;
    }

}

for (let i=0; i < containers.length; i += 1) {
    const fullCard = containers[i].querySelectorAll('.card-set');
    switch (localStorage["category"]) {
        case 'Flags (set A)':
            setCategory('Flags (set A)', flags);
            break;
        case 'Flags (set B)':
            setCategory('Flags (set B)', flags2);
            break;
        case 'Flags (set C)':
            setCategory('Flags (set C)', flags3);
            break;
        case 'Birds':
            setCategory('Birds', birds);
            break;
        case 'Amphibians':
            setCategory('Amphibians', amphibians);
            break;
        case 'Mammals':
            setCategory('Mammals', mammals);
            break;
        case 'Cars':
            setCategory('Cars', cars);
            break;
        case 'Fruits':
            setCategory('Fruits', fruits);
            break;
    }
}
