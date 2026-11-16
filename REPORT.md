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

## Что необходимо подтвердить в GitHub

Конфигурация и тестовый проект подготовлены в репозитории. Для подтверждения фактического выполнения требований о зелёных запусках необходимо вручную запустить оба workflow с `workflow_dispatch`, а также выполнить положительный и отрицательный тесты path-фильтра. Наличие файлов само по себе не доказывает, что все запуски уже прошли успешно.
