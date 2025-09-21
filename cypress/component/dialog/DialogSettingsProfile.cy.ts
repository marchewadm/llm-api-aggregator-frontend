import DialogSettingsProfile from '@/components/custom/dialog/DialogSettingsProfile.vue';

describe('<DialogSettingsProfile />', () => {
  beforeEach(() => {
    cy.mount(DialogSettingsProfile);
  });

  it('should render all tab elements correctly', () => {
    cy.get('div[role="tablist"]').should('exist');
    cy.get('div[role="tabpanel"]').should('have.length', 2);
  });

  it('should display account tab as active by default', () => {
    cy.get('div[role="tabpanel"]').first().should('have.attr', 'data-state', 'active');
    cy.get('div[role="tabpanel"]').last().should('have.attr', 'data-state', 'inactive');
    cy.get('button[role="tab"]').first().should('have.attr', 'data-state', 'active');
    cy.get('button[role="tab"]').last().should('have.attr', 'data-state', 'inactive');
  });

  it('should switch to the password tab when clicked', () => {
    cy.get('button[role="tab"]').last().should('have.attr', 'data-state', 'inactive').click();
    cy.get('button[role="tab"]').last().should('have.attr', 'data-state', 'active');
    cy.get('div[role="tabpanel"]').last().should('have.attr', 'data-state', 'active');
    cy.get('div[role="tabpanel"]').first().should('have.attr', 'data-state', 'inactive');
    cy.get('button[role="tab"]').first().should('have.attr', 'data-state', 'inactive');
  });

  it('should switch back to the account tab when clicked', () => {
    cy.get('button[role="tab"]').last().click();
    cy.get('div[role="tabpanel"]').first().should('have.attr', 'data-state', 'inactive');
    cy.get('button[role="tab"]').first().should('have.attr', 'data-state', 'inactive').click();
    cy.get('button[role="tab"]').first().should('have.attr', 'data-state', 'active');
    cy.get('div[role="tabpanel"]').first().should('have.attr', 'data-state', 'active');
  });
});
