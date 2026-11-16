# Отчёт по практической работе: GitHub Actions

**Репозиторий:** [16.11.2026](https://github.com/ffhg20197-maker/16.11.2026)  
**Дата:** 16.11.2026

## Цель работы

Создать и настроить три GitHub Actions workflow: базовый workflow с ручным запуском, CI с фильтрацией push-событий по ветке и путям, а также расширенный pipeline с входными параметрами и параллельными заданиями для Linux и Windows.

## 1. Базовый workflow

Файл: `.github/workflows/basic-workflow.yml`

- Триггер `workflow_dispatch` позволяет запускать workflow вручную.
- Задание `greeting-job` выполняется на `ubuntu-latest`.
- Первый последовательный шаг выводит приветствие одной командой `run`.
- Второй шаг использует многострочный блок `run: |` и выводит сведения о runner и системе.

**Проверка:** открыть GitHub → Actions → Basic Workflow → Run workflow. Успешный запуск должен завершиться зелёным статусом.

## 2. CI с фильтрацией по ветке и путям

Файл: `.github/workflows/ci-filter.yml`

Workflow запускается только при push в ветку `main`, если изменены файлы в `src/**` или файл `package.json`.

Внутри задания:
1. `actions/checkout@v4` получает исходный код.
2. `actions/setup-node@v4` устанавливает Node.js 20.
3. Команды `node -v` и `npm -v` выводят версии Node.js и npm.
4. `npm test` запускает три теста встроенным модулем Node.js `node:test`; внешние npm-зависимости не требуются.

**Положительная проверка фильтра:** внести изменение в файл внутри `src/` и отправить commit в `main` — workflow должен запуститься.

**Отрицательная проверка фильтра:** изменить только файл, который не находится в `src/**` и не является `package.json` (например, `REPORT.md`), и отправить commit в `main` — этот workflow не должен запускаться.

## 3. Расширенный pipeline

Файл: `.github/workflows/advanced-pipeline.yml`

Триггер — ручной запуск `workflow_dispatch` с тремя параметрами:

- `environment`: выбор `staging` или `production`;
- `build_number`: строковый номер сборки;
- `debug_mode`: логическое значение.

Определены два независимых задания, которые GitHub Actions может выполнять параллельно:

- `linux-build` на `ubuntu-latest`: checkout с `fetch-depth: 0`, вывод входных параметров, подсчёт коммитов командой `git rev-list --count HEAD`, проверка синтаксиса трёх YAML-файлов.
- `windows-build` на `windows-latest`: вывод входных параметров и сведений о Windows runner.

**Проверка:** открыть Actions → Advanced Pipeline → Run workflow, выбрать значения всех трёх параметров и запустить. Оба задания должны завершиться успешно.

## Структура проекта

```text
.github/
  workflows/
    basic-workflow.yml
    ci-filter.yml
    advanced-pipeline.yml
src/
  index.js
test/
  app.test.js
package.json
README.md
REPORT.md
```

## Самопроверка и критерии

| Критерий | Что реализовано |
|---|---|
| YAML-структура и синтаксис | Три отдельных workflow-файла с корректными отступами и структурой |
| Триггеры, фильтры и inputs | Ручные триггеры, push-фильтр main + paths, три типа входных параметров |
| Jobs и runners | greeting-job на Ubuntu; Linux и Windows jobs в advanced pipeline |
| Steps, actions и with | checkout@v4, setup-node@v4 с Node 20, команды вывода, тесты и проверка YAML |
| Качество и запуск | Понятные имена, комментарии/описания, документация и тестируемый пример Node.js |

## Результаты фактической проверки GitHub Actions

- **CI - Main Branch Path Filter:** GitHub Actions зарегистрировал два запуска после добавления/изменения файлов в `src/` и `package.json`. Оба завершились со статусом `success`; в обоих успешны checkout, установка Node.js 20, вывод версий и шаг `npm test`.
- **Отрицательная проверка path-фильтра:** последующее изменение только `README.md` не создало новый запуск CI. Это соответствует фильтру `paths`, поскольку README не входит в `src/**` и не является `package.json`.
- **Basic Workflow** и **Advanced Pipeline:** файлы опубликованы и настроены на `workflow_dispatch`, но их ручные запуски ещё не зарегистрированы. Для полного подтверждения этих двух заданий откройте Actions и запустите их вручную; у Advanced Pipeline проверьте, что оба задания (`linux-build` и `windows-build`) завершились успешно.
