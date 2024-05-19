# Todo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Описание ТЗ:
Создать ‘TODO List’ приложение с ипользованием Angular v17, Angular material для UI + ngx-material-timepicker, и angular-async-local-storage для хранения данных локально, стейт менедмент либы не юзаем. 
В приложении должно быть 3 роута, /add, /list, /favourite. 


Todo должно создаваться на /add в виджете подобном тому что на скриншоте, только с заголовком Add TODO и кнопкой Back(<), c использованием ReactiveFormModule со следующими полями Tile (required) - texarea, Expiration date (required) - datepicker, expiration time (optional) - timepicker. Форма должна валидироватся по required, expiration date/time не мог быть меньше текущей даты/времени, Title - maxLength 100. Ошибки под полями должны высвечиваться только если поле dirty+touched, или была нажата кнопка Create (submit). При отображении ошибок валидации - UI не должен дергаться, можно разместить текст ошибок абсолютно под полями. После создания TODOшки - редирект юзера на /list.

/favourite,/list физически должен быть одним компонентом который в случае /favourite отображает только список favourite, в случае с /list все TODO. В случае с /list - мы имеем 2 списка. Первый - это список TODO на сегодня, второй остальные TODO. Сам Айтем TODO отображает Title (если не влезает в строку показываем …), Create at, Expiration (в случае если это список Today TODO, показываем time left таймер + красным цветом если меньше 1го часа осталось), кнопку favourite, кнопку remove. Компонент таймера не должен тригерить change detection всего приложения. 

Все данных храним\получаем через LS  (angular-async-local-storage)

Бонусом:
1. Респонсив под мобилку. Кнопки хедера add/list/favourites,  отобразить в гамбургер меню. Айтем TODOшки разбить на 2 строки в первой тайтл, ниже даты и кнопки.

2. Поставить задержку 300-400мс на все запросы в LS (так что бы пришлось обработать favourite, delete, create, list запросы в более реальных условиях с дизейблом от повторных кликов и debounce favourite кнопки), + хранить данные в сервисах так, что бы нажимая кнопку Back в /add список TODOшек был сразу отображен без ожидания респонса.