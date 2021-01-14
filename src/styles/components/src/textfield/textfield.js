const ClassMap = {
  component: ".js-float-field",
  input: ".js-float-input:not(.is-upgraded)",
};

const Typings = ["tel", "numeric"];

const mount = () => {
  const inputs = document.querySelectorAll(ClassMap.input);

  if (inputs.length > 0) {
    inputs.forEach((input) => upgrade(input));
  }

  document.addEventListener("input", ({ target }) => {
    if (target.tagName.toLowerCase() === "input") {
      delegateEvents(target);
    }
  });

  document.addEventListener("change", ({ target }) => {
    if (target.tagName.toLowerCase() === "select") {
      delegateEvents(target);
    }
  });
};

const delegateEvents = (target) => {
  if (target.closest(ClassMap.component)) {
    target
      .closest(ClassMap.component)
      .classList.toggle("is-dirty", dirtyInput(target));
  }
};

const upgrade = (input) => {
  input.classList.add("is-upgraded");

  input
    .closest(ClassMap.component)
    .classList.toggle("is-dirty", dirtyInput(input));

  changeType(input);
};

const changeType = (input) => {
  const type = input.getAttribute("data-typing");

  if (Typings.includes(type)) {
    input.type = type;
  }
};

const dirtyInput = (input) => input.value.trim().length > 0;

export default { mount, upgrade };
