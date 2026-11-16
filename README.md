# Практическая работа — GitHub Actions

Репозиторий содержит три workflow по заданию лекции:

1. **Basic Workflow** — ручной запуск, приветствие и сведения о runner.
2. **CI - Main Branch Path Filter** — запуск на push в `main` только при изменениях в `src/**` или `package.json`; проверка Node.js 20 и тестов.
3. **Advanced Pipeline** — ручные параметры `environment`, `build_number`, `debug_mode` и независимые задания Linux/Windows.

## Запуск

Откройте вкладку **Actions** в GitHub и вручную запустите **Basic Workflow** и **Advanced Pipeline**. Для CI внесите изменение в `src/` или `package.json` и отправьте commit в `main`.

## Локальная проверка

Требуется Node.js 20 или новее:

```bash
npm test
```

Подробное описание реализации и проверок: [REPORT.md](REPORT.md).
