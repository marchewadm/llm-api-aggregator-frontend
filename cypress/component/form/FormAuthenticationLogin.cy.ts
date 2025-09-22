import FormAuthenticationLogin from '@/components/custom/form/FormAuthenticationLogin.vue';

describe('<FormAuthenticationLogin />', () => {
  beforeEach(() => {
    cy.mount(FormAuthenticationLogin);
  });

  it('should render the login form correctly', () => {
    cy.get('form').should('exist');

    cy.get('label').should('have.length', 2);
    cy.get('label').first().should('have.text', 'Email');
    cy.get('label').last().should('have.text', 'Password');

    cy.get('input').should('have.length', 2);
    cy.get('input').first().should('have.attr', 'type', 'email');
    cy.get('input').last().should('have.attr', 'type', 'password');

    cy.get('button').should('have.length', 2);
    cy.get('button')
      .first()
      .invoke('text')
      .then((text) => {
        const strippedText = text.trim();
        expect(strippedText).to.equal('Forgot your password?');
      });
    cy.get('button')
      .last()
      .invoke('text')
      .then((text) => {
        const strippedText = text.trim();
        expect(strippedText).to.equal('Sign in');
      });
  });

  it('should display tooltip on forgotten password button when hovered', () => {
    cy.get('button').first().should('have.attr', 'data-state', 'closed');
    cy.get('button').first().realHover();
    cy.get('button').first().should('have.attr', 'data-state', 'delayed-open');
  });

  it('should display tooltip on forgotten password button when focused', () => {
    cy.get('button').first().should('have.attr', 'data-state', 'closed');
    cy.get('button').first().focus();
    cy.get('button').first().should('have.attr', 'data-state', 'instant-open');
  });

  it('should hide tooltip on focused forgotten password button when ESC key is pressed', () => {
    cy.get('button').first().should('have.attr', 'data-state', 'closed');
    cy.get('button').first().focus();
    cy.get('button').first().should('have.attr', 'data-state', 'instant-open');
    cy.get('button').first().realPress('Escape');
    cy.get('button').first().should('have.attr', 'data-state', 'closed');
  });

  it('should not display error for valid email and password input', () => {
    cy.get('input').first().type('jane.doe@example.com');
    cy.get('input').last().type('b_Z6^2c4');

    cy.get('button').last().click();

    cy.get('p[role="alert"]').should('not.exist');
  });

  it('should display error message when field is required', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').each(($input) => {
      cy.wrap($input).focus();
    });

    cy.get('button').last().click();

    cy.get('p[role="alert"]')
      .should('have.length', 2)
      .each(($paragraph) => {
        cy.wrap($paragraph).should('have.text', 'Required');
      });
  });

  it('should display error message when email is invalid', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').first().type('invalid-email');
    cy.get('input').last().type('b_Z6^2c4');

    cy.get('button').last().click();

    cy.get('p[role="alert"]').should('exist').and('have.text', 'This is not a valid email');
  });

  it('should display error message when password is invalid', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').first().type('jane.doe@example.com');
    cy.get('input').last().type('b_Z6^2c');

    cy.get('button').last().click();

    cy.get('p[role="alert"]')
      .should('exist')
      .and('have.text', 'Password must be at least 8 characters long');
  });

  it('should display error messages when both fields are invalid', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').first().type('invalid-email');
    cy.get('input').last().type('b_Z6^2c');

    cy.get('button').last().click();

    cy.get('p[role="alert"]').first().should('exist').and('have.text', 'This is not a valid email');
    cy.get('p[role="alert"]')
      .last()
      .should('exist')
      .and('have.text', 'Password must be at least 8 characters long');
  });

  it('should display error message when field is cleared after typing', () => {
    cy.get('p[role="alert"]').should('not.exist');

    cy.get('input').first().type('invalid-email').clear();
    cy.get('input').last().type('b_Z6^2c').clear();

    cy.get('button').last().click();

    cy.get('p[role="alert"]')
      .first()
      .should('exist')
      .and('have.text', 'This field has to be filled');
    cy.get('p[role="alert"]')
      .last()
      .should('exist')
      .and('have.text', 'Password must be at least 8 characters long');
  });
});
