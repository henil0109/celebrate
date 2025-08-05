document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Welcome Animation
    const welcomeBtn = document.getElementById('welcome-btn');
    const cakeWrapper = document.getElementById('cake-animation');
    const landingContent = document.querySelector('#landing .content');

    welcomeBtn.addEventListener('click', function() {
        // Fade out landing content and show cake animation
        landingContent.style.opacity = 0;
        landingContent.style.pointerEvents = 'none';
        cakeWrapper.style.opacity = 1;

        // After the animation finishes, scroll to the next section
        setTimeout(() => {
            document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
        }, 8000); // The cake animation takes about 8 seconds to complete
    });

    // Story Pop-up
    var storyModal = document.getElementById('storyModal');
    if (storyModal) {
        storyModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var title = button.getAttribute('data-title');
            var body = button.getAttribute('data-body');
            var image = button.getAttribute('data-image');

            var modalTitle = storyModal.querySelector('.modal-title');
            var modalBody = storyModal.querySelector('#storyModalBody');
            var modalImage = storyModal.querySelector('#storyModalImage');

            modalTitle.textContent = title;
            modalBody.textContent = body;
            modalImage.src = image;
        });
    }

    // Gallery Pop-up
    var galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var imgSrc = button.getAttribute('data-img-src');
            var modalImage = galleryModal.querySelector('#galleryModalImage');
            modalImage.src = imgSrc;
        });
    }

    // Quotes display
    const quotes = [
        { quote: "Life of a Watermelon and a Pineapple." },
        { quote: "I love you without knowing how, or when, or from where. I love you straightforwardly, without complexities or pride." },
        { quote: "You will always be my dikuuu" },
        { quote: "This is the Besttttttt Thing that has happened to me" }
    ];

    let currentQuoteIndex = 0;
    const quoteDisplay = document.getElementById('quote-display');
    const nextQuoteBtn = document.getElementById('nextQuote');
    const prevQuoteBtn = document.getElementById('prevQuote');

    function updateQuote() {
        quoteDisplay.style.opacity = 0;
        setTimeout(() => {
            quoteDisplay.innerHTML = `
                <p class="lead quote-text">"${quotes[currentQuoteIndex].quote}"</p>
               
            `;
            quoteDisplay.style.opacity = 1;
        }, 500);
    }
    
    // Initial quote display
    updateQuote();

    nextQuoteBtn.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        updateQuote();
    });

    prevQuoteBtn.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
        updateQuote();
    });

    // Automated Image Slider
    const imageSlider = document.querySelector('.image-slider');
    let sliderIndex = 0;
    const images = imageSlider.querySelectorAll('img');
    const totalImages = images.length;

    function nextImage() {
        sliderIndex = (sliderIndex + 1) % totalImages;
        imageSlider.style.transform = `translateX(-${sliderIndex * 100}%)`;
    }

    setInterval(nextImage, 4000); // Change image every 4 seconds

    // On-scroll Animations using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
});