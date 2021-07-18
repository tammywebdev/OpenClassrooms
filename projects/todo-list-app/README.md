# Todo list app

This is a short specification about the todo apps that follows the Model View Controller (MVC) design pattern. The app uses pure (vanilla) javascript without any dependencies other than the MVC base components.

## Model View Controller (MVC) design pattern

The MVC pattern divides the whole application into model, view or controller sections. Each section of the code has a distinct purpose:
 - Model: Model code can hold, save and load raw data. The model code would define what a “todo item” is and what a “list” is.
 - View: View code is made up of all the functions that directly interact with the user. This is the code that renders the look of the app.
 - Controller: Controller code acts as a liaison between the Model and the View, receiving user input and deciding what to do with it.

## Structure

### Directory Structure

Project's file structure:

```
todo-list-app
├── README.md
├── index.html
├── js
│   ├── app.js
│   ├── controller.js
│   ├── helpers.js
│   ├── model.js
│   ├── store.js
│   ├── template.js
│   └── view.js
├── learn.json
├── license.md
├── node_modules
│   ├── jasmine-core
│   ├── todomvc-app-css
│   └── todomvc-common
├── package-lock.json
├── package.json
└── test
    ├── ControllerSpec.js
    └── SpecRunner.html

```

### Dependency Management

This app uses [npm](https://npmjs.com) for package management. All dependencies are specified in a `package.json` file at the root directory of the app. The project has only 2 dependencies and 1 development dependency for testing.

```json
{
  "private": true,
  "dependencies": {
    "todomvc-app-css": "^2.0.1",
    "todomvc-common": "^1.0.1"
  },
  "devDependencies": {
    "jasmine-core": "^2.0.0"
  }
}
```

You can install all dependencies locally by running the command line:

```bash
npm install
```

Everything will be installed in the `node_modules` directory. To run the app, open the `/index.html` page in the browser.

### Code

The `base.css` file is referenced from the `node_modules` directory without modifications. For custom styles and bug fixes, use the `app.css` file, but try to keep changes to a minimum.

### Running Tests

The `/test/ControllerSpec.js` file contains all the unit tests. To see the test results, open the `/test/SpecRunner.html` page in the browser. Note that the tests with an star at the end have recently been added, for example: `should show entries on start-up*`.

    30 specs, 0 failures

    controller
        should show entries on start-up*
    routing
        should show all entries without a route
        should show all entries without "all" route
        should show active entries*
        should show completed entries*
        should show the content block when todos exists
        should hide the content block when no todos exists
        should check the toggle all button, if all todos are completed
        should set the "clear completed" button
        should highlight "All" filter by default*
        should highlight "Active" filter when switching to active view*
    toggle all
        should toggle all todos to completed*
        should update the view*
    new todo
        should add a new todo to the model*
        should add a new todo to the view
        should clear the input field when a new todo is added
    element removal
        should remove an entry from the model*
        should remove an entry from the view
        should update the element count
    remove completed
        should remove a completed entry from the model
        should remove a completed entry from the view
    element complete toggle
        should update the model
        should update the view
    edit item
        should switch to edit mode
        should leave edit mode on done
        should persist the changes on done
        should remove the element from the model when persisting an empty title
        should remove the element from the view when persisting an empty title
        should leave edit mode on cancel
        should not persist the changes on cancel
        


## Functionality

### No todos

When there are no todos, `.main` and `.footer` should be hidden.

### New todo

New todos are entered in the input at the top of the app. The input element should be focused when the page is loaded, by using the `autofocus` input attribute. Pressing Enter creates the todo, appends it to the todo list, and clears the input. Use `.trim()` for the input and then check that it's not empty before creating a new todo.

### Mark all as complete

This checkbox toggles all the todos to the same state as itself. The checked state is cleared after the "Clear completed" button is clicked. The "Mark all as complete" checkbox is also updated when single todo items are checked/unchecked. When all the todos are checked it should also get checked.

### Item

A todo item has three possible interactions:

1. Clicking the checkbox marks the todo as complete by updating its `completed` value and toggling the class `completed` on its parent `<li>`

2. Double-clicking the `<label>` activates editing mode, by toggling the `.editing` class on its `<li>`

3. Hovering over the todo shows the remove button (`.destroy`)

### Editing

When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title, which should be focused (`.focus()`). The edit should be saved on both blur and enter, and the `editing` class should be removed. Make sure to `.trim()` the input and then check that it's not empty. If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.

### Counter

Displays the number of active todos in a pluralized form. Make sure the number is wrapped by a `<strong>` tag. Also make sure to pluralize the `item` word correctly: `0 items`, `1 item`, `2 items`. Example: **2** items left

### Clear completed button

Removes completed todos when clicked. Should be hidden when there are no completed todos.

### Persistence

The app saves the todos to localStorage as `todos-vanillajs`. Saving uses the keys `id`, `title`, `completed` for each item. Editing mode is not saved.

### Routing

The following routes are implemented: `#/` (all - default), `#/active` and `#/completed` (`#!/` is also allowed). When the route changes, the todo list is filtered on a model level and the `selected` class on the filter links is toggled. When an item is updated while in a filtered state, it is updated accordingly. For example, if the filter is `Active` and the item is checked, it becomes hidden. The active filter is saved on reload.
