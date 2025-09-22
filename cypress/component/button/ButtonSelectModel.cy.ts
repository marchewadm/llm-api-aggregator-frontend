import ButtonSelectModel from '@/components/custom/button/ButtonSelectModel.vue';
import { setActivePinia, createPinia, defineStore } from 'pinia';

describe('<ButtonSelectModel />', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const mockUseChatStore = defineStore('chat', {
      state: () => ({
        aiModel: '',
        apiProvider: null,
        apiProviders: [
          {
            apiProviderId: 1,
            name: 'OpenAI',
            lowerCaseName: 'openai',
            aiModels: ['model_a', 'model_b']
          }
        ]
      })
    });

    mockUseChatStore();

    cy.mount(ButtonSelectModel);
  });

  it('should render the button with default text', () => {
    cy.get('button').should('exist');
    cy.get('span').should('have.text', 'Select model');
    cy.get('svg').should('exist');
  });

  it('should open the popover and display models', () => {
    cy.get('button').click();
    cy.get('p').should('have.text', 'OpenAI');
    cy.get('#radix-vue-combobox-group-4 svg').should('exist');
    cy.get('[data-radix-vue-combobox-item=""]').should('have.length', 2);
    cy.get('[data-radix-vue-combobox-item=""]').contains('model_a').should('exist');
    cy.get('[data-radix-vue-combobox-item=""]').contains('model_b').should('exist');
  });

  it('should select a model and update the button text', () => {
    cy.get('button').click();
    cy.get('[data-radix-vue-combobox-item=""]').contains('model_a').click();
    cy.get('span').should('have.text', 'model_a');
  });

  it('should open the popover and close it when clicking outside', () => {
    cy.get('button').click();
    cy.get('p').should('have.text', 'OpenAI');
    cy.get('button').click();
    cy.get('p').should('not.exist');
  });
});
