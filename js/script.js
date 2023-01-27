// side menu

function throttle(fn, wait) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function scroll_cb() {
  var scroll = $(window).scrollTop();
  var addClassOnScroll = function () {
    var windowTop = $(window).scrollTop();
    $(".panel[id]").each(function (index, elem) {
      var offsetTop = $(elem).offset().top;
      var outerHeight = $(this).outerHeight(true);

      if (windowTop > offsetTop - 50 && windowTop < offsetTop + outerHeight) {
        var elemId = $(elem).attr("id");
        $(".progress ul li a.current").removeClass("current");
        $(".progress ul li a[href='#" + elemId + "']").addClass("current");
      }
    });
  };
  addClassOnScroll();
}

$(document).ready(function () {
   window.addEventListener("scroll", throttle(scroll_cb, 100));
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var doc = $(document).height();
    var win = $(window).height();
    var value =
      (scroll / (doc - win)) *
      90; /* this value will varie in function of your page height*/
    $("ul .sideline").css("height", value + "%");
  });
  $("a.clickable").click(function () {
    $("a.current").removeClass("current");
    $(this).addClass("current");
  });
});
// side menu end

// right side project scroll

let cursor = document.getElementById("cursor");
let close = document.getElementById("close");
let body = document.body;
let iframe = document.getElementById("pen");
let penLink = document.getElementById("penlink");
let links = document.getElementsByTagName("a");

let frames = [
  "ess.html",
  "fmd.html",
  "rot.html",
  "https://ejlindesign.com",
  "https://ejlindesign.com",
];

// Load iFrames on demand & remove after modal is closed to reduce weight & smooth out transitions


let cards = document.getElementsByClassName("inner");
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("mousemove", function (event) {
    cursor.classList.add("active");
  });
  cards[i].addEventListener("mouseover", function (event) {
    cursor.classList.add("active");
  });

  cards[i].addEventListener("mouseout", function (event) {
    cursor.classList.remove("active");
  });
  cards[i].addEventListener(
    "click",
    function (i) {
      body.classList.add("active");
      iframe.setAttribute("src", frames[i]);
      let penDebug = frames[i];
      let penFull = penDebug.replace("debug", "pen");
      penLink.setAttribute("href", penFull);
    }.bind(null, i)
  );
}

// hover events for social links

for (link of links) {
  link.addEventListener("mouseover", function (event) {
    cursor.classList.add("linkhover");
  });
  link.addEventListener("mousemove", function (event) {
    cursor.classList.add("linkhover");
  });
  link.addEventListener("mouseout", function (event) {
    cursor.classList.remove("linkhover");
  });
}

// Escape key option to exit active state

document.onkeydown = function (evt) {
  evt = evt || window.event;
  let isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
    console.log("a");
  } else {
    isEscape = evt.keyCode === 27;
    console.log("b");
  }
  if (isEscape) {
    console.log("c");
    body.classList.remove("active");
    setTimeout(() => {
      iframe.setAttribute("src", "");
    }, 2000);
  }
};

close.addEventListener("click", function (event) {
  body.classList.remove("active");
  setTimeout(() => {
    iframe.setAttribute("src", "");
  }, 2000);
});


gsap.set("#cursor", { xPercent: -50, yPercent: -50 });
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.35;

const xSet = gsap.quickSetter(cursor, "x", "px");
const ySet = gsap.quickSetter(cursor, "y", "px");

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

Splitting();

// Individual section scroll progress

gsap.utils.toArray(".panel").forEach((section, index) => {
  gsap.to(this, {
    scrollTrigger: {
      trigger: section,
      start: "top 100%",
      end: "bottom 25%",
      scrub: 0,
      onUpdate: (self) => {
        section.style.setProperty("--progress", self.progress);
      }
    }
  });
});

// Full page scroll progress

gsap.to("body", {
  scrollTrigger: {
    trigger: "body",
    start: "top 100%",
    end: "50% 50%",
    scrub: 0,
    onUpdate: (self) => {
      body.style.setProperty("--progress", self.progress);
    }
  }
});

// Pull out the preloader

document.addEventListener("DOMContentLoaded", function () {
  body.classList.add("loaded");
  console.log("c");
});

// Set a delay on Scrolltrigger recalculation to accommodate element transition times

function refresh() {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 2500);
}

window.addEventListener("resize", refresh);
