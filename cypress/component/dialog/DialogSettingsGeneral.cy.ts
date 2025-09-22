import DialogSettingsGeneral from '@/components/custom/dialog/DialogSettingsGeneral.vue';

describe('<DialogSettingsGeneral />', () => {
  beforeEach(() => {
    cy.mountWithPinia(DialogSettingsGeneral);
  });

  it('should render all elements correctly', () => {
    cy.get('div.flex.flex-col.gap-y-2 div')
      .should('have.length', 5)
      .get('div[role="separator"]')
      .should('have.length', 2)
      .get('button[role="combobox"]')
      .should('have.length', 2)
      .get('button')
      .contains('Delete')
      .should('exist');
  });

  it('should open combobox when clicked', () => {
    cy.get('button[role="combobox"]').each(($button) => {
      cy.wrap($button)
        .click()
        .get('div[data-radix-popper-content-wrapper]')
        .should('exist')
        .realPress('Escape');
    });
  });

  it('should open combobox when Enter key is pressed on focused button', () => {
    cy.get('button[role="combobox"]').each(($button) => {
      cy.wrap($button)
        .focus()
        .realPress('Enter')
        .get('div[data-radix-popper-content-wrapper]')
        .should('exist')
        .realPress('Escape');
    });
  });

  it('should open combobox when Space key is pressed on focused button', () => {
    cy.get('button[role="combobox"]').each(($button) => {
      cy.wrap($button)
        .focus()
        .realPress(' ')
        .get('div[data-radix-popper-content-wrapper]')
        .should('exist')
        .realPress('Escape');
    });
  });
});
