document.addEventListener("DOMContentLoaded", function() {

    function updateNavButtonColors() {
        const navCircles = document.querySelectorAll('.nav-circle');
        const bodyColor = getComputedStyle(document.body).backgroundColor;
        const isLightBg = bodyColor === 'rgb(255, 255, 255, 1)';

        navCircles.forEach(circle => {
            circle.style.backgroundColor = isLightBg ? '#000' : 'rgba(255, 255, 255, 0.4)';
            circle.style.color = isLightBg ? '#fff' : '#000';
        });
    }

    function updateNavButtonColorsDebounced() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(updateNavButtonColors, 100);
    }

    const welcomeTexts = [
        "با ما تجربه‌ی تازه‌ای از آب معدنی داشته باشید",
        "به دنیـای شـگفت‌انگیز آب معدنی آبادیس خـوش آمدید",
        "آب معدنی آبادیس طـعمی خـنک و نشـاط‌آور برای شماست",
        "آبادیس انتخـابی سـالم و طبیعی برای خانـواده شماست"
    ];
    const contentTexts = [
        "سلامت شما همواره برای ما در اولویت است! پس از آب معدنی آبادیس بنوشید.",
        "آب معدنی آبادیس از چشمه‌های زلال و خالص چشمه دیمه، سرچشمه کوهرنگ تهیه می‌گردد.",
        "محصولات آبادیس با کیفیت عالی و استانداردهای بین‌المللی تولید و به بازار هدف عرضه می‌شوند.",
        "آبادیس جایی‌ست که کیفیت و سلامتی دست به دست هم داده و شادی را به شما هدیه دهند."
    ];
    let currentIndex = 0;

    function typeWriter(text, element, delay, callback) {
        let i = 0;
        element.innerHTML = "";
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i) === ' ' ? '&nbsp;' : text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                callback && setTimeout(callback, 1000);
            }
        }, delay);
    }

    function cycleTexts() {
        currentIndex = (currentIndex + 1) % welcomeTexts.length;

        typeWriter(welcomeTexts[currentIndex], document.getElementById("welcome-text"), 100, () => {
            // Type lower text after the upper text
            typeWriter(contentTexts[currentIndex], document.getElementById("dynamic-text"), 100, () => {
                // Clear both texts and start cycle again
                setTimeout(() => {
                    document.getElementById("welcome-text").innerText = "";
                    document.getElementById("dynamic-text").innerText = "";
                    setTimeout(cycleTexts, 1000);
                }, 2000);
            });
        });
    }

    cycleTexts();

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
});
