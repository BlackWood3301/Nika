document.addEventListener('DOMContentLoaded', function() {
    // Фоновая музыка
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isPlaying = false;

    // Начинаем воспроизведение с 25 секунды
    backgroundMusic.currentTime = 25;

    // Добавляем слушатель для перемотки музыки на 25 секунду, когда она достигнет конца
    backgroundMusic.addEventListener('timeupdate', function() {
        if (backgroundMusic.currentTime >= backgroundMusic.duration - 0.5) {
            backgroundMusic.currentTime = 25;
        }
    });

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<span class="icon-music-off"></span>';
        } else {
            backgroundMusic.play();
            musicToggle.innerHTML = '<span class="icon-music-on"></span>';
        }
        isPlaying = !isPlaying;
    });

    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Плавная прокрутка для ссылок навигации
    document.querySelectorAll('nav a, .hero a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // Закрываем мобильное меню если оно открыто
            if (menu.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    });

    // Анимация хедера при прокрутке
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Форма комплиментов
    const complimentForm = document.getElementById('compliment-form');
    if (complimentForm) {
        complimentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const titleInput = document.getElementById('compliment-title');
            const authorInput = document.getElementById('compliment-author');
            const messageInput = document.getElementById('compliment-message');
            
            // Валидация полей
            if (!titleInput.value || !authorInput.value || !messageInput.value) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            // Создание нового комплимента
            const complimentsList = document.querySelector('.compliments-list');
            const newComplimentId = 'compliment-' + Date.now();
            
            const complimentCard = document.createElement('div');
            complimentCard.className = 'compliment-card';
            complimentCard.setAttribute('data-aos', 'fade-up');
            complimentCard.id = newComplimentId;
            
            complimentCard.innerHTML = `
                <div class="compliment-header">
                    <h3>${titleInput.value}</h3>
                    <span class="compliment-author">От: ${authorInput.value}</span>
                </div>
                <div class="compliment-content">
                    <p>${messageInput.value}</p>
                </div>
                <div class="comments-container">
                    <div class="comments-toggle collapsed">Комментарии (0)</div>
                    <div class="comments-content" style="display: none;">
                        <div class="comments-list"></div>
                        <div class="comment-form-container">
                            <form class="comment-form">
                                <div class="form-group">
                                    <input type="text" placeholder="Ваше имя" class="comment-author-input" required>
                                </div>
                                <div class="form-group">
                                    <textarea placeholder="Ваш комментарий" class="comment-text-input" required></textarea>
                                </div>
                                <button type="submit" class="btn comment-submit">Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            // Добавление нового комплимента в начало списка
            complimentsList.prepend(complimentCard);
            
            // Очистка формы
            titleInput.value = '';
            authorInput.value = '';
            messageInput.value = '';
            
            // Инициализация обработчиков для нового комплимента
            initCommentToggle(complimentCard.querySelector('.comments-toggle'));
            initCommentForm(complimentCard.querySelector('.comment-form'));
            
            // Уведомление пользователя
            alert('Спасибо! Ваш отзыв добавлен.');
            
            // Анимация для нового элемента
            setTimeout(() => {
                complimentCard.classList.add('show');
            }, 100);
        });
    }

    // Система комментариев
    function initCommentToggle(toggleElement) {
        toggleElement.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            const commentsContent = this.nextElementSibling;
            if (commentsContent.style.display === 'none') {
                commentsContent.style.display = 'block';
            } else {
                commentsContent.style.display = 'none';
            }
        });
    }

    function initCommentForm(formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const authorInput = this.querySelector('.comment-author-input');
            const textInput = this.querySelector('.comment-text-input');
            
            if (!authorInput.value || !textInput.value) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            const commentsList = this.closest('.comments-content').querySelector('.comments-list');
            const commentsToggle = this.closest('.comments-container').querySelector('.comments-toggle');
            
            // Создаем новый комментарий
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            // Форматируем текущую дату
            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${authorInput.value}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-text">
                    <p>${textInput.value}</p>
                </div>
            `;
            
            // Добавляем комментарий в список
            commentsList.appendChild(newComment);
            
            // Обновляем счетчик комментариев
            const commentCount = commentsList.querySelectorAll('.comment').length;
            commentsToggle.textContent = `Комментарии (${commentCount})`;
            
            // Очищаем форму
            authorInput.value = '';
            textInput.value = '';
            
            // Уведомляем пользователя
            alert('Комментарий добавлен!');
        });
    }

    // Инициализация существующих элементов комментариев
    document.querySelectorAll('.comments-toggle').forEach(initCommentToggle);
    document.querySelectorAll('.comment-form').forEach(initCommentForm);



    // Анимация на скролл
    function initScrollAnimation() {
        const animatedElements = document.querySelectorAll('.about-text, .about-image, .gallery-item, .compliment-card, .timeline-item, .timeline-add-form');
        
        animatedElements.forEach(el => {
            el.setAttribute('data-aos', 'fade-up');
        });
        
        // Устанавливаем начальные стили
        const style = document.createElement('style');
        style.textContent = `
            [data-aos] {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            [data-aos].aos-animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        const animateOnScroll = () => {
            const triggerBottom = window.innerHeight * 0.8;
            
            animatedElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                
                if (elementTop < triggerBottom) {
                    el.classList.add('aos-animate');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        // Инициализируем видимые элементы
        animateOnScroll();
    }
    
    initScrollAnimation();
});

// CSS для анимации сердец
const heartStyle = document.createElement('style');
heartStyle.textContent = `
.heart {
    position: fixed;
    pointer-events: none;
    width: 30px;
    height: 30px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23ff6b9d' d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'></path></svg>");
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
    animation: heartBeat 1s ease-out forwards;
    z-index: 9999;
}

@keyframes heartBeat {
    0% {
        opacity: 0;
        transform: scale(0) translate(-50%, -50%);
    }
    30% {
        opacity: 0.8;
        transform: scale(1.2) translate(-50%, -50%);
    }
    60% {
        opacity: 1;
        transform: scale(1) translate(-50%, -50%);
    }
    100% {
        opacity: 0;
        transform: scale(1.5) translate(-50%, -50%) translateY(-50px);
    }
}
`;
document.head.appendChild(heartStyle);

// Функция для создания сердечек при клике
document.addEventListener('click', function(e) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    
    // Удаляем сердечко после завершения анимации
    setTimeout(() => {
        heart.remove();
    }, 1000);
}); 