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
