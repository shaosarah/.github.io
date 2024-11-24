class Carousel {
    constructor() {
        this.container = document.querySelector('.carousel-wrapper');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        
        // 配置图片
        this.images = [
            {
                src: 'assets/images/photo1.jpg',
                alt: '童年回忆',
                description: '2007年的夏天'
            },
            {
                src: 'assets/images/photo2.jpg',
                alt: '美好时光',
                description: '温暖的记忆'
            },
            {
                src: 'assets/images/photo3.jpg',
                alt: '珍贵瞬间',
                description: '难忘的日子'
            },
            {
                src: 'assets/images/photo4.jpg',
                alt: '欢乐时刻',
                description: '快乐的时光'
            }
        ];

        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createSlides();
        this.bindEvents();
        this.showSlide(0);
        setInterval(() => this.nextSlide(), 3000); // 每3秒切换一次
    }

    createSlides() {
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${image.src}" 
                     alt="${image.alt}">
                <div class="slide-description">
                    <h3>${image.alt}</h3>
                    <p>${image.description}</p>
                </div>
            `;
            this.container.appendChild(slide);
        });
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    showSlide(index) {
        const slides = this.container.querySelectorAll('.carousel-slide');
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        this.currentIndex = index;
    }

    prevSlide() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showSlide(newIndex);
    }

    nextSlide() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.showSlide(newIndex);
    }
}

// 初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});