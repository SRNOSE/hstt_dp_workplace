let isMobile = false;

const getRandomId = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const stringLength = 15;
  let randomstring = '';
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};

const accordionComponent = {
  init: () => {
    const accordionWraps = document.querySelectorAll('.accordion-wrap');
    if (accordionWraps) {
      accordionWraps.forEach((accordionWrap, index) => {
        const randomId = getRandomId();
        const accordions = accordionWrap.querySelectorAll('.accordion');

        accordions.forEach((accordion, idx) => {
          const btnToggle = accordion.querySelector('.btn-accordion');
          const accordionPanel = accordion.querySelector('.accordion-panel');

          if (btnToggle) {
            btnToggle.setAttribute('id', `btn${randomId}${index}${idx}`);
            btnToggle.setAttribute('aria-controls', `panel${randomId}${index}${idx}`);
            btnToggle.setAttribute('aria-expanded', 'false');
            btnToggle.addEventListener('click', () => {
              accordionComponent.openToggle(accordion, btnToggle, accordionPanel);
            });
          }
          if (accordionPanel) {
            accordionPanel.setAttribute('role', 'region');
            accordionPanel.setAttribute('aria-labelledby', `btn${randomId}${index}${idx}`);
            accordionPanel.setAttribute('id', `panel${randomId}${index}${idx}`);
            accordionPanel.hidden = false;
          }
        });
      });
    }
  },
  openToggle: (accordion, btnToggle, accordionPanel) => {
    const toggleLabel = btnToggle.querySelector('span');
    if (btnToggle.getAttribute('aria-expanded') === 'false') {
      accordion.classList.add('hidden');
      btnToggle.setAttribute('aria-expanded', 'true');
      accordionPanel.hidden = true;
      if (toggleLabel && toggleLabel.classList.contains('sr-only')) {
        toggleLabel.textContent = '내용 닫힘';
      } else {
        toggleLabel.textContent = '펼치기';
      }
    } else {
      accordion.classList.remove('hidden');
      btnToggle.setAttribute('aria-expanded', 'false');
      accordionPanel.hidden = false;
      if (toggleLabel && toggleLabel.classList.contains('sr-only')) {
        toggleLabel.textContent = '내용 열림';
      } else {
        toggleLabel.textContent = '접기';
      }
    }
  },
};

const alertComponent = {
  init: () => {
    const alerts = document.querySelectorAll('.alert-wrap');
    if (alerts) {
      alerts.forEach((alert) => {
        const btnClose = alert.querySelector('.btn-alert-close');
        const btnCancel = alert.querySelector('.btn-alert-cancel');
        const btnOk = alert.querySelector('.btn-alert-ok');

        alert.setAttribute('role', 'alert');
        const alertId = alert.getAttribute('id');
        // alert close
        if (btnClose) {
          btnClose.addEventListener('click', () => {
            alertComponent.onCloseAlert(alertId);
          });
        }
        if (btnCancel) {
          btnCancel.addEventListener('click', () => {
            alertComponent.onCloseAlert(alertId);
          });
        }
        if (btnOk) {
          btnOk.addEventListener('click', () => {
            alertComponent.onCloseAlert(alertId);
          });
        }
      });
    }
  },
  onOpenAlert: (alertId) => {
    const alert = document.getElementById(alertId);
    if (alert) {
      alert.classList.add('active');
    }
  },
  onCloseAlert: (alertId) => {
    const alert = document.getElementById(alertId);
    if (alert) {
      alert.classList.remove('active');
    }
  },
};

