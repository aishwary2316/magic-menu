// Menu data structure for easy expansion
const menuData = {
    sweets: [
        {
            name: "Fresh Fruit Salad",
            description: "A colorful medley of seasonal fresh fruits, drizzled with honey and mint leaves for a refreshing treat",
            price: "$8.99",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop&crop=center"
        }
    ],
    savories: [
        {
            name: "Gourmet Sandwich",
            description: "Artisan bread layered with premium meats, fresh vegetables, and our signature sauce",
            price: "$12.99",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop&crop=center"
        }
    ],
    drinks: [
        {
            name: "Fresh Lemonade",
            description: "Freshly squeezed lemons with a hint of mint, served chilled with ice cubes",
            price: "$5.99",
            image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop&crop=center"
        }
    ]
};

let currentCategory = 0;
let currentItems = {
    sweets: 0,
    savories: 0,
    drinks: 0
};
const categories = ['sweets', 'savories', 'drinks'];

// Initialize the app
function init() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2000);

    setupEventListeners();
    updateDisplay();
}

function setupEventListeners() {
    // Category navigation
    document.getElementById('prevCategory').addEventListener('click', () => {
        currentCategory = (currentCategory - 1 + categories.length) % categories.length;
        updateCategoryDisplay();
    });

    document.getElementById('nextCategory').addEventListener('click', () => {
        currentCategory = (currentCategory + 1) % categories.length;
        updateCategoryDisplay();
    });

    // Item navigation
    document.getElementById('prevItem').addEventListener('click', () => {
        navigateItem(-1);
    });

    document.getElementById('nextItem').addEventListener('click', () => {
        navigateItem(1);
    });

    // Touch gestures for mobile
    let startX = 0;
    let startY = 0;
    const threshold = 50;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                // Swipe right - previous item
                navigateItem(-1);
            } else {
                // Swipe left - next item
                navigateItem(1);
            }
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
            if (deltaY > 0) {
                // Swipe down - previous category
                currentCategory = (currentCategory - 1 + categories.length) % categories.length;
                updateCategoryDisplay();
            } else {
                // Swipe up - next category
                currentCategory = (currentCategory + 1) % categories.length;
                updateCategoryDisplay();
            }
        }
    });

    // Ripple effect on click
    document.addEventListener('click', createRipple);
}

function createRipple(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.left = e.clientX - 25 + 'px';
    ripple.style.top = e.clientY - 25 + 'px';
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function navigateItem(direction) {
    const category = categories[currentCategory];
    const maxItems = menuData[category].length;
    
    if (maxItems > 1) {
        currentItems[category] = (currentItems[category] + direction + maxItems) % maxItems;
        updateItemDisplay();
    }
}

function updateCategoryDisplay() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        page.classList.remove('active', 'prev', 'next');
        
        if (index === currentCategory) {
            page.classList.add('active');
        } else if (index < currentCategory) {
            page.classList.add('prev');
        } else {
            page.classList.add('next');
        }
    });

    updateItemDisplay();
}

function updateItemDisplay() {
    const category = categories[currentCategory];
    const carousel = document.getElementById(category + 'Carousel');
    const dots = document.getElementById(category + 'Dots');
    const currentItem = currentItems[category];
    
    // Update carousel position
    carousel.style.transform = `translateX(-${currentItem * 100}%)`;
    
    // Update dots
    const dotElements = dots.querySelectorAll('.dot');
    dotElements.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentItem);
    });
}

function updateDisplay() {
    updateCategoryDisplay();
}

// Function to add new items (for future expansion)
function addMenuItem(category, item) {
    menuData[category].push(item);
    // Re-render the specific carousel
    renderCarousel(category);
}

function renderCarousel(category) {
    const carousel = document.getElementById(category + 'Carousel');
    const dots = document.getElementById(category + 'Dots');
    
    // Clear existing content
    carousel.innerHTML = '';
    dots.innerHTML = '';
    
    // Add items
    menuData[category].forEach((item, index) => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-image">
            <div class="food-details">
                <h2 class="food-name">${item.name}</h2>
                <p class="food-description">${item.description}</p>
                <div class="food-price">${item.price}</div>
            </div>
        `;
        carousel.appendChild(foodItem);
        
        // Add dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dots.appendChild(dot);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);

// Add some sparkle animations
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '5';
    sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
        }
    }
`;
const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Create sparkles periodically
setInterval(createSparkle, 2000);