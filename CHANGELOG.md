# Changelog

This is the Version record for i18next-ssg

## [3.0.3] - 2023-05-16

### Fixed

- fix esm support
- update demo code and link in README.md

## [3.0.2] - 2023-02-16

### Fixed

- fix ts declaration link for Redirect
- support pages under src dir: https://github.com/Yrobot/i18next-ssg/issues/3

### Added

- add some local test code

## [3.0.1] - 2023-01-11

### Fixed

- fix Invalid href with localize: `localize('/arya')` => `/zh/arya` not `/zh//arya`

## [3.0.0] - 2023-01-11

### Fixed

- fix all bugs, this is the basic working version for this repo. The version below are NOT working any more

## [2.0.0] - [NOT WORKING] - 2023-01-03

### Fixed

- try to fix config bugs

## [1.1.0] - [NOT WORKING] - 2022-11-20

### Fixed

- Fix read config fail bug

### Added

- Update Readme
- Update package.json

## [1.0.0] - [NOT WORKING] - 2022-11-19

### Added

- add README.md
- add static config read logic
  - locale
  - locales
- read locale: url > local > navigator detect
- set locale
- export \* from next-i18next
- common redirect logic for [...paths] pages
- add I18NLink
- add some tools functions
  - localize
  - getPathsArr
  - useLocaleSwitcher
  - useI18nPath
  - encodeI18nPath, decodeI18nPath