const checkboxComponent = {
  init: () => {
    const checkGroups = document.querySelectorAll('.checkbox-group');
    if (checkGroups) {
      for (let i = 0; i < checkGroups.length; i++) {
        checkGroups[i].setAttribute('role', 'group');
      }
    }
    const checkWraps = document.querySelectorAll('.checkbox-wrap');
    if (checkWraps) {
      for (let j = 0; j < checkWraps.length; j++) {
        const check = checkWraps[j].querySelector('input[type="checkbox"]');

        const checkedState = check.checked;
        if (checkedState) {
          check.setAttribute('aria-checked', 'true');
        } else {
          check.setAttribute('aria-checked', 'false');
        }

        check.addEventListener('click', () => {
          checkboxComponent.currentChecked(check);
        });

        check.addEventListener('keydown', (event) => {
          const targetCode = event.key || event.code || event.keyCode;
          if (targetCode === ' ' || targetCode === 32 || targetCode === 'Space') {
            checkboxComponent.currentChecked(check);
          }
        });
      }
    }
  },
  currentChecked: (target) => {
    if (target.getAttribute('aria-checked') === 'true') {
      target.setAttribute('aria-checked', 'false');
    } else {
      target.setAttribute('aria-checked', 'true');
    }
  },
};

const selectComponent = {
  init: () => {
    const selectWrap = document.querySelectorAll('.select-wrap');

    if (selectWrap) {
      for (let i = 0; i < selectWrap.length; i++) {
        document.addEventListener('click', (event) => {
          if (!selectWrap[i].contains(event.target)) {
            select.selected.setAttribute('aria-expanded', 'false');
            select.selected.parentElement.classList.remove('active');
          }
        });
        const selected = selectWrap[i].querySelector('.select-wrap .selected');
        const selectList = selectWrap[i].querySelector('.select-wrap .select-list');
        const btns = selectList.querySelectorAll('.option');

        let select = {
          selected: selected,
          selectList: selectList,
          btns: btns,
          btnsLength: btns.length,
          currentOption: -1,
          randomId: getRandomId(),
          lastIndex: btns.length - 1,
        };

        selectComponent.selectedBtnInit(select);
        selectComponent.listInit(select);
        selectComponent.optionBtnInit(select);
      }
    }
  },
  selectedBtnInit: (select) => {
    // 각 btn init
    select.selected.setAttribute('id', `cbBtn${select.randomId}`);
    select.selected.setAttribute('aria-controls', `cbList${select.randomId}`);
    select.selected.setAttribute('role', 'select');
    select.selected.setAttribute('aria-haspopup', 'listbox');
    select.selected.setAttribute('aria-expanded', 'false');
    select.selected.setAttribute('tabindex', '0');

    // 각 btn event
    select.selected.addEventListener('click', (event) => {
      event.preventDefault();
      selectComponent.selectedBtnClick(select);
      if (select.currentOption < 0) {
        select.currentOption = 0;
      }
      selectComponent.optionBtnFocus(select);
    });
    select.selected.addEventListener('keydown', (event) => {
      const targetCode = event.key || event.code || event.keyCode;
      if (targetCode === 'Tab' || targetCode === 9) {
        select.selected.setAttribute('aria-expanded', 'false');
        select.selected.parentElement.classList.remove('active');
      }
      if ((targetCode === 'Shift' && targetCode === 'Tab') || (targetCode === 16 && targetCode === 9)) {
        select.selected.setAttribute('aria-expanded', 'false');
        select.selected.parentElement.classList.remove('active');
      }
      const arrowFn = (type) => {
        if (select.selected.getAttribute('aria-expanded') === 'false') {
          select.selected.setAttribute('aria-expanded', 'true');
          select.selected.parentElement.classList.add('active');
          if (select.currentOption <= 0) {
            select.currentOption = 0;
          }
          selectComponent.optionBtnFocus(select);
        } else {
          if (type === 'up') {
            if (select.currentOption <= 0) {
              select.currentOption = 0;
            } else {
              select.currentOption--;
            }
          } else {
            if (select.currentOption === select.btnsLength) {
              return false;
            }
            if (select.currentOption < select.lastIndex) {
              select.currentOption++;
            }
          }
          selectComponent.optionBtnFocus(select);
        }
      };
      // 윗쪽 방향키
      if (targetCode === 'ArrowUp' || targetCode === 38) {
        event.preventDefault();

        arrowFn('up');
      }
      // 아랫쪽 방향키
      if (targetCode === 'ArrowDown' || targetCode === 40) {
        event.preventDefault();

        arrowFn('down');
      }
      // Enter
      if (targetCode === 'Enter' || targetCode === 13 || targetCode === ' ' || targetCode === 32 || targetCode === 'Space') {
        event.preventDefault();

        if (select.selected.getAttribute('aria-expanded') === 'false') {
          select.selected.setAttribute('aria-expanded', 'true');
          select.selected.parentElement.classList.add('active');
        } else {
          select.selected.setAttribute('aria-expanded', 'false');
          select.selected.parentElement.classList.remove('active');
          if (select.btns[select.currentOption] !== undefined) {
            const selectOption = {
              txt: select.btns[select.currentOption].textContent.trim(),
              $btn: select.btns[select.currentOption],
              index: select.currentOption,
            };
            selectComponent.optionBtnClick(select, selectOption);
          }
        }
      }
    });
  },
  selectedBtnClick: (select) => {
    const bodyHeight = document.body.scrollHeight;
    if (select.selected.getAttribute('aria-expanded') === 'false') {
      select.selected.setAttribute('aria-expanded', 'true');
      select.selected.parentElement.classList.add('active');
      if (select.selected.parentElement.classList.contains('top') || select.selected.parentElement.classList.contains('bottom')) {
        return false;
      } else {
        const listY = select.selectList.getBoundingClientRect().top;
        const listHeight = select.selectList.clientHeight;
        if (listY + listHeight > bodyHeight) {
          select.selected.parentElement.classList.add('bottom');
        } else {
          select.selected.parentElement.classList.add('top');
        }
      }
    } else {
      select.selected.setAttribute('aria-expanded', 'false');
      select.selected.parentElement.classList.remove('active');
    }
  },
  listInit: (select) => {
    // 각 list init
    select.selectList.setAttribute('id', `cbList${select.randomId}`);
    select.selectList.setAttribute('role', 'listbox');
    select.selectList.setAttribute('tabindex', '-1');
  },
  optionBtnInit: (select) => {
    // 리스트 안 옵션
    Array.from(select.btns).map(($btn, index) => {
      $btn.setAttribute('id', `cbOption${select.randomId}-${index}`);
      $btn.setAttribute('role', 'option');
      $btn.setAttribute('aria-selected', 'false');

      $btn.addEventListener('click', (event) => {
        const selectOption = {
          txt: event.target.textContent,
          $btn: $btn,
          index: index,
        };
        selectComponent.optionBtnClick(select, selectOption);
        select.selected.focus();
      });
    });
  },
  optionBtnFocus: (select) => {
    for (let i = 0; i < select.btnsLength; i++) {
      select.btns[i].classList.remove('focus');
    }
    select.btns[select.currentOption].classList.add('focus');
    select.selected.setAttribute('aria-activedescendant', select.btns[select.currentOption].getAttribute('id'));
  },
  optionBtnClick: (select, selectOption) => {
    for (let i = 0; i < select.btnsLength; i++) {
      select.btns[i].setAttribute('aria-selected', 'false');
    }
    selectOption.$btn.setAttribute('aria-selected', 'true');

    select.selected.textContent = selectOption.txt;
    select.currentOption = selectOption.index;
    select.selected.setAttribute('aria-activedescendant', selectOption.$btn.getAttribute('id'));

    select.selected.setAttribute('aria-expanded', 'false');
    select.selected.parentElement.classList.remove('active');
  },
};

