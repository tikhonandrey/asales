# Aviasales Test Task

## The task:
* Сверcтать макет (необязательно pixel perfect);
* Написать фронтенд на react-стеке;
* Поднять веб-сервер на python, который будет отдавать нужные данные на фронт (данные в файле dashboard_data.json).

P.S. Оценивать будем умение выполнять задачу имея неполные данные о ней, а также умение самостоятельно принимать решения и качество вёрстки.
## Requirements
* node >= 10
* yarn >= 1.9
* python 2.7

под OSX и *nix python обычно стоит по-дефолту, 
под Windows можно установить с помощью команды в коноли из под админа :
`npm install --global --production windows-build-tools`
## Launch project
```cd ./front```
```yarn```

```yarn start```

запуск web сервера 
```
cd ./back
python srv.py
```
## Сроки
на подготовку и реализацию ушло примерно 2 рабочих дня по 7 часов.
## Description
Проект собран на основе create-react-app, состоит из стейт-лесс компонент в папке components и умного компонента-контроллера.
Думаю redux, react-router и тд лишь усложнили бы реализацию.

Для удобства использования реализована навигация по хешу в url и навигация клавиатурой(tabIndex).

Верстка на sass в формате scss. Модульная с общими файлами типографики, миксинами и переменными.
В переменных набрана палитра цветов проекта и сделана прослойка алиасов для гибкости.
Это позволило сделать "ночную тему" для приложения за пару минут(ветка theme-night)
Верстка нормализована normalize.css, восновном вся гибка и адаптивна.
# TODO
по функционалу остались вопросы:
когда должна появляться стрелочка вниз в индикаторах?
откуда взять среднее в метриках или за какой период их посчитать?
в индикаторах как опредилить прошлый период Last friday (это прошлая неделя или месяц или год)?
когда зеленые точки в метриках могут быть другого цвета?
когда CTR красный?
