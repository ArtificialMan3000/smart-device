'use strict';

// Аккордеон
window.accordion = (function () {
  // Элементы аккордеона
  var accordionItems = document.querySelectorAll('.accordion');
  // Заголовки аккордеона
  var accordionTitles = document.querySelectorAll('.accordion__title');
  // Строка медиа-запроса для мобильной версии
  var mediaStringMobile = '(max-width: 767px)';
  // Объект MediaQueryList для мобильной версии
  var mqlMobile = window.matchMedia(mediaStringMobile);

  // Устанавливает обработчик совпадения с медиазапросом для заголовка аккордеона
  // (делает его фокусабельным в зависимости от медиа-условий)
  var addAccordionTitleMediaQueryMatchHandler = function (mediaQueryList, element) {
    mediaQueryList.addListener(function (evt) {
      if (evt.matches) {
        makeFocusable(element);
      } else {
        makeUnfocusable(element);
      }
    });
  };

  // Добавляет возможность фокусироваться на элементе
  var makeFocusable = function (element) {
    if (element) {
      element.setAttribute('tabindex', 0);
    }
  };

  // Убирает возможность фокусироваться на элементе
  var makeUnfocusable = function (element) {
    if (element) {
      element.removeAttribute('tabindex');
    }
  };

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
    if (accordionItems && accordionItems.length > 0) {
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

  // Устанавливает обработчик клика на заголовке аккордеона
  // (открывает и закрывает элемент аккордеона)
  var addAccordionTitleClickHandler = function (element) {
    if (element) {
      element.addEventListener('click', function (evt) {
        toggleAccordionItem(evt.target.parentElement);
      });

      element.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter' || evt.key === 'Spacebar' || evt.key === ' ') {
          evt.preventDefault();
          toggleAccordionItem(evt.target.parentElement);
        }
      });
    }
  };

  // Инициализирует аккордеон
  var initAccordion = function () {
    closeAccordionItems();
    if (accordionTitles && accordionTitles.length > 0) {
      for (var i = 0; i < accordionTitles.length; i++) {
        if (mqlMobile.matches) {
          makeFocusable(accordionTitles[i]);
        }
        addAccordionTitleMediaQueryMatchHandler(mqlMobile, accordionTitles[i]);
        addAccordionTitleClickHandler(accordionTitles[i]);
      }
    }
  };

  return {
    initAccordion: initAccordion
  };
})();
