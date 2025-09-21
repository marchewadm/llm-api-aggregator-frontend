import DialogSettingsContainer from '@/components/custom/dialog/DialogSettingsContainer.vue';

describe('<DialogSettingsContainer />', () => {
  it('should render the settings dialog correctly', () => {
    cy.mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .click()
      .get('div[role="dialog"]')
      .should('exist')
      .get('h2')
      .should('exist')
      .contains('Settings');
  });

  it('should display tooltip when hovering over the trigger button', () => {
    cy.mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .and('have.attr', 'data-state', 'closed')
      .realHover()
      .get('button')
      .should('have.attr', 'data-state', 'delayed-open');
  });

  it('should display tooltip when the trigger button is focused', () => {
    cy.mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .and('have.attr', 'data-state', 'closed')
      .focus()
      .should('have.attr', 'data-state', 'instant-open');
  });

  it('should open dialog when Enter key is pressed on focused button', () => {
    cy.mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .focus()
      .realPress('Enter')
      .get('div[role="dialog"]')
      .should('exist');
  });

  it('should open dialog when Space key is pressed on focused button', () => {
    cy.mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .focus()
      .realPress('Space')
      .get('div[role="dialog"]')
      .should('exist');
  });

  it('should close dialog when clicking the close button in the dialog', () => {
    cy.mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .click()
      .get('div[role="dialog"]')
      .should('exist')
      .find('button')
      .last()
      .should('exist')
      .click()
      .get('div[role="dialog"]')
      .should('not.exist');
  });

  it('should close dialog when ESC key is pressed', () => {
    cy.mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .click()
      .get('div[role="dialog"]')
      .should('exist')
      .realPress('Escape')
      .get('div[role="dialog"]')
      .should('not.exist');
  });

  it('should close dialog when clicking outside of the dialog', () => {
    cy.viewport(1024, 600).mountWithPinia(DialogSettingsContainer);
    cy.get('button')
      .should('exist')
      .click()
      .get('div[role="dialog"]')
      .should('exist')
      .get('body')
      .realClick({ x: 0, y: 0 })
      .wait(250)
      .get('div[role="dialog"]')
      .should('not.exist');
  });
});
