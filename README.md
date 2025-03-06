# LoginApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

## Features

- **Standalone Components:** All UI components are built as standalone components (using `standalone: true`), eliminating the need for extra NgModules.
- **Lazy Loading:** Components are dynamically loaded using `loadComponent` in the routing configuration.
- **Reactive Forms:** Login forms are built with Reactive Forms using FormBuilder, with form controls accessed via getters.
- **Error Handling:** A dedicated `ErrorMessageComponent` manages the display of form validation errors.
- **Token-based Authentication:** On successful login, a random token is generated and stored in localStorage.
- **User Data Display:** HomeComponent fetches user data (id, name, surname, role) from a static JSON file in `/src/assets` with a simulated 500 ms delay; during loading, a Bootstrap spinner is displayed.
- **Route Guards:** Functional guards (`AuthGuard` and `LoginGuard`) secure routes based on the presence of a token in localStorage.
- **Components:** UI elements like `LoginComponent`, `HomeComponent`, and `ErrorMessageComponent` are implemented as standalone components.
- **Guards:** `AuthGuard` and `LoginGuard` secure routes based on user authentication status.
- **Models:** Interfaces such as `User` and `Credentials` enforce strong typing.
- **Services:** `AuthService` manages login/logout logic, and `UserService` fetches user data from the static API.
- **Assets:** Static files (JSON, images) are stored in `/src/assets`.
- **Styles:** Global styles reside in `src/styles.scss`, while component-specific styles are in separate SCSS files.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Open your browser:

Navigate to http://localhost:4200. The application will automatically reload if you change any source files.

Login:

Go to `/login` and enter email and password.
On successful login, a random token is generated and stored along with credentials in localStorage, and you are redirected to the Home page.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
