import CardModelSettingsContainer from '@/components/custom/card/CardModelSettingsContainer.vue';

describe('<CardModelSettingsContainer />', () => {
  beforeEach(() => {
    cy.mount(CardModelSettingsContainer);
  });

  it('should render trigger button correctly', () => {
    cy.get('button').should('exist');
  });

  it('should display tooltip when trigger button is hovered', () => {
    cy.get('button').should('not.have.attr', 'aria-describedby');
    cy.get('button').realHover();
    cy.get('[data-radix-popper-content-wrapper]').should('exist');
  });

  it('should display tooltip when trigger button is focused', () => {
    cy.get('button').should('not.have.attr', 'aria-describedby');
    cy.get('button').focus();
    cy.get('[data-radix-popper-content-wrapper]').should('exist');
  });

  it('should open settings card when trigger button is clicked', () => {
    cy.get('button').click();
    cy.get('[data-radix-popper-content-wrapper]').should('exist');
  });
});
