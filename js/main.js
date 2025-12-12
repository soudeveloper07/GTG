$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 10) {
            $('.navbar').addClass('header-fixed');
        }
        else {
            $('.navbar').removeClass('header-fixed');
        }
    });
});

// *** BANNER COUNTER SECTION JS *****************************************************************

$(document).ready(function () {
    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-animated-value');
        const duration = 2000; // 2 seconds for all counters
        const startTime = Date.now();

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix');

            function updateCounter() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuad = progress * (2 - progress);
                const current = Math.floor(easeOutQuad * target);

                counter.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            }

            updateCounter();
        });
    }

    // Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe the statistics section
    const statsSection = document.querySelector('.statistics-counter-main-section');
    observer.observe(statsSection);
});

// *** GTG Perfumes SECTION PRODUCT SLIDER ******************************************************************

$(document).ready(function () {
    var currentIndex = 0;
    var images = [];

    // Collect all image sources
    $(".thumbnail-display-image").each(function () {
        images.push($(this).attr("src").replace("200&h=200", "400&h=600"));
    });

    // Initialize thumbnail carousel
    var thumbnailCarousel = $(".product-thumbnail-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 3,
            },
            576: {
                items: 4,
            },
            768: {
                items: 4,
            },
        },
    });

    // Function to update preview image
    function updatePreview(index) {
        currentIndex = index;
        $("#mainPreviewImage").css("opacity", "0");

        setTimeout(function () {
            $("#mainPreviewImage").attr("src", images[index]);
            $("#mainPreviewImage").css("opacity", "1");
        }, 150);

        // Update thumbnail active state
        $(".thumbnail-image-box").removeClass("active-thumbnail");
        $('.thumbnail-image-box[data-index="' + index + '"]').addClass(
            "active-thumbnail"
        );

        // Update dots
        $(".single-dot-indicator").removeClass("active-dot");
        $('.single-dot-indicator[data-index="' + index + '"]').addClass(
            "active-dot"
        );
    }

    // Thumbnail click event
    $(".thumbnail-image-box").on("click", function () {
        var index = parseInt($(this).data("index"));
        updatePreview(index);
    });

    // Dots click event
    $(".single-dot-indicator").on("click", function () {
        var index = parseInt($(this).data("index"));
        updatePreview(index);
    });

    // Previous button
    $("#mainPrevBtn").on("click", function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updatePreview(currentIndex);
    });

    // Next button
    $("#mainNextBtn").on("click", function () {
        currentIndex = (currentIndex + 1) % images.length;
        updatePreview(currentIndex);
    });
});

// *** GTG Perfumes SECTION PRODUCT Add to cart ******************************************************************

function toggleAccordion(section) {
    const singleContent = document.getElementById('singleContent');
    const doubleContent = document.getElementById('doubleContent');
    const singleRadio = document.getElementById('singleSub');
    const doubleRadio = document.getElementById('doubleSub');
  
    if (section === 'single') {
      singleRadio.checked = true;
      singleContent.classList.add('expanded-state');
      doubleContent.classList.remove('expanded-state');
    } else {
      doubleRadio.checked = true;
      doubleContent.classList.add('expanded-state');
      singleContent.classList.remove('expanded-state');
    }
  }
  
  // Listen for changes on radio buttons
  document.addEventListener('change', function(e) {
    if (e.target.matches('input[name="subscription"]')) {
      const section = e.target.id === 'singleSub' ? 'single' : 'double';
      toggleAccordion(section);
    }
  });
  
  // The row onclick attributes will still work as before

// Function to toggle accordion (already in your code)
function toggleAccordion(type) {
    const content = document.getElementById(type + 'Content');
    const isExpanded = content.classList.contains('expanded-state');
    
    // Collapse all accordion sections
    document.querySelectorAll('.expandable-content-details-section').forEach(section => {
        section.classList.remove('expanded-state');
    });
    
    // Expand the clicked section if it wasn't already expanded
    if (!isExpanded) {
        content.classList.add('expanded-state');
    }
    
    // Also check the corresponding radio button
    const radioBtn = document.getElementById(type + 'Sub');
    if (radioBtn) {
        radioBtn.checked = true;
        updateAddToCartLink(); // Update cart link when subscription type changes
    }
}

