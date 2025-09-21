import FormAuthenticationResetPassword from '@/components/custom/form/FormAuthenticationResetPassword.vue';

describe('<FormAuthenticationResetPassword />', () => {
  beforeEach(() => {
    cy.mount(FormAuthenticationResetPassword);
  });

  it('should render the reset password form correctly', () => {
    cy.get('form').should('exist');

    cy.get('label').should('exist').and('have.text', 'Email');

    cy.get('input')
      .should('exist')
      .and('have.attr', 'type', 'email')
      .and('have.attr', 'placeholder', 'jane.doe@example.com');

    cy.get('button')
      .first()
      .invoke('text')
      .then((text) => {
        const strippedText = text.trim();
        expect(strippedText).to.equal('Submit');
      });
  });

  it('should not display error for valid email input', () => {
    cy.get('input').type('jane.doe@example.com');

    cy.get('button')
      .click()
      .then(() => {
        cy.get('p[role="alert"]').should('not.exist');
      });
  });

  it('should display error message when field is required', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').focus();

    cy.get('button')
      .click()
      .then(() => {
        cy.get('p[role="alert"]').should('exist').and('have.text', 'Required');
      });
  });

  it('should display error message when email is invalid', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').type('invalid-email');

    cy.get('button')
      .click()
      .then(() => {
        cy.get('p[role="alert"]').should('exist').and('have.text', 'This is not a valid email');
      });
  });

  it('should display error message when field is cleared after typing', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').type('invalid-email').clear();

    cy.get('button')
      .click()
      .then(() => {
        cy.get('p[role="alert"]').should('exist').and('have.text', 'This field has to be filled');
      });
  });
});
