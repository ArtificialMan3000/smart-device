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

'use strict';

// Модуль модального окна
window.modal = (function () {
  // Модальное окно
  var MODAL = document.querySelector('.modal');
  // Кнопка закрытия модального окна
  var MODAL_CLOSE = MODAL.querySelector('.modal__close');
  // Оверлэй модального окна
  var MODAL_OVERLAY = MODAL.querySelector('.modal__overlay');
  // Кнопки вызова модального окна
  var CALL_REQUEST_BUTTONS = document.querySelectorAll('.call-request');
  // Поле "Имя"
  var nameField = MODAL.querySelector('.modal-form input#modal-name');

  // Показывает модальное окно
  var showModal = function () {
    MODAL.classList.add('modal--show');
    document.body.classList.add('body-modal-open');
    nameField.focus();
  };

  // Скрывает модальное окно
  var hideModal = function () {
    MODAL.classList.remove('modal--show');
    document.body.classList.remove('body-modal-open');
  };

  // Инициализирует модальное окно
  var initModal = function () {
    if (CALL_REQUEST_BUTTONS) {
      for (var i = 0; i < CALL_REQUEST_BUTTONS.length; i++) {
        CALL_REQUEST_BUTTONS[i].addEventListener('click', function () {
          showModal();
        });
      }
    }

    if (MODAL_CLOSE) {
      MODAL_CLOSE.addEventListener('click', function () {
        hideModal();
      });
    }

    if (MODAL_OVERLAY) {
      MODAL_OVERLAY.addEventListener('click', function () {
        hideModal();
      });
    }

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        hideModal();
      }
    });
  };

  return {
    initModal: initModal
  };
})();

'use strict';

// Модуль хранения данных формы
window.formStorage = (function () {
  // Сохраняет поля формы в localStorage
  var saveFields = function (form, fieldsNames) {
    if (form && fieldsNames) {
      for (var i = 0; i < fieldsNames.length; i++) {
        var currFieldSelector = '[name="' + fieldsNames[i] + '"]';
        var currField = form.querySelector(currFieldSelector);
        localStorage.setItem(fieldsNames[i], currField.value);
      }
    }
  };

  // Получает данные формы из localStorage
  var getFields = function (fieldsNames) {
    var formData = [];
    if (fieldsNames) {
      for (var i = 0; i < fieldsNames.length; i++) {
        var currFieldName = fieldsNames[i];
        var currFieldData = {
          'name': currFieldName,
          'value': localStorage.getItem(currFieldName)
        };
        formData.push(currFieldData);
      }
    }
    return formData;
  };

  // Записывает данные в форму
  var setFields = function (form, formData) {
    if (form && formData) {
      for (var i = 0; i < formData.length; i++) {
        var currFieldSelector = '[name="' + formData[i].name + '"]';
        var currField = form.querySelector(currFieldSelector);
        currField.value = formData[i].value;
      }
    }
  };

  // Инициализирует хранилище данных формы
  var initFormStorage = function (form, fieldsNames) {
    if (form && fieldsNames) {
      var formData = getFields(fieldsNames);
      setFields(form, formData);

      form.addEventListener('submit', function () {
        saveFields(form, fieldsNames);
      });
    }
  };

  return {
    initFormStorage: initFormStorage
  };
})();

'use strict';

// Модуль, который помогает заполнять поле телефона
window.phoneFieldHelper = (function () {
  // Поля телефона
  var phoneFields = document.querySelectorAll('input[type="tel"]');
  // Сообщение об ошибке
  var INVALID_MESSAGE = 'Укажите телефон в формате +7(XXX)XXXXXXX';

  // Устанавливает сообщение для поля телефона
  var setPhoneFieldValidationMessage = function (field) {
    if (field) {
      field.addEventListener('change', function (evt) {
        evt.target.setCustomValidity('');
        if (!evt.target.checkValidity()) {
          evt.target.setCustomValidity(INVALID_MESSAGE);
        }
      });
    }
  };

  // Автоматически форматирует значение, вводимое в поле телефона
  var autoformatPhoneValue = function (field) {
    if (field) {
      field.addEventListener('input', function (evt) {
        if (evt.target.value.slice(0, 4).search('^\\+7\\(') === -1) {
          evt.target.value = '+7(';
        } else if (evt.target.value.search('^\\+7\\([0-9]{3}$') !== -1) {
          evt.target.value += ')';
        } else if (evt.target.value.search('^\\+7\\([0-9]{3}\\)[0-9]{7}') !== -1) {
          evt.target.value = evt.target.value.slice(0, 14);
        }
      });
    }
  };

  // Инициализирует модуль
  var initPhoneFieldHelper = function () {
    if (phoneFields && phoneFields.length > 0) {
      for (var i = 0; i < phoneFields.length; i++) {
        setPhoneFieldValidationMessage(phoneFields[i]);
        autoformatPhoneValue(phoneFields[i]);
      }
    }
  };

  return {
    initPhoneFieldHelper: initPhoneFieldHelper
  };
})();

'use strict';

// Главный модуль
window.main = (function () {
  // Инициализируем аккордеон
  window.accordion.initAccordion();

  // Инициализируем модальное окно
  window.modal.initModal();

  // Инициализируем хранилище данных формы в модальном окне
  var modalForm = document.querySelector('.modal-form form');
  window.formStorage.initFormStorage(modalForm, ['name', 'phone', 'message']);

  // Инициализируем помощник заполнения поля телефона
  window.phoneFieldHelper.initPhoneFieldHelper();
})();
