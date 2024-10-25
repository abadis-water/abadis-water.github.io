document.addEventListener("DOMContentLoaded", function() {
    const sections = ['banner1', 'contentSection1', 'contentSection2', 'productsSection', 'blogSection'];
    let currentSectionIndex = 0;

    // Scroll to Section by Wheel
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Debounce for Wheel Event
    let lastScrollTime = 0;
    document.addEventListener('wheel', function(event) {
        event.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime > 500) { // 500ms debounce
            currentSectionIndex += event.deltaY > 0 ? 1 : -1;
            currentSectionIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
            scrollToSection(sections[currentSectionIndex]);
            lastScrollTime = now;
        }
    });

    // Navigation Circle Colors
    function updateNavButtonColors() {
        const navCircles = document.querySelectorAll('.nav-circle');
        const bodyColor = getComputedStyle(document.body).backgroundColor;
        const isLightBg = bodyColor === 'rgb(255, 255, 255)';

        navCircles.forEach(circle => {
            circle.style.backgroundColor = isLightBg ? '#000' : 'rgba(255, 255, 255, 0.4)';
            circle.style.color = isLightBg ? '#fff' : '#000';
        });
    }

    // Debounced updateNavButtonColors
    let debounceTimeout;
    function updateNavButtonColorsDebounced() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(updateNavButtonColors, 100);
    }

    window.addEventListener('scroll', updateNavButtonColorsDebounced);
    window.addEventListener('load', updateNavButtonColors);

    // Typewriter and Text Change
    const welcomeTexts = [
        "خوش آمدید به دنیای شگفت‌انگیز آب معدنی آبادیس!",
        "با ما تجربه‌ای تازه و دلپذیر از آب معدنی داشته باشید.",
        "آب معدنی ما، طعمی خنک و نشاط‌آور برای سلامتی شماست.",
        "انتخاب آب معدنی Abadis، انتخابی سالم و طبیعی برای خانواده شما!"
    ];
    const contentTexts = [
        "آب معدنی ما از چشمه‌های زلال و خالص سرچشمه می‌گیرد.",
        "سلامت شما برای ما در اولویت است، پس با ما همراه باشید.",
        "محصولات ما با کیفیت عالی و استانداردهای بین‌المللی تولید می‌شوند.",
        "به آب معدنی Abadis خوش آمدید؛ جایی که کیفیت و سلامت دست به دست هم می‌دهند!"
    ];
    let currentIndex = 0;

    function typeWriter(text, element, delay, callback) {
        let i = 0;
        element.innerHTML = ""; // Clear previous text before typing
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i) === ' ' ? '&nbsp;' : text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                callback && setTimeout(callback, 1000); // Wait before showing the new text
            }
        }, delay);
    }

    function cycleTexts() {
        currentIndex = (currentIndex + 1) % welcomeTexts.length;

        // Type upper text
        typeWriter(welcomeTexts[currentIndex], document.getElementById("welcome-text"), 100, () => {
            // Type lower text after the upper text
            typeWriter(contentTexts[currentIndex], document.getElementById("dynamic-text"), 100, () => {
                // Clear both texts and start cycle again
                setTimeout(() => {
                    document.getElementById("welcome-text").innerText = "";
                    document.getElementById("dynamic-text").innerText = "";
                    setTimeout(cycleTexts, 1000); // Start cycle after texts clear
                }, 2000);
            });
        });
    }

    cycleTexts();

    // Reveal Sections on Scroll
    const contentSections = document.querySelectorAll('.content-section');
    const observerOptions = { root: null, threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    contentSections.forEach(section => observer.observe(section));

    // Smooth GIF Scroll
    const bottleGif = document.getElementById('bottleGif');
    const contentSection2 = document.getElementById('contentSection2');
    let isScrolling = false;

    const handleScroll = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const contentOffset = contentSection2.getBoundingClientRect().top + window.scrollY;

                if (scrollTop < contentOffset - window.innerHeight + 100) {
                    bottleGif.style.transform = `translateY(${scrollTop * 0.5}px)`;
                } else {
                    bottleGif.style.transform = `translateY(${contentOffset - bottleGif.offsetHeight - 20}px)`;
                }

                isScrolling = false;
            });
        }
        isScrolling = true;
    };

    window.addEventListener('scroll', handleScroll);

    // Content Wrapper Scroll for Mobile
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.addEventListener('scroll', () => {
        const scrollPosition = contentWrapper.scrollTop;
        bottleGif.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });
});
