// Анимация прогресс-баров
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress, .progress-fill');
    
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            setTimeout(() => {
                bar.style.width = level + '%';
            }, 500);
        }
    });
}

// Функция для фильтрации проектов
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Обработчик клика на кнопки фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс на clicked кнопку
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Фильтруем проекты
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Анимация появления
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Анимация исчезновения
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Инициализация фильтрации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initProjectFilter();
    
    // Добавляем CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            transition: all 0.3s ease-in-out;
            display: block;
            opacity: 1;
            transform: scale(1);
        }
        
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
        }
        
        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

// Модальное окно проектов
function initProjectModals() {
    const modal = document.getElementById('project-modal'); // Исправлен ID
    const closeBtn = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    // Данные проектов (обновленные под ваши проекты)
    const projectsData = {
        1: {
            title: "Сайт с прошлых занятий",
            description: "Учебный проект на Angular, разработанный в рамках занятий. Включает в себя современный интерфейс и функциональность на TypeScript.",
            technologies: "Angular, TypeScript, HTML, SCSS",
            demoLink: "#",
            codeLink: "https://github.com/ilya-r-v/mirea-angular"
        },
        2: {
            title: "Курсовая работа на C++",
            description: "Приложение для управления финансами, разработанное на C++ с использованием Qt Creator. Включает графический интерфейс и систему учета финансов.",
            technologies: "C++, Qt Creator",
            demoLink: "#",
            codeLink: "https://github.com/ilya-r-v/financilal_management"
        },
        3: {
            title: "Интернет-магазин",
            description: "Pet-протет на Angular - полнофункциональный интернет-магазин с системой корзины, каталогом товаров и пользовательским интерфейсом.",
            technologies: "Angular, HTML, TypeScript",
            demoLink: "#",
            codeLink: "https://github.com/ilya-r-v/pet-project-angular"
        },
        4: {
            title: "Портфолио",
            description: "Современное веб-портфолио, построенное на Bootstrap. Адаптивный дизайн, кроссбраузерная совместимость и оптимизация.",
            technologies: "Bootstrap, HTML, CSS, JavaScript",
            demoLink: "#",
            codeLink: "#"
        }
    };
    
    // Обработчики для кнопок "Подробнее"
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            
            const projectId = button.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project && modal) {
                // Заполняем модальное окно данными
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-tech').textContent = project.technologies;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-live').href = project.demoLink;
                document.getElementById('modal-code').href = project.codeLink;
                
                // Показываем модальное окно
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
            }
        });
    });
    
    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
        });
    }
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Валидация формы контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Валидация имени
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Имя должно содержать минимум 2 символа';
                isValid = false;
            } else {
                nameError.textContent = '';
            }
            
            // Валидация email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Введите корректный email адрес';
                isValid = false;
            } else {
                emailError.textContent = '';
            }
            
            // Валидация сообщения
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Сообщение должно содержать минимум 10 символов';
                isValid = false;
            } else {
                messageError.textContent = '';
            }
            
            if (isValid) {
                // Здесь можно добавить отправку формы на сервер
                alert('Сообщение успешно отправлено!');
                contactForm.reset();
            }
        });
    }
}

// Добавление новой записи в дневник
function initDiaryFunctionality() {
    const addEntryBtn = document.querySelector('.btn-add-entry');
    
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', () => {
            const newEntry = prompt('Введите новую запись для дневника:');
            if (newEntry) {
                alert('Запись добавлена: ' + newEntry);
                // Здесь можно добавить логику для сохранения записи
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
    initProjectFilter();
    initProjectModals();
    initContactForm();
    initDiaryFunctionality();
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});