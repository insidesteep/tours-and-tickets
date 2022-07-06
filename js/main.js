(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // select language

  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  const select = document.querySelector(".selectpicker");
  const options = select.options;
  const path = window.location.pathname;

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    console.log(option.value, path);

    if (option.value == path) {
      option.selected = true;
    } else {
      option.select = false;
    }
  }

  // $('.selectpicke').selectpicker();

  const menuElements = document.querySelectorAll("#menu a");

  const feedbackForm = document.querySelector("#feedback");
  const name = document.querySelector("#feedback input#name");
  const email = document.querySelector("#feedback input#email");
  const phone = document.querySelector("#feedback input#phone");
  const text = document.querySelector("#feedback textarea#message");
  const submitButton = document.querySelector("#feedback button#submit");

  const bookingForm = document.querySelector("#booking");
  const bName = document.querySelector("#booking input#name");
  const bEmail = document.querySelector("#booking input#email");
  const bPhone = document.querySelector("#booking input#phone");
  const bDate = document.querySelector("#booking input#date");
  const bSubmitButton = document.querySelector("#booking button#submit");
  const tourName = document.querySelector(".tour-detail__head-l h1");

  const loader = document.querySelector("#spinner");
  const loaderText = document.querySelector("#spinner .sr-only");

  const resultModal = document.querySelector("#result-modal");
  const resultModalTitle = document.querySelector(
    "#result-modal .modal-body h2"
  );
  const resultModalText = document.querySelector("#result-modal .modal-body p");

  if (resultModal) {
    const resultModalAPI = new bootstrap.Modal(resultModal);
    resultModal.addEventListener("hide.bs.modal", (e) =>
      resultModal.classList.remove("error", "success")
    );
  }

  if (submitButton) {
    submitButton.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!feedbackForm.checkValidity()) {
        feedbackForm.classList.add("was-validated");
        return;
      }

      const formdata = new FormData();

      formdata.append("name", name.value);
      formdata.append("email", email.value);
      formdata.append("text", text.value);
      formdata.append("phone", phone.value);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      loader.classList.add("show");
      loaderText.innerText = "Отправка данных...";
      loaderText.classList.remove("sr-only");

      const response = await fetch(
        "https://qayerda.uz/feedback.php",
        requestOptions
      );

      const data = await response.json();

      if (response.status != 200) {
        resultModal.classList.add("error");
        resultModalTitle.innerText = "Ошибка";
      } else {
        resultModalTitle.innerText = "Успех";
        resultModal.classList.add("success");
      }

      resultModalText.innerText = data.message;
      resultModalAPI.show();

      loader.classList.remove("show");
      loaderText.innerText = "";
      loaderText.classList.add("sr-only");
    });
  }

  if (bSubmitButton) {
    bSubmitButton.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!bookingForm.checkValidity()) {
        bookingForm.classList.add("was-validated");
        return;
      }

      const formdata = new FormData();

      formdata.append("name", bName.value);
      formdata.append("email", bEmail.value);
      formdata.append("phone", bPhone.value);
      formdata.append("date", bDate.value);
      formdata.append("tourname", tourName.innerText);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      loader.classList.add("show");
      loaderText.innerText = "Отправка данных...";
      loaderText.classList.remove("sr-only");

      const response = await fetch(
        "https://qayerda.uz/booking.php",
        requestOptions
      );

      const data = await response.json();

      if (response.status != 200) {
        resultModal.classList.add("error");
        resultModalTitle.innerText = "Ошибка";
      } else {
        resultModalTitle.innerText = "Успех";
        resultModal.classList.add("success");
      }

      resultModalText.innerText = data.message;
      resultModalAPI.show();

      loader.classList.remove("show");
      loaderText.innerText = "";
      loaderText.classList.add("sr-only");
    });
  }

  const tourMenuItem = Array.from(menuElements).find((item) =>
    item.href.includes("package")
  );

  menuElements.forEach((item) => {
    console.log(item.href, window.location.href);
    if (item.href == window.location.href) {
      item.classList.add("active");
    } else if (window.location.href.includes("tour")) {
      tourMenuItem.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
})(jQuery);
