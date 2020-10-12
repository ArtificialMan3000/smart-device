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
