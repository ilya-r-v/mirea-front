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

// Фильтрация проектов
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-full');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Модальное окно проектов
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    // Данные проектов
    const projectsData = {
        1: {
            title: "Личный сайт",
            description: "Полностью адаптивный личный сайт-портфолио, разработанный с использованием современных технологий веб-разработки.",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            features: ["Адаптивный дизайн", "Интерактивные элементы", "Оптимизация производительности"],
            demoLink: "#",
            codeLink: "#"
        },
        2: {
            title: "Todo-приложение",
            description: "Интуитивное приложение для управления задачами с возможностью добавления, редактирования и удаления задач.",
            technologies: ["JavaScript", "Local Storage", "CSS3"],
            features: ["Добавление/удаление задач", "Фильтрация по статусу", "Локальное сохранение данных"],
            demoLink: "#",
            codeLink: "#"
        },
        3: {
            title: "Интернет-магазин",
            description: "Полнофункциональный интернет-магазин с системой корзины покупок и оформлением заказа.",
            technologies: ["React", "Node.js", "MongoDB"],
            features: ["Каталог товаров", "Корзина покупок", "Система аутентификации"],
            demoLink: "#",
            codeLink: "#"
        },
        4: {
            title: "Портфолио на Bootstrap",
            description: "Современное портфолио, построенное на фреймворке Bootstrap с использованием готовых компонентов.",
            technologies: ["Bootstrap 5", "HTML5", "CSS3"],
            features: ["Адаптивная сетка", "Готовые компоненты", "Быстрая разработка"],
            demoLink: "#",
            codeLink: "#"
        }
    };
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                const modalContent = document.getElementById('modalContent');
                modalContent.innerHTML = `
                    <h2>${project.title}</h2>
                    <p class="project-modal-description">${project.description}</p>
                    
                    <div class="project-details">
                        <h3>Технологии:</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        
                        <h3>Основные функции:</h3>
                        <ul class="features-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        
                        <div class="project-links">
                            <a href="${project.demoLink}" class="project-link" target="_blank">Демо</a>
                            <a href="${project.codeLink}" class="project-link" target="_blank">Исходный код</a>
                        </div>
                    </div>
                `;
                
                modal.style.display = 'block';
            }
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
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