const datepickerComponent = {
  init: () => {
    const datepickerWrap = document.querySelectorAll('.datepicker-wrap');
    if (datepickerWrap) {
      for (let i = 0; i < datepickerWrap.length; i++) {
        const options = {
          randomId: getRandomId(),
          datepickerWrap: datepickerWrap[i],
          datepickerTarget: datepickerWrap[i].querySelector('input[type="text"]')
            ? datepickerWrap[i].querySelector('input[type="text"]')
            : datepickerWrap[i].querySelector('.inline-datepicker'),
          datepicker: null,
        };
        datepickerComponent.datepickerBuilder(options);
        options.datepicker = datepickerWrap[i].querySelector('.datepicker');
        options.datepickerTarget.addEventListener('keydown', (event) => {
          event.preventDefault();
        });
      }
    }
  },
  datepickerBuilder: (options) => {
    Datepicker.locales.ko = {
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysShort: ['일', '월', '화', '수', '목', '금', '토'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      today: '오늘',
      clear: '지우기',
      titleFormat: 'MM y',
      format: 'yyyy.mm.dd',
      weekstart: 0,
    };
    new Datepicker(options.datepickerTarget, {
      language: 'ko',
      nextArrow: `<span class='sr-only'>다음 달</span>`,
      prevArrow: `<span class='sr-only'>이전 달</span>`,
    });
  },
};

const inputComponent = {
  init: () => {
    const inputWrap = document.querySelectorAll('.input-wrap');
    if (inputWrap) {
      for (let i = 0; i < inputWrap.length; i++) {
        const input = inputWrap[i].querySelector('input');
        const btnDelete = inputWrap[i].querySelector('.btn-delete');
        if (inputWrap[i].classList.contains('active-delete')) {
          input.addEventListener('input', (event) => {
            const inputValue = event.target.value;
            if (inputValue) {
              inputWrap[i].classList.add('active');
            } else {
              inputWrap[i].classList.remove('active');
            }
          });
          btnDelete.addEventListener('click', () => {
            let inputValue = input.value;
            if (inputValue) {
              input.value = '';
              inputWrap[i].classList.remove('active');
            }
          });
        }
      }
    }
  },
};

const loadingComopnent = {
  loadingWrap: null,
  init: () => {
    loadingComopnent.loadingWrap = document.getElementById('loading');
    if (loadingComopnent.loadingWrap) {
      const $loading = `<img src="../../images/pc/loading.svg">`;

      loadingComopnent.loadingWrap.insertAdjacentHTML('afterbegin', $loading);

      loadingComopnent.loadingWrap.setAttribute('role', 'alert');
      loadingComopnent.loadingWrap.setAttribute('aria-live', 'assertive');
      loadingComopnent.loadingWrap.setAttribute('aria-label', '로딩 중');
    }
  },
  complete: () => {
    if (loadingComopnent.loadingWrap) {
      loadingComopnent.loadingWrap.removeAttribute('role');
      loadingComopnent.loadingWrap.setAttribute('aria-label', '로딩 종료');
      loadingComopnent.loadingWrap.style.display = 'none';
    }
  },
};

const modalComponent = {
  ariaHidden: ['#wrap'],
  init: () => {
    const modals = document.querySelectorAll('.modal-wrap');
    if (modals) {
      for (let i = 0; i < modals.length; i++) {
        const randomId = getRandomId();
        const modalWrap = modals[i].querySelector('.modal-dialog');
        const modalHeader = modals[i].querySelector('.modal-header');
        const modalContent = modals[i].querySelector('.modal-content');
        const modalFooter = modals[i].querySelector('.modal-footer');
        const btnClose = modals[i].querySelector('.btn-modal-close');
        const btnCancel = modals[i].querySelector('.btn-modal-cancel');
        const btnOk = modals[i].querySelector('.btn-modal-ok');

        const modalOptions = {
          id: modals[i].getAttribute('id'),
          randomId: randomId,
          rootWrap: modals[i],
          modalWrap: modalWrap,
          modalHeader: modalHeader,
          modalContent: modalContent,
          modalFooterHeight: modalFooter ? modalFooter.clientHeight : 0,
        };

        if (!isMobile) {
          const $backdrop = `<span class="backdrop"></span>`;
          if (!modalOptions.rootWrap.querySelector('.backdrop')) {
            modalOptions.rootWrap.insertAdjacentHTML('beforeend', $backdrop);
          }
          const backdrop = modalOptions.rootWrap.querySelector('.backdrop');
          if (backdrop) {
            backdrop.addEventListener('click', () => {
              modalComponent.onCloseModal(modalOptions.id);
            });
          }
        }
        // modal dialog
        if (modalOptions.rootWrap) {
          modalComponent.modalInit(modalOptions);
        }
        // modal header
        if (modalOptions.modalHeader) {
          modalComponent.headerInit(modalOptions);
        }
        // modal content
        if (modalOptions.modalContent) {
          modalComponent.contentInit(modalOptions);
        }
        // modal close
        if (btnClose) {
          btnClose.addEventListener('click', () => {
            modalComponent.onCloseModal(modalOptions.id);
          });
        }
        if (btnCancel) {
          btnCancel.addEventListener('click', () => {
            modalComponent.onCloseModal(modalOptions.id);
          });
        }
        if (btnOk) {
          btnOk.addEventListener('click', () => {
            modalComponent.onCloseModal(modalOptions.id);
          });
        }

        // focus
        modalComponent.focusEventInit(modalOptions);
      }
    }
  },
  onOpenModal: (modalId) => {
    const rootWrap = document.getElementById(modalId);
    if (rootWrap) {
      const modalWrap = rootWrap.querySelector('.modal-dialog');
      rootWrap.classList.add('active');
      rootWrap.setAttribute('tabindex', '0');
      modalWrap.setAttribute('aria-modal', 'true');
      rootWrap.focus();
    }

    modalComponent.ariaHidden.map((ele) => {
      const target = document.querySelector(ele);
      target.setAttribute('aria-hidden', 'true');
      target.setAttribute('tabindex', '-1');
    });
  },
  onCloseModal: (modalId) => {
    const rootWrap = document.getElementById(modalId);
    if (rootWrap) {
      const modalWrap = rootWrap.querySelector('.modal-dialog');
      rootWrap.classList.remove('active');
      rootWrap.removeAttribute('tabindex');
      modalWrap.setAttribute('aria-modal', 'false');
    }

    modalComponent.ariaHidden.map((ele) => {
      const target = document.querySelector(ele);
      target.removeAttribute('aria-hidden');
      target.removeAttribute('tabindex');
    });
    // modalOptions.modalBtn.focus();
  },
  modalInit: (modalOptions) => {
    modalOptions.modalWrap.setAttribute('id', `modal${modalOptions.randomId}`);
    modalOptions.rootWrap.classList.contains('full')
      ? modalOptions.modalWrap.setAttribute('role', 'dialog')
      : modalOptions.modalWrap.setAttribute('role', 'alertdialog');

    modalOptions.modalWrap.setAttribute('aria-labelledby', `modalHeader${modalOptions.randomId}`);
    modalOptions.modalWrap.setAttribute('aria-describedby', `modalContent${modalOptions.randomId}`);
    modalOptions.modalWrap.setAttribute('aria-modal', 'false');
  },
  headerInit: (modalOptions) => {
    modalOptions.modalHeader.setAttribute('id', `modalHeader${modalOptions.randomId}`);
  },
  contentInit: (modalOptions) => {
    modalOptions.modalContent.setAttribute('id', `modalContent${modalOptions.randomId}`);
    if (!isMobile) {
      const padding = 40;
      const maxHeight = document.body.clientHeight - modalOptions.modalHeader.clientHeight - modalOptions.modalFooterHeight - padding;
      modalOptions.modalContent.style.maxHeight = `${maxHeight}px`;
    }
  },
  focusEventInit: (modalOptions) => {
    const focusableElements = modalOptions.modalWrap.querySelectorAll('a, area, button, input, textarea, object, select');
    const removalSameName = new Set();

    const filteredElements = Array.from(focusableElements).filter((ele) => {
      const name = ele.getAttribute('name');
      if (!name || !removalSameName.has(name)) {
        removalSameName.add(name);
        return true;
      }
      return false;
    });
    const firstFocusableElement = filteredElements[0];
    const lastFocusableElement = filteredElements[filteredElements.length - 1];

    modalOptions.modalWrap.addEventListener('keydown', (event) => {
      const targetCode = event.key || event.code || event.keyCode;
      if (targetCode === 'Tab' || targetCode === 9) {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      } else if (event.shiftKey && (targetCode === 'Tab' || targetCode === 9)) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      }

      // ESC
      if (targetCode === 'Escape' || targetCode === 27) {
        modalOptions.rootWrap.classList.remove('active');
        modalOptions.modalWrap.setAttribute('aria-modal', 'false');
        modalComponent.onCloseModal(modalOptions.id);
      }
    });
  },
};