// Function to update the add to cart link based on selections
function updateAddToCartLink() {
    // Get the selected subscription type
    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
    let selectedSubscription = '';
    
    for (const radio of subscriptionRadios) {
        if (radio.checked) {
            selectedSubscription = radio.id.replace('Sub', '').toLowerCase();
            break;
        }
    }
    
    // Get the selected fragrance based on the active subscription
    let selectedFragrance = '';
    if (selectedSubscription === 'single') {
        // Get fragrance from the Single Subscription section
        const fragranceRadios = document.querySelectorAll('#singleContent input[name="fragrance"]');
        for (const radio of fragranceRadios) {
            if (radio.checked) {
                selectedFragrance = radio.value.toLowerCase();
                break;
            }
        }
    } else if (selectedSubscription === 'double') {
        // For Double Subscription, we have two fragrance groups
        // Let's use the first group (name="purchaseType") as primary
        const purchaseTypeRadios = document.querySelectorAll('#doubleContent input[name="purchaseType"]');
        for (const radio of purchaseTypeRadios) {
            if (radio.checked) {
                selectedFragrance = radio.value.toLowerCase();
                break;
            }
        }
    }
    
    // Define cart links for each combination
    const cartLinks = {
        'single': {
            'original': 'https://example.com/cart/add?product=single-original&variant=001',
            'lily': 'https://example.com/cart/add?product=single-lily&variant=002',
            'rose': 'https://example.com/cart/add?product=single-rose&variant=003'
        },
        'double': {
            'original': 'https://example.com/cart/add?product=double-original&variant=004',
            'lily': 'https://example.com/cart/add?product=double-lily&variant=005',
            'rose': 'https://example.com/cart/add?product=double-rose&variant=006'
           
        }
    };
    
    // Update the add to cart link
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (selectedSubscription && selectedFragrance && 
        cartLinks[selectedSubscription] && 
        cartLinks[selectedSubscription][selectedFragrance]) {
        
        const cartLink = cartLinks[selectedSubscription][selectedFragrance];
        addToCartBtn.href = cartLink;
        
        // Optional: Show alert with selection info
        console.log(`Selected: ${selectedSubscription} subscription with ${selectedFragrance} fragrance`);
        console.log(`Cart link: ${cartLink}`);
    } else {
        // Default link if no selection is made
        addToCartBtn.href = 'javascript:void(0)';
    }
}

// Function to show alert message with selection
function showSelectionAlert() {
    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
    let selectedSubscription = '';
    
    for (const radio of subscriptionRadios) {
        if (radio.checked) {
            selectedSubscription = radio.id.replace('Sub', '').toLowerCase();
            break;
        }
    }
    
    let selectedFragrance = '';
    if (selectedSubscription === 'single') {
        const fragranceRadios = document.querySelectorAll('#singleContent input[name="fragrance"]');
        for (const radio of fragranceRadios) {
            if (radio.checked) {
                selectedFragrance = radio.value;
                break;
            }
        }
    } else if (selectedSubscription === 'double') {
        const purchaseTypeRadios = document.querySelectorAll('#doubleContent input[name="purchaseType"]');
        for (const radio of purchaseTypeRadios) {
            if (radio.checked) {
                selectedFragrance = radio.value;
                break;
            }
        }
    }
    
    alert(`Added to Cart!\n\nSubscription: ${selectedSubscription.charAt(0).toUpperCase() + selectedSubscription.slice(1)}\nFragrance: ${selectedFragrance}\n\nYou will be redirected to the checkout page.`);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial update of cart link
    updateAddToCartLink();
    
    // Add event listeners to all radio buttons
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', updateAddToCartLink);
    });
    
    // Add event listener to the add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', function(e) {
        // If no valid selection is made, prevent the default action
        if (this.href === 'javascript:void(0)' || this.href.includes('void(0)')) {
            e.preventDefault();
            alert('Please select a subscription type and fragrance first!');
        } else {
            // Show selection alert before redirecting
            e.preventDefault();
            showSelectionAlert();
            
            // Optional: Uncomment to actually redirect to cart link
            // window.location.href = this.href;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    let started = false;

    const startCounters = () => {
        if (started) return;
        started = true;

        const duration = 1500;
        const startTime = performance.now();

        function updateCounters(now) {
            const progress = Math.min((now - startTime) / duration, 1);

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute("data-target"));
                const value = Math.floor(progress * target);
                counter.textContent = value + "%";
            });

            if (progress < 1) requestAnimationFrame(updateCounters);
        }

        requestAnimationFrame(updateCounters);
    };

    const observer = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) startCounters();
    });

    observer.observe(document.querySelector(".stats-section"));
});