declare namespace Cypress {
  interface Chainable {
    containsClasses(expectedClasses: Array<string>): Chainable<boolean>;
  }
}
