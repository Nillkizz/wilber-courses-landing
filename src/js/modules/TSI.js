/*
Example of use ToggleShowingItems:

<div tsi-items-list-wrapper >
    <h3>...Title...</h3>
    <div tsi-items-list-block data-tsi-items-selector=".center-content > .item" data-tsi-number-of-collapsed-items="2">
        <div class="center-content">
            <div class="item">...Content</div>
            ...Items
        <div>
    </div>
    <a href="javascript:void(0)" tsi-toggle-button data-tsi-expand-text="Полный перечень услуг" data-tsi-collapse-text="Свернуть список">Полный перечень услуг</a>
</div>


Example of use Accordeon:
<div id="faq" data-tsi-accordeon>
    <div>
        <div data-tsi-toggle="collapse", data-tsi-target=`.faq-1`>
            Who is me?
        </div>
        <div class="faq-1" >
            <div class="collapse-body">
                I'm human!
            </div>
        </div>
    </div>
</div>
 */
function addStylesheet(styles) {
  // Сначала необходимо создать новую таблицу стилей
  var styleElt, styleSheet;

  if (document.createStyleSheet) {
    //Если определен IE API, использовать его
    styleSheet = document.createStyleSheet();
  } else {
    var head = document.getElementsByTagName("head")[0];
    styleElt = document.createElement("style"); // Новый элемент <style>
    head.appendChild(styleElt); // Вставить в <head>

    // Теперь новая таблица находится в конце массива
    styleSheet = document.styleSheets[document.styleSheets.length - 1];
  }

  // Вставить стили в таблицу
  if (typeof styles === "string") {
    // Аргумент содержит текстовое определение таблицы стилей
    if (styleElt) styleElt.innerHTML = styles;
    else styleSheet.cssText = styles; // IE API
  } else {
    // Аргумент объект с правилами для вставки
    var i = 0;
    for (selector in styles) {
      if (styleSheet.insertRule) {
        var rule = selector + " {" + styles[selector] + "}";
        styleSheet.insertRule(rule, i++);
      } else {
        styleSheet.addRule(selector, styles[selector], i++);
      }
    }
  }
}

class ToggleShowingItems {
  constructor(config = {}) {
    const _config = {
      startState: "collapsed",
      numberOfCollapsedItems: 3,

      itemsListWrapper: document.querySelector("[tsi-items-list-wrapper]"),
    };
    this.state = {
      itemsState: "expanded",
    };
    this.config = this._prepareConfig(_config, config);

    this._init();
  }

  toggleItemsList(action, scroll = true) {
    if (action === this.state.itemsState) return;
    switch (action) {
      case "collapse":
        this._collapse(scroll);
        break;
      case "expand":
        this._expand();
        break;
      default:
        this._toggle(scroll);
        break;
    }
  }

  _init() {
    this._initCss();
    if (this.config.itemsArray.length <= this.config.numberOfCollapsedItems) {
      this.config.toggleBtn.classList.add("TSI-d-none");
      return;
    }
    this.toggleItemsList(this.config.startState, false);
    this.config.toggleBtn.addEventListener(
      "click",
      this.toggleItemsList.bind(this)
    );
  }
  _toggle(scroll = true) {
    switch (this.state.itemsState) {
      case "expanded":
        this._collapse(scroll);
        break;
      case "collapsed":
        this._expand();
        break;
    }
  }
  _initCss() {
    if (!window.TSI_stiles) {
      // If no styles are added.
      addStylesheet(`
                .TSI-d-none { display: none!important; }
                a[tsi-toggle-button] { cursor: pointer!important; }
            `);
      window.TSI_stiles = true;
    }
  }
  _expand() {
    this.config.itemsArray.forEach((item) => {
      item.classList.remove("TSI-d-none");
    });
    this.state.itemsState = "expanded";
    this._changeToggleButtonText(this.config.toggleBtn.dataset.tsiCollapseText);
  }
  _collapse(scroll = true) {
    this.config.itemsArray
      .slice(this.config.numberOfCollapsedItems)
      .forEach((item) => {
        item.classList.add("TSI-d-none");
      });

    this.state.itemsState = "collapsed";
    if (scroll) this.config.itemsListWrapper.scrollIntoView();
    this._changeToggleButtonText(this.config.toggleBtn.dataset.tsiExpandText);
  }
  _changeToggleButtonText(text) {
    this.config.toggleBtn.innerText = text;
  }
  _prepareConfig(_config, config) {
    if (typeof config === "object") Object.assign(_config, config);
    else
      throw new Error(
        '"config" Constructor argiment shold be an "object"',
        config
      );

    const itemsListBlock = _config.itemsListWrapper.querySelector(
      "[tsi-items-list-block]"
    );
    const itemsSelector = itemsListBlock.dataset.tsiItemsSelector;
    const numberOfCollapsedItems =
      itemsListBlock.dataset.tsiNumberOfCollapsedItems;
    if (itemsSelector)
      _config.itemsArray = Array.from(
        itemsListBlock.querySelectorAll(itemsSelector)
      );
    else _config.itemsArray = Array.from(itemsListBlock.children);

    if (numberOfCollapsedItems)
      _config.numberOfCollapsedItems = numberOfCollapsedItems;

    _config.toggleBtn = _config.itemsListWrapper.querySelector(
      "[tsi-toggle-button]"
    );

    return _config;
  }
}

