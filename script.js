// Menu data structure for easy expansion
        const menuData = {
            sweets: [
                {
                    name: "Fresh Fruit Salad",
                    description: "A colorful medley of seasonal fresh fruits, drizzled with honey and mint leaves for a refreshing treat",
                    price: "₹20.00",
                    image: "https://eastindianrecipes.net/wp-content/uploads/2022/10/Custard-Fruit-Salad-Recipe-Eggless6.jpg?w=400&h=400&fit=crop&crop=center"
                },
                {
                    name: "Chocolate Cake",
                    description: "Rich, moist chocolate cake with creamy frosting and chocolate chips",
                    price: "₹12.99",
                    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&crop=center"
                },
                {
                    name: "Ice Cream Sundae",
                    description: "Vanilla ice cream topped with hot fudge, whipped cream, and a cherry",
                    price: "₹7.99",
                    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop&crop=center"
                }
            ],
            savories: [
                {
                    name: "Gourmet Sandwich",
                    description: "Artisan bread layered with premium meats, fresh vegetables, and our signature sauce",
                    price: "₹30.00",
                    image: "https://nestle.fitterfly.in/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3RmIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--321d15b672ef78ef5dc93c2cb26145252daabbc4/18740_Vegetable_Peanut_Butter_Sandwich.webp?w=400&h=400&fit=crop&crop=center"
                },
                {
                    name: "Caesar Salad",
                    description: "Fresh romaine lettuce with parmesan cheese, croutons and our signature Caesar dressing",
                    price: "₹9.99",
                    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&crop=center"
                },
                {
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh mozzarella, tomatoes, and basil on thin crust",
                    price: "₹15.99",
                    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop&crop=center"
                }
            ],
            drinks: [
                {
                    name: "Fresh Lemonade",
                    description: "Freshly squeezed lemons with a hint of mint, served chilled with ice cubes",
                    price: "₹10.00",
                    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop&crop=center"
                },
                {
                    name: "Iced Coffee",
                    description: "Premium coffee beans brewed to perfection, served over ice with your choice of milk",
                    price: "₹4.99",
                    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop&crop=center"
                },
                {
                    name: "Smoothie Bowl",
                    description: "Blended acai berries topped with granola, fresh fruits, and coconut flakes",
                    price: "₹8.99",
                    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=400&fit=crop&crop=center"
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
        const categoryEmojis = {
            sweets: '🍰',
            savories: '🥪',
            drinks: '🍹'
        };
        const categoryTitles = {
            sweets: 'Sweets',
            savories: 'Savories',
            drinks: 'Drinks'
        };

        // Initialize the app
        function init() {
            setTimeout(() => {
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                }, 500);
            }, 2000);

            // Generate all pages dynamically
            generateAllPages();
            setupEventListeners();
            updateDisplay();
        }

        function generateAllPages() {
            const container = document.getElementById('menuContainer');
            container.innerHTML = ''; // Clear existing content

            categories.forEach((category, index) => {
                const page = document.createElement('div');
                page.className = `page ${index === 0 ? 'active' : 'next'}`;
                page.setAttribute('data-category', category);

                page.innerHTML = `
                    <div class="category-header">
                        <h1 class="category-title">${categoryEmojis[category]} ${categoryTitles[category]}</h1>
                    </div>
                    <div class="carousel-container">
                        <div class="carousel" id="${category}Carousel">
                            ${generateCarouselItems(category)}
                        </div>
                    </div>
                    <div class="dots-indicator" id="${category}Dots">
                        ${generateDots(category)}
                    </div>
                `;

                container.appendChild(page);
            });

            // Add navigation buttons
            const prevBtn = document.createElement('button');
            prevBtn.className = 'category-nav prev';
            prevBtn.id = 'prevCategory';
            prevBtn.innerHTML = '‹';

            const nextBtn = document.createElement('button');
            nextBtn.className = 'category-nav next';
            nextBtn.id = 'nextCategory';
            nextBtn.innerHTML = '›';

            const navigation = document.createElement('div');
            navigation.className = 'navigation';
            navigation.innerHTML = `
                <button class="nav-btn" id="prevItem">‹</button>
                <button class="nav-btn" id="nextItem">›</button>
            `;

            container.appendChild(prevBtn);
            container.appendChild(nextBtn);
            container.appendChild(navigation);
        }

        function generateCarouselItems(category) {
            return menuData[category].map(item => `
                <div class="food-item">
                    <img src="${item.image}" alt="${item.name}" class="food-image">
                    <div class="food-details">
                        <h2 class="food-name">${item.name}</h2>
                        <p class="food-description">${item.description}</p>
                        <div class="food-price">${item.price}</div>
                    </div>
                </div>
            `).join('');
        }

        function generateDots(category) {
            return menuData[category].map((_, index) => 
                `<span class="dot ${index === 0 ? 'active' : ''}"></span>`
            ).join('');
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

            // Enhanced touch gestures for mobile
            let startX = 0;
            let startY = 0;
            let startTime = 0;
            const threshold = 50;
            const timeThreshold = 300; // Maximum time for a swipe

            document.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                startTime = Date.now();
            });

            document.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const endTime = Date.now();
                const deltaX = endX - startX;
                const deltaY = endY - startY;
                const deltaTime = endTime - startTime;

                // Only process swipes that are quick enough
                if (deltaTime > timeThreshold) return;

                const category = categories[currentCategory];
                const currentItemIndex = currentItems[category];
                const totalItems = menuData[category].length;

                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
                    if (deltaX > 0) {
                        // Swipe right
                        if (currentItemIndex === 0) {
                            // First item - go to previous category
                            currentCategory = (currentCategory - 1 + categories.length) % categories.length;
                            updateCategoryDisplay();
                        } else {
                            // Go to previous item
                            navigateItem(-1);
                        }
                    } else {
                        // Swipe left
                        if (currentItemIndex === totalItems - 1) {
                            // Last item - go to next category
                            currentCategory = (currentCategory + 1) % categories.length;
                            updateCategoryDisplay();
                        } else {
                            // Go to next item
                            navigateItem(1);
                        }
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

            // Dot navigation
            categories.forEach(category => {
                const dotsContainer = document.getElementById(category + 'Dots');
                if (dotsContainer) {
                    dotsContainer.addEventListener('click', (e) => {
                        if (e.target.classList.contains('dot')) {
                            const dotIndex = Array.from(dotsContainer.children).indexOf(e.target);
                            if (categories[currentCategory] === category) {
                                currentItems[category] = dotIndex;
                                updateItemDisplay();
                            }
                        }
                    });
                }
            });
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
            
            if (carousel && dots) {
                // Update carousel position
                carousel.style.transform = `translateX(-${currentItem * 100}%)`;
                
                // Update dots
                const dotElements = dots.querySelectorAll('.dot');
                dotElements.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentItem);
                });
            }
        }

        function updateDisplay() {
            updateCategoryDisplay();
        }

        // Function to add new items (for future expansion)
        function addMenuItem(category, item) {
            menuData[category].push(item);
            // Regenerate the specific page
            generateAllPages();
            setupEventListeners();
            updateDisplay();
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