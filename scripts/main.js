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


function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');


    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
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

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    const projectsData = {
        1: {
            title: "Сайт с прошлых занятий",
            description: "Учебный проект на Angular. Включает в себя современный интерфейс и функциональность на TypeScript с использованием SCSS для стилей.",
            technologies: "Angular, TypeScript, HTML, SCSS",
            githubLink: "https://github.com/ilya-r-v/mirea-angular"
        },
        2: {
            title: "Курсовая работа на C++",
            description: "Приложение для управления финансами, разработанное на C++ с использованием Qt Creator. Включает графический интерфейс и систему учета финансов с возможностью анализа расходов.",
            technologies: "C++, Qt Creator",
            githubLink: "https://github.com/ilya-r-v/financilal_management"
        },
        3: {
            title: "Интернет-магазин",
            description: "Pet-проект на Angular - еше не доделанный интернет-магазин с системой корзины, каталогом товаров и пользовательским интерфейсом.",
            technologies: "Angular, HTML, TypeScript",
            githubLink: "https://github.com/ilya-r-v/pet-project-angular"
        },
        4: {
            title: "Портфолио",
            description: "Не знаю что еще написать поэтому оно здесь",
            technologies: "Bootstrap, HTML, CSS, JavaScript",
            githubLink: null
        }
    };
    
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const projectId = button.getAttribute('data-project');
            console.log('Opening modal for project:', projectId);
            
            const project = projectsData[projectId];
            
            if (project && modal) {
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-tech').textContent = project.technologies;
                document.getElementById('modal-description').textContent = project.description;
                
                const githubLink = document.getElementById('modal-github-link');
                
                if (project.githubLink && project.githubLink !== '#') {
                    const newGithubLink = githubLink.cloneNode(true);
                    githubLink.parentNode.replaceChild(newGithubLink, githubLink);
                    
                    newGithubLink.href = project.githubLink;
                    newGithubLink.target = '_blank';
                    newGithubLink.style.display = 'flex';
                    newGithubLink.style.opacity = '1';
                    newGithubLink.style.pointerEvents = 'auto';
                    
                    newGithubLink.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                    });
                    
                    console.log('GitHub link set to:', project.githubLink);
                } else {
                    githubLink.style.display = 'none';
                }

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
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

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilter();
    initProjectModals();
    
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

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Имя должно содержать минимум 2 символа';
                isValid = false;
            } else {
                nameError.textContent = '';
            }
            
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Введите корректный email адрес';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Сообщение должно содержать минимум 10 символов';
                isValid = false;
            } else {
                messageError.textContent = '';
            }
            
            if (isValid) {
                alert('Сообщение успешно отправлено!');
                contactForm.reset();
            }
        });
    }
}

function initDiaryFunctionality() {
    const addEntryBtn = document.querySelector('.btn-add-entry');
    
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', () => {
            const newEntry = prompt('Введите новую запись для дневника:');
            if (newEntry) {
                alert('Запись добавлена: ' + newEntry);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
    initProjectFilter();
    initProjectModals();
    initContactForm();
    initDiaryFunctionality();
    
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