class Accordeon {
  constructor(accordeon = undefined) {
    this.SELECTORS = {
      toggler: '[data-tsi-toggle="collapse"]',
    };
    this.accordeon = accordeon;
    this.accordeon.accordeon = this;
    this.update();
  }

  collapseAll() {
    this._collapse(this.togglers);
  }
  update() {
    this.conf = this._prepareConfig();
    this.togglers = this.accordeon.querySelectorAll(this.SELECTORS.toggler);
    this.collapses = Array.from(this.togglers).map((el) =>
      this.accordeon.querySelector(el.dataset.tsiTarget)
    );

    this._init();
  }
  _init() {
    this._initCss();
    this.collapses.forEach((el) => el.classList.toggle("collapse", true));
    this.togglers.forEach((el) => {
      const collapse = this.accordeon.querySelector(el.dataset.tsiTarget);
      const expanded = collapse.classList.contains("show");
      el.setAttribute("aria-expanded", expanded);
      if (this.conf.stateOnParent)
        el.parentElement.setAttribute("aria-expanded", expanded);
    });

    this.accordeon.addEventListener("click", togglerHandler.bind(this));

    function togglerHandler(event) {
      const toggler = event.target;
      if (toggler.dataset.tsiToggle !== "collapse") return;
      this._toggle(toggler);
    }
  }

  _initCss() {
    if (!window.TSI_accordeon_stiles) {
      // If no styles are added.
      addStylesheet(`
                .collapse:not(.show) { display: none; }
                .collapsing.horizontal-collapse { width: 0; height: auto; transition: width .5s ease; } 
                .collapsing { height: 0; overflow: hidden; transition: height .5s ease; }
                `);
      window.TSI_accordeon_stiles = true;
    }
  }

  _isExpanded(elem) {
    return JSON.parse(elem.getAttribute("aria-expanded"));
  }
  _isNotExpand(elem) {
    return JSON.parse(elem.getAttribute("not-expand") ?? false);
  }
  _toggle(toggler) {
    if (!this._isExpanded(toggler)) {
      this._expand(toggler);
    } else if (!this.conf.stayExpanded) {
      this._collapse([toggler]);
    }
  }
  _collapse(togglers) {
    togglers.forEach((elem) => {
      if (this._isExpanded(elem)) {
        elem.setAttribute("aria-expanded", false);
        if (this.conf.stateOnParent)
          elem.parentElement.setAttribute("aria-expanded", false);
        const collapse = this.accordeon.querySelector(elem.dataset.tsiTarget);
        const dimension = this._getDimension(collapse);
        collapse.addEventListener(
          "transitionend",
          () => {
            collapse.classList.remove("collapsing");
            collapse.classList.add("collapse");
          },
          { once: true }
        );

        collapse.style[dimension] =
          this._getOriginSize(collapse)[dimension] + "px";
        collapse.classList.remove("collapse");
        collapse.classList.remove("show");
        requestAnimationFrame(() => {
          collapse.classList.add("collapsing");
          requestAnimationFrame(() => {
            collapse.style[dimension] = "";
          });
        });
      }
    });
  }
  _expand(toggler) {
    const togglers = this.togglers;
    const collapse = this.accordeon.querySelector(toggler.dataset.tsiTarget);
    const dimension = this._getDimension(collapse);
    collapse.addEventListener(
      "transitionend",
      () => {
        collapse.classList.remove("collapsing");
        collapse.classList.add("collapse");
        collapse.classList.add("show");
        collapse.style[dimension] = "";
      },
      { once: true }
    );

    requestAnimationFrame(() => {
      if (!this.conf.multiMode) this._collapse(togglers);
      if (this._isNotExpand(toggler)) return;
      collapse.classList.remove("collapse");
      const size = this._getOriginSize(collapse);
      collapse.classList.add("collapsing");
      if (dimension == "width") {
        collapse.querySelector(".collapse-body").style.width =
          size.width + "px";
      }
      requestAnimationFrame(() => {
        toggler.setAttribute("aria-expanded", true);
        if (this.conf.stateOnParent)
          toggler.parentElement.setAttribute("aria-expanded", true);
        collapse.style[dimension] = size[dimension] + "px";
      });
    });
  }

  _getDimension(collapse) {
    return collapse.classList.contains("horizontal-collapse")
      ? "width"
      : "height";
  }

  _getOriginSize(collapse) {
    const collapseBody = collapse.querySelector(".collapse-body");
    return {
      width: collapseBody.clientWidth,
      height: collapseBody.clientHeight,
    };
  }
  _prepareConfig() {
    const _config = {
      stayExpanded: this.accordeon.hasAttribute("stay-expanded"),
      multiMode: this.accordeon.hasAttribute("multi-mode"),
      stateOnParent: this.accordeon.hasAttribute("state-on-parent"),
    };
    return _config;
  }
}

exports.ToggleShowingItems = ToggleShowingItems;
exports.Accordeon = Accordeon;

// document.addEventListener('DOMContentLoaded', () => {
//     const tsiWrappers = document.querySelectorAll('[tsi-items-list-wrapper]');
//     tsiWrappers.forEach(elem => {
//         const config = {
//             itemsListWrapper: elem,
//         }

//         new ToggleShowingItems(config);
//     })

//     const tsiAccordeons = document.querySelectorAll('[data-tsi-accordeon]')
//     tsiAccordeons.forEach(elem => {
//         new Accordeon(accordeon = elem);
//     })
// })