const radioComponent = {
  init: () => {
    const radioGroups = document.querySelectorAll('.radio-group');
    if (radioGroups) {
      for (let i = 0; i < radioGroups.length; i++) {
        radioGroups[i].setAttribute('role', 'radiogroup');
      }
    }

    const radioWraps = document.querySelectorAll('.radio-wrap');
    if (radioWraps) {
      for (let i = 0; i < radioWraps.length; i++) {
        const radio = radioWraps[i].querySelector('input[type="radio"]');
        radio.setAttribute('tabindex', '-1');

        const checkedState = radio.checked;
        if (checkedState) {
          radio.setAttribute('aria-checked', 'true');
        } else {
          radio.setAttribute('aria-checked', 'false');
        }

        radio.addEventListener('click', () => {
          radioComponent.currentChecked(radioWraps, radioWraps[i].querySelector('input[type="radio"]'));
        });

        radio.addEventListener('keydown', (event) => {
          const targetCode = event.key || event.code || event.keyCode;
          if (targetCode === ' ' || targetCode === 32 || targetCode === 'Space') {
            radioComponent.currentChecked(radioWraps, radioWraps[i].querySelector('input[type="radio"]'));
          }
        });
      }
    }
    // 첫번째 요소만
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const uniqueNames = new Set(Array.from(radioButtons).map((radio) => radio.getAttribute('name')));
    if (uniqueNames) {
      uniqueNames.forEach((name) => {
        const checkRadioIndex = document.querySelectorAll(`input[type="radio"][name='${name}']`);
        checkRadioIndex.forEach((radio, index) => {
          radio.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });
      });
    }
  },
  currentChecked: (radioWraps, target) => {
    for (let i = 0; i < radioWraps.length; i++) {
      const radio = radioWraps[i].querySelector('input[type="radio"]');
      radio.setAttribute('aria-checked', 'false');
    }
    target.setAttribute('aria-checked', 'true');
  },
};

