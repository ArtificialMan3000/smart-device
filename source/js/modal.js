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
