// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import styles
import '../../src/assets/index.css';
import 'highlight.js/styles/base16/material.css';

import 'cypress-real-events';

import { mount } from 'cypress/vue';

import { setActivePinia, createPinia } from 'pinia';
import type { DefineComponent } from 'vue';
import type { Pinia } from 'pinia';

// Pinia plugin
let pinia: Pinia;

beforeEach(() => {
  pinia = createPinia();
  setActivePinia(pinia);
});

function mountWithPinia(
  Comp: DefineComponent<any, any, any>,
  options?: Parameters<typeof mount>[1]
): Cypress.Chainable {
  return mount(Comp, {
    ...options,
    global: {
      ...options?.global,
      plugins: [...(options?.global?.plugins ?? []), pinia]
    }
  });
}

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithPinia: typeof mountWithPinia;
    }
  }
}

Cypress.Commands.add('mount', mount);
Cypress.Commands.add('mountWithPinia', mountWithPinia);
