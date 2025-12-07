(function ($) {
  "use strict";

  $(document).ready(function () {

    /* -----------------------------
       NAVBAR DROPDOWN ON HOVER (DESKTOP)
       ----------------------------- */
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).on("resize", toggleNavbarMethod);

    /* -----------------------------
       TOPBAR LANGUAGE DROPDOWN (UI ONLY)
       ----------------------------- */
    const langToggle = document.getElementById("langDropdown");
    if (langToggle) {
      const langItems = document.querySelectorAll(
        '[aria-labelledby="langDropdown"] .dropdown-item[data-lang]'
      );

      langItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const selectedText = this.textContent.trim();
          langToggle.textContent = "Language: " + selectedText;
          console.log("Selected language:", selectedText);

          // Close dropdown (Bootstrap 5)
          if (window.bootstrap && bootstrap.Dropdown) {
            const dd = bootstrap.Dropdown.getOrCreateInstance(langToggle);
            dd.hide();
          }
        });
      });
    }

    /* -----------------------------
       DATE & TIME PICKER (if present)
       ----------------------------- */
    if ($(".date").length) {
      $(".date").datetimepicker({
        format: "L",
      });
    }

    if ($(".time").length) {
      $(".time").datetimepicker({
        format: "LT",
      });
    }

    /* -----------------------------
       BACK TO TOP BUTTON
       ----------------------------- */
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    });

    $(".back-to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
    });

    /* -----------------------------
       OWL CAROUSELS (if elements exist)
       ----------------------------- */
    if ($(".price-carousel").length) {
      $(".price-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          992: {
            items: 2,
          },
          1200: {
            items: 3,
          },
        },
      });
    }

    if ($(".team-carousel").length || $(".related-carousel").length) {
      $(".team-carousel, .related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          992: {
            items: 2,
          },
        },
      });
    }

    if ($(".testimonial-carousel").length) {
      $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
      });
    }

    /* -----------------------------
       INTERSECTION OBSERVER – REVEAL & SLIDE
       ----------------------------- */
    if ("IntersectionObserver" in window) {
      // Fade-up elements
      const revealElements = document.querySelectorAll(".reveal-on-scroll");
      if (revealElements.length) {
        const revealObserver = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        revealElements.forEach((el) => revealObserver.observe(el));
      }

      // Slide-in elements
      const slideItems = document.querySelectorAll(".slide-on-scroll");
      if (slideItems.length) {
        const slideObserver = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("slide-visible");
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        slideItems.forEach((el) => slideObserver.observe(el));
      }
    } else {
      // Fallback: if no IntersectionObserver, show all
      document
        .querySelectorAll(".reveal-on-scroll, .slide-on-scroll")
        .forEach((el) => {
          el.classList.add("reveal-visible", "slide-visible");
        });
    }

  }); // end document.ready
})(jQuery);
