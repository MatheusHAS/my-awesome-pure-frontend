const ClassMap = {
  menu: "js-menu",
  toggle: "js-menu-toggle",
  isOpen: "is-open",
};

const KeyCodes = [
  27, // ESC
];

class Menu {
  constructor() {
    console.log("menu");
    this.expanded = false;
    this.menu = document.querySelector(`.${ClassMap.menu}`);
    this.toggleButtons = document.querySelectorAll(`.${ClassMap.toggle}`);
    if (this.menu) {
      this.mount();
    }
  }

  mount() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("click");
        this.onToggle();
      });
    });
  }

  onToggle() {
    if (this.menu.classList.contains(ClassMap.isOpen)) {
      this.menu.classList.remove(ClassMap.isOpen);
    } else {
      this.menu.classList.add(ClassMap.isOpen);
    }
  }
}

export default Menu;
export { Menu };