const swiperComponent = {
  init: () => {
    const swiperWrap = document.querySelectorAll('.swiper-wrap');
    if (swiperWrap) {
      for (let i = 0; i < swiperWrap.length; i++) {
        const swiper = swiperWrap[i].querySelector('.swiper');
        const options = {
          swiper: swiper,
          randomId: getRandomId(),
          navigation: false,
          pagination: false,
        };
        if (swiperWrap[i].classList.contains('navigation')) {
          options.navigation = true;

          const $navWrap = `
            <div class="swiper-navigation-wrap" id="navigation${options.randomId}">
              <button type="button" class="swiper-button-prev"></button>
              <button type="button" class="swiper-button-next"></button>
            </div>
          `;
          swiper.insertAdjacentHTML('beforeend', $navWrap);
        }
        if (swiperWrap[i].classList.contains('pagination')) {
          options.pagination = true;

          const $paginationWrap = `
            <div class="swiper-pagination-wrap" id="pagination${options.randomId}">
              <div class="swiper-pagination"></div>
            </div>
          `;
          swiper.insertAdjacentHTML('beforeend', $paginationWrap);
        }

        swiperComponent.swiperBuilder(options);
      }
    }
  },
  swiperBuilder: (options) => {
    return new Swiper(options.swiper, {
      a11y: {
        paginationBulletMessage: '{{index}}번 슬라이드 이동',
        prevSlideMessage: '이전 슬라이드 이동',
        nextSlideMessage: '다음 슬라이드 이동',
        slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드입니다.',
      },
      pagination: options.pagination
        ? {
            el: '.swiper-pagination',
            clickable: true,
            clickableClass: 'swiper-pagination-clickable',
            bulletClass: 'swiper-pagination-custom',
            bulletActiveClass: 'swiper-pagination-custom-active',
          }
        : false,
      navigation: options.navigation
        ? {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }
        : false,
    });
  },
};

