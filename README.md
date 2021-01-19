# my-awesome-pure-frontend

> The solution was a test developed, aiming to be as pure as possible, without using a lot of dependencies to demonstrate frontend knowledge.

## Installing / Getting started

To install run:

```shell
$ npm i
```

and execute development use:

```shell
$ npm run dev
```

and to build for production, use:

```shell
$ npm run build
```

## Developing

### Built With

- `Typescript` using ES6+
- Styles with `SCSS` (using `BEM + IT` \ Block element modifier with inverted triangle)
- `commitlinter` to maintain all commits using conventional commits based on `angular convention`
- `eslint` + `prettier` to enforce code style
- `jest` and `cypress` to tests
- `husky` to guarantee run all tests before commits
- `Webpack` is used to run task builds, to generate the build of project and run local dev server
- and `Github actions` to run all tests when created a Pull request

### Template engine

In this project, i preferred don't use any template engines, to maintain more clean. But i common use the PugJS.

### Javascript\Modules

All modules used in javascript folder, was developed of me.

- `masker/masker.ts`

  > This module was developed to apply mask on fields, such CPF or Phone

- `router.ts`

  > Router was developed to improve performance of javascript bundle, using lazy load of chunks.

- `validator/validator.ts`

  > The validation module, was built to apply validation on fields using presented rules.

- `form.ts`

  > This module was developed to manipulate forms and automatically apply the validator. Caused a small prop drilling, but it was ok.

- `formatter.ts`

  > When i load informations on local storage, how i preferred maintain the localStorage data was clean, i need format again to show.

- `ready.ts`

  > Used to guarantee of execute the scripts when the window state is clean

- `toast.ts`

  > During the development, i felt the need of show alerts without `alert()` to improve user experience

- `localStorage.ts`

  > This abstraction is used to manipulate on my scripts a localStorage data.

- `memberCrud.ts`
  > This script use the `localStorage.ts` to manipulate my existing crud (create, update, read and delete) of members

## Tests

To run all tests use:

```shell
$ npm run test:cypress:ci
```

---

### Developed by

# Matheus Azambuja

[github.com/MatheusHAS](https://github.com/MatheusHAS)

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/matheusazambuja/)
