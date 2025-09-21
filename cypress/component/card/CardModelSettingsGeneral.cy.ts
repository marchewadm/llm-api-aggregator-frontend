import CardModelSettingsGeneral from '@/components/custom/card/CardModelSettingsGeneral.vue';

describe('<CardModelSettingsGeneral />', () => {
  beforeEach(() => {
    cy.mountWithPinia(CardModelSettingsGeneral);
  });

  it('should render settings card correctly', () => {
    cy.get('button').should('exist').get('textarea').should('exist');
  });

  it('should display available models popover element when button is clicked', () => {
    cy.get('button').click().get('[data-radix-popper-content-wrapper]').should('exist');
  });

  it('should display initial custom instructions in textarea', () => {
    cy.get('textarea').should('have.value', 'You are a helpful assistant.');
  });

  it('should update custom instructions in textarea', () => {
    cy.get('textarea')
      .clear()
      .should('have.value', '')
      .should('have.attr', 'placeholder', 'You can set custom instructions for your model here.')
      .type('Test instructions.')
      .should('have.value', 'Test instructions.');
  });
});
