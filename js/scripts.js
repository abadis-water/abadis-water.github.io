// // scripts.js
// const sections = ['banner1', 'contentSection1', 'contentSection2', 'productsSection', 'blogSection'];
// let currentSectionIndex = 0;
//
// function scrollToSection(sectionId) {
//     const section = document.getElementById(sectionId);
//     if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//     }
// }
//
// document.addEventListener('wheel', function(event) {
//     event.preventDefault(); // جلوگیری از اسکرول پیش‌فرض
//     if (event.deltaY > 0) {
//         // اسکرول به پایین
//         currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
//     } else {
//         // اسکرول به بالا
//         currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
//     }
//     scrollToSection(sections[currentSectionIndex]);
// });

function updateNavButtonColors() {
       const navCircles = document.querySelectorAll('.nav-circle');
       const bodyBackgroundColor = getComputedStyle(document.body).backgroundColor;

       const rgbToHex = (rgb) => {
           const rgbArray = rgb.match(/\d+/g);
           return `#${((1 << 24) + (parseInt(rgbArray[0]) << 16) + (parseInt(rgbArray[1]) << 8) + parseInt(rgbArray[2])).toString(16).slice(1)}`;
       };

       const backgroundColorHex = rgbToHex(bodyBackgroundColor);

       if (backgroundColorHex === '#ffffff') { // اگر پس‌زمینه سفید باشد
           navCircles.forEach(circle => {
               circle.style.backgroundColor = '#000'; // دکمه‌ها سیاه
               circle.style.color = '#fff'; // متن دکمه‌ها سفید
           });
       } else { // اگر پس‌زمینه تیره باشد
           navCircles.forEach(circle => {
               circle.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'; // دکمه‌ها سفید شفاف
               circle.style.color = '#000'; // متن دکمه‌ها سیاه
           });
       }
   }

   // فراخوانی تابع هنگام بارگذاری صفحه و اسکرول
   window.onload = updateNavButtonColors;
   window.onscroll = updateNavButtonColors;

   const welcomeTexts = [
       "خوش آمدید به دنیای شگفت‌انگیز آب معدنی آبادیس!",
       // <p>انتخاب آب معدنی Abadis، انتخابی سالم و طبیعی برای خانواده</p>
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
     element.innerText = "";
     const interval = setInterval(() => {
         if (i < text.length) {
             element.innerText += text.charAt(i);
             i++;
         } else {
             clearInterval(interval);
             if (callback) {
                 setTimeout(callback, 1000); // توقف کوتاه پس از تایپ هر متن
             }
         }
     }, delay);
 }


 function changeTexts() {
  currentIndex = (currentIndex + 1) % welcomeTexts.length;
  typeWriter(welcomeTexts[currentIndex], document.getElementById("welcome-text"), 100, () => {
      typeWriter(contentTexts[currentIndex], document.getElementById("dynamic-text"), 100, () => {
          setTimeout(changeTexts, 5000); // توقف ۵ ثانیه پس از نمایش متن قبل از تغییر به متن بعدی
      });
  });
}

changeTexts();

   function scrollToSection(sectionId) {
       const section = document.getElementById(sectionId);
       section.scrollIntoView({ behavior: 'smooth' });
   }

   setInterval(changeTexts, 8000);
   changeTexts();

   const sections = document.querySelectorAll('.content-section');
   const observerOptions = {
       root: null,
       threshold: 0.1
   };

   const observerCallback = (entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.style.opacity = 1;
               entry.target.style.transform = 'translateY(0)';
           }
       });
   };

   const observer = new IntersectionObserver(observerCallback, observerOptions);
   sections.forEach(section => {
       observer.observe(section);
   });

   // Move the GIF with scroll
   const bottleGif = document.getElementById('bottleGif');
   const contentSection2 = document.getElementById('contentSection2');

   window.addEventListener('scroll', () => {
       const scrollTop = window.scrollY;
       const contentOffset = contentSection2.getBoundingClientRect().top + window.scrollY;

       // Stop GIF at the end of the second content section
       if (scrollTop < contentOffset - window.innerHeight + 100) {
           bottleGif.style.transform = `translateY(${scrollTop * 0.5}px)`;
       } else {
           bottleGif.style.transform = `translateY(${contentOffset - bottleGif.offsetHeight - 20}px)`; // Adjust position
       }
   });

   document.addEventListener("DOMContentLoaded", function() {
    const contentWrapper = document.querySelector('.content-wrapper');

    contentWrapper.addEventListener('scroll', () => {
        const scrollingGif = document.getElementById('bottleGif');
        const scrollPosition = contentWrapper.scrollTop; // موقعیت اسکرول

        // حرکت GIF پس از اسکرول
        scrollingGif.style.transform = `translateY(${scrollPosition * 0.3}px)`; // حرکت GIF به سمت پایین
    });
});
