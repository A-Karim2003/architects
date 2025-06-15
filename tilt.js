class VanillaTilt {
  constructor(element, settings = {}) {
    if (!(element instanceof Node)) {
      throw (
        ("Can't initialize VanillaTilt because ", element, " is not a Node.")
      );
    }

    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.transitionTimeout = null;
    this.updateCall = null;
    this.event = null;

    this.updateBind = this.update.bind(this);
    this.resetBind = this.reset.bind(this);

    this.element = element;
    this.settings = this.extendSettings(settings);
    this.reverse = this.settings.reverse ? -1 : 1;

    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.element.addEventListener("mousemove", this.updateBind);
    this.element.addEventListener("mouseleave", this.resetBind);
  }

  onMouseEnter(event) {
    this.updateElementPosition();
    this.setTransition();
  }

  reset() {
    this.setTransition();
    this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg)`;
  }

  getValues(event) {
    const x = (event.clientX - this.left) / this.width;
    const y = (event.clientY - this.top) / this.height;

    const tiltX = (
      this.reverse *
      (this.settings.max / 2 - x * this.settings.max)
    ).toFixed(2);
    const tiltY = (
      this.reverse *
      (y * this.settings.max - this.settings.max / 2)
    ).toFixed(2);

    return { tiltX, tiltY };
  }

  updateElementPosition() {
    const rect = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  }

  update(event) {
    const values = this.getValues(event);
    this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(${values.tiltY}deg) rotateY(${values.tiltX}deg)`;
  }

  setTransition() {
    clearTimeout(this.transitionTimeout);
    this.element.style.transition = `${this.settings.speed}ms ${this.settings.easing}`;

    this.transitionTimeout = setTimeout(() => {
      this.element.style.transition = "";
    }, this.settings.speed);
  }

  extendSettings(settings) {
    const defaults = {
      reverse: false,
      max: 15,
      perspective: 1000,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      speed: 300,
    };
    return { ...defaults, ...settings };
  }

  static init(elements, settings) {
    if (elements instanceof Node) {
      elements = [elements];
    }
    if (elements instanceof NodeList || Array.isArray(elements)) {
      elements.forEach((el) => {
        if (!el.vanillaTilt) {
          el.vanillaTilt = new VanillaTilt(el, settings);
        }
      });
    }
  }
}

// Usage:
// VanillaTilt.init(document.querySelectorAll("[data-tilt]"));

window.VanillaTilt = VanillaTilt;