const tabComponent = {
  init: () => {
    const tabWrap = document.querySelectorAll('.tab-wrap');
    if (tabWrap) {
      for (let i = 0; i < tabWrap.length; i++) {
        const randomId = getRandomId();
        const tabList = tabWrap[i].querySelector('.tab-list');
        const tabButtons = tabList.children;
        const tabPanelList = tabWrap[i].querySelector('.tab-panels');
        const tabPanels = tabPanelList.children;
        const tabLength = tabButtons.length;
        const lastIndex = tabLength - 1;
        tabList.setAttribute('role', 'tablist');

        // 기본 id와 aria 설정
        if (tabLength > 0) {
          // 키보드 방향키 index init
          let tIndex = 0;

          for (let j = 0; j < tabLength; j++) {
            if (tabWrap[i].classList.contains('radio')) {
              // console.log('Radio Tab');
              const btnRadio = tabButtons[j].querySelector("input[type='radio']");
              if (btnRadio) {
                // 탭 버튼 init
                tabButtons[j].setAttribute('role', 'tab');
                tabButtons[j].setAttribute('id', `tab${randomId}${j}`);
                tabButtons[j].setAttribute('aria-controls', `panel${randomId}${j}`);
                // 이벤트 설정
                tabButtons[j].addEventListener('click', () => {
                  tabComponent.activeTab(tabButtons, tabPanels, j);
                });
                // 탭 패널 init
                tabPanels[j].setAttribute('role', 'tabpanel');
                tabPanels[j].setAttribute('id', `panel${randomId}${j}`);
                tabPanels[j].setAttribute('aria-labelledby', `tab${randomId}${j}`);
              }
              if (tabWrap[i].classList.contains('payment-tab')) {
                // 첫번째 요소 설정
                if (tabButtons.length > 0) {
                  tabComponent.activeTab(tabButtons, tabPanels, 1);
                }
              }
            } else {
              // 첫번째 요소 설정
              if (tabButtons.length > 0) {
                tabComponent.activeTab(tabButtons, tabPanels, 0);
              }
              // 탭 버튼 init
              tabButtons[j].setAttribute('role', 'tab');
              tabButtons[j].setAttribute('id', `tab${randomId}${j}`);
              tabButtons[j].setAttribute('aria-controls', `panel${randomId}${j}`);
              // 이벤트 설정
              tabButtons[j].addEventListener('click', () => {
                tabComponent.activeTab(tabButtons, tabPanels, j);
              });
              // 탭 패널 init
              tabPanels[j].setAttribute('role', 'tabpanel');
              tabPanels[j].setAttribute('id', `panel${randomId}${j}`);
              tabPanels[j].setAttribute('aria-labelledby', `tab${randomId}${j}`);
            }
            // 키보드 방향키 설정
            tabButtons[j].addEventListener('keydown', (event) => {
              const targetCode = event.key || event.code || event.keyCode;
              // 오른쪽 방향키
              if (targetCode === 'ArrowRight' || targetCode === 39) {
                event.preventDefault();
                if (tIndex === lastIndex) {
                  tIndex = 0;
                } else {
                  tIndex++;
                }
                tabButtons[tIndex].focus();
              }
              // 왼쪽 방향키
              if (targetCode === 'ArrowLeft' || targetCode === 37) {
                event.preventDefault();
                if (tIndex === 0) {
                  tIndex = lastIndex;
                } else {
                  tIndex--;
                }
                tabButtons[tIndex].focus();
              }
              // Enter
              if (targetCode === 'Enter' || targetCode === 13 || targetCode === ' ' || targetCode === 32 || targetCode === 'Space') {
                tabComponent.activeTab(tabButtons, tabPanels, tIndex);
              }
            });
          }
        }
      }
    }
  },
  activeTab: (tabButtons, tabPanels, index) => {
    for (const $btn of tabButtons) {
      $btn.classList.remove('active');
      $btn.setAttribute('tabindex', '-1');
      $btn.setAttribute('aria-selected', 'false');
    }

    for (const $panel of tabPanels) {
      $panel.classList.remove('active');
      $panel.setAttribute('tabindex', '-1');
      $panel.setAttribute('aria-hidden', 'true');
    }

    // 활성화
    const $activeButton = tabButtons[index];
    const $activePanel = tabPanels[index];

    $activeButton.classList.add('active');
    $activeButton.setAttribute('tabindex', '0');
    $activeButton.setAttribute('aria-selected', 'true');

    $activePanel.classList.add('active');
    $activePanel.setAttribute('tabindex', '0');
    $activePanel.setAttribute('aria-hidden', 'false');

    const radio = $activeButton.querySelector("input[type='radio']");
    if (radio) {
      radio.setAttribute('aria-checked', 'true');
      radio.checked = true;
    }
  },
};

