'use strict';

// Аккордеон
window.accordion = (function () {
  // Элементы аккордеона
  var accordionItems = document.querySelectorAll('.accordion');
  // Заголовки аккордеона
  var accordionTitles = document.querySelectorAll('.accordion__title');


  // Закрывает элемент аккордеона
  var closeAccordionItem = function (element) {
    if (element && element.classList.contains('accordion')) {
      element.classList.remove('accordion--opened');
    }
  };

  // Раскрывает элемент аккордеона
  var openAccordionItem = function (element) {
    if (element && element.classList.contains('accordion')) {
      element.classList.add('accordion--opened');
    }
  };

  // Закрывает все элементы аккордеона
  var closeAccordionItems = function () {
    if (accordionItems) {
      for (var i = 0; i < accordionItems.length; i++) {
        closeAccordionItem(accordionItems[i]);
      }
    }
  };

  // Переключает элемент аккордеона в открытое или закрытое состояние
  var toggleAccordionItem = function (element) {
    if (element && element.classList.contains('accordion')) {
      if (!element.classList.contains('accordion--opened')) {
        closeAccordionItems();
        openAccordionItem(element);
      } else {
        closeAccordionItem(element);
      }
    }
  };

  // Устанавливает обработчик для открытия и закрытия элемента аккордеона
  var addAccordionTitlesClickHandler = function () {
    if (accordionTitles) {
      for (var i = 0; i < accordionTitles.length; i++) {
        accordionTitles[i].addEventListener('click', function (evt) {
          toggleAccordionItem(evt.target.parentElement);
        });

        accordionTitles[i].addEventListener('keydown', function (evt) {
          if (evt.key === "Enter" || evt.key === "Spacebar" || evt.key === " ") {
            evt.preventDefault();
            toggleAccordionItem(evt.target.parentElement);
          }
        });
      }
    }
  };

  // Инициализирует аккордеон
  var initAccordion = function () {
    addAccordionTitlesClickHandler();
  };

  return {
    initAccordion: initAccordion
  };
})();
