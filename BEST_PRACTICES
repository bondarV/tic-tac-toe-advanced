# 1. Розділення відповідальності (Separation of Concerns) за допомогою Custom Hooks

Я виніс бізнес-логіку гри та роботу з часом з UI-компонентів у власні хуки. Компонент `Gameplay` відповідає лише за рендер сітки, тоді як вся логіка ходів, перевірки переможця та зміни черги гравця інкапсульована в `useTicTacToe`. Логіка таймера винесена окремо в `useTimer`. Це робить код чистим, тестованим та легким для підтримки.

* **Логіка гри:**
  [useTicTacToe.js](src/hooks/useTicTacToe.js)
* **Логіка таймера:**
  [useTimer.js](src/hooks/useTimer.js)
* **Використання в UI:**
  [Gameplay/index.jsx](src/pages/Gameplay/index.jsx)

# 2. Модульний Global State Management за допомогою Redux Toolkit

Я не використовував один великий редюсер, натомість реалізував модульний підхід за допомогою "слайсів" (Slices). Модуль `settingsSlice` відповідає за конфігурацію гри, а `resultsSlice` — за історію та статистику. Це забезпечує масштабованість стору та автоматичну імутабельність даних завдяки Redux Toolkit, уникаючи "God Object".

* **Конфігурація стору:**
  [store/index.jsx](src/store/index.jsx)
* **Слайс налаштувань:**
  [settingsSlice.js](src/store/slices/settingsSlice.js)
* **Слайс результатів:**
  [resultsSlice.js](src/store/slices/resultsSlice.js)

# 3. Декларативна валідація форм

Замість ручних перевірок `if-else` для кожного поля, я використав зв'язку бібліотек `React Hook Form` та `Yup`. Правила валідації (мінімальна довжина імені, діапазон розміру поля) описані в окремій схемі `validationSchema`. Це робить логіку валідації декларативною, відокремленою від UI та зручною для розширення.

* **Компонент форми з валідацією:**
  [SettingsForm.jsx](src/components/form/SettingsForm/SettingsForm.jsx)
* **Схема валідації (всередині файлу):**
  [SettingsForm.jsx](validationSchema всередині SettingsForm.jsx)

# 4. Використання React Portals для модальних вікон

Щоб уникнути проблем із `z-index` та обрізанням контенту (overflow: hidden) у батьківських компонентах, я реалізував компонент `Modal` через портал (`createPortal`). Це дозволяє рендерити вікно завершення гри безпосередньо в `document.body` (вузол `#modal-root`), незалежно від того, як глибоко вкладена сама гра в DOM-дереві.

* **Реалізація порталу:**
  [Modal.jsx](src/components/common/Modal/Modal.jsx)
* **Стилізація модального вікна:**
  [Modal.module.css](src/components/common/Modal/Modal.module.css)
* **HTML контейнер для порталу:**
  [index.html](public/index.html)

# 5. Ізоляція стилів за допомогою CSS Modules

Для запобігання конфліктам імен класів у глобальному просторі (наприклад, загальні назви `.card` або `.button`), я використав CSS Modules. Кожен компонент має власний файл стилів, класи з якого при збірці отримують унікальні хеші. Це гарантує, що стилі сторінки профілю не вплинуть на стилі налаштувань чи гри.

* **Стилі профілю:**
  [UserProfile.module.css](src/pages/UserProfile/UserProfile.module.css)
* **Стилі навігації:**
  [NavBar.module.css](src/components/common/NavBar/NavBar.module.css)
* **Використання в компоненті:**
  [UserProfile/index.jsx](src/pages/UserProfile/index.jsx)