const toggleComponent = {
  init: () => {
    const toggleWrap = document.querySelectorAll('.toggle-wrap');
    if (toggleWrap) {
      for (let i = 0; i < toggleWrap.length; i++) {
        const toggleInput = toggleWrap[i].querySelector('input');
        const toggleLabel = toggleWrap[i].querySelector('.sr-only');
        toggleInput.setAttribute('role', 'switch');
        toggleInput.addEventListener('click', (event) => {
          if (event.target.checked) {
            toggleLabel.textContent = '켜짐';
          } else {
            toggleLabel.textContent = '꺼짐';
          }
        });
      }
    }
  },
};

const toastComponent = {
  init: () => {
    const toasts = document.querySelectorAll('.toast-wrap');
    if (toasts) {
      toasts.forEach((toast) => {
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
      });
    }
  },
  onOpenToast: (toastId) => {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 3000);
    }
  },
};

const dndComponent = {
  init: () => {
    const handleDragStart = (e) => {
      const target = e.target;
      // target.style.opacity = '0.4';
      dragSrcEl = target;
      target.classList.add('dragging-item');

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', target.innerHTML);
    };

    const handleDragEnd = (e) => {
      const target = e.target;
      // target.style.opacity = '1';
      target.classList.remove('dragging-item');

      items.forEach((item) => {
        item.classList.remove('dragging');
      });
    };

    const handleDragOver = (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      return false;
    };

    const handleDragEnter = (e) => {
      const target = e.target.parentElement;
      target.classList.add('dragging');
    };

    const handleDragLeave = (e) => {
      const target = e.target.parentElement;
      target.classList.remove('dragging');
    };

    const handleDrop = (e) => {
      e.stopPropagation();
      const target = e.target.closest('tr');

      if (dragSrcEl !== target) {
        dragSrcEl.innerHTML = target.innerHTML;
        target.innerHTML = e.dataTransfer.getData('text/html');
      }

      return false;
    };

    let items = document.querySelectorAll('.drag-list .drag-item');
    items.forEach((item) => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('dragenter', handleDragEnter);
      item.addEventListener('dragleave', handleDragLeave);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('drop', handleDrop);
      item.setAttribute('draggable', 'true');
    });
  },
};

const btnTop = {
  init: () => {
    const btns = document.querySelectorAll('.btn-top');
    if (btns) {
      btns.forEach((btnTop) => {
        // 화면 위로 이동
        btnTop.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
        // show/hide
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          if (scrollY > windowHeight) {
            btnTop.style.opacity = '1';
          } else {
            btnTop.style.opacity = '0';
          }
        });
      });
    }
  },
};

const checkDevice = {
  init: () => {
    isMobile = window.matchMedia('(max-width: 767px)').matches;
  },
};

const uiComponentInit = () => {
  checkDevice.init();
  accordionComponent.init();
  alertComponent.init();
  checkboxComponent.init();
  selectComponent.init();
  datepickerComponent.init();
  inputComponent.init();
  loadingComopnent.init();
  modalComponent.init();
  radioComponent.init();
  swiperComponent.init();
  tabComponent.init();
  toggleComponent.init();
  toastComponent.init();
  dndComponent.init();
  btnTop.init();
};

window.addEventListener('DOMContentLoaded', () => {
  uiComponentInit();
});
