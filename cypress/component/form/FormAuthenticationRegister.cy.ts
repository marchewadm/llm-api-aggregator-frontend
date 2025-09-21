import FormAuthenticationRegister from '@/components/custom/form/FormAuthenticationRegister.vue';

describe('<FormAuthenticationRegister />', () => {
  beforeEach(() => {
    cy.mount(FormAuthenticationRegister);
  });

  it('should render the register form correctly', () => {
    cy.get('form').should('exist');

    cy.get('label').should('have.length', 4);
    cy.get('label').eq(0).should('have.text', 'What is your name?');
    cy.get('label').eq(1).should('have.text', 'Email');
    cy.get('label').eq(2).should('have.text', 'Password');
    cy.get('label').eq(3).should('have.text', 'Confirm password');

    cy.get('input').should('have.length', 4);
    cy.get('input').eq(0).should('have.attr', 'type', 'text');
    cy.get('input').eq(1).should('have.attr', 'type', 'email');
    cy.get('input').eq(2).should('have.attr', 'type', 'password');
    cy.get('input').eq(3).should('have.attr', 'type', 'password');

    cy.get('button')
      .should('have.length', 1)
      .invoke('text')
      .then((text) => {
        const strippedText = text.trim();
        expect(strippedText).to.equal('Sign up');
      });
  });

  it('should not display error for valid input', () => {
    cy.get('input').eq(0).type('Jane Doe');
    cy.get('input').eq(1).type('jane.doe@example.com');
    cy.get('input').eq(2).type('b_Z6^2c4');
    cy.get('input').eq(3).type('b_Z6^2c4');

    cy.get('button').click();

    cy.get('p[role="alert"]').should('not.exist');
  });

  it('should display error message when field is required', () => {
    cy.get('button').click();

    cy.get('p[role="alert"]')
      .should('have.length', 4)
      .each(($paragraph) => {
        cy.wrap($paragraph).should('have.text', 'Required');
      });
  });

  it('should display error message when email is invalid', () => {
    cy.get('input').eq(0).type('Jane Doe');
    cy.get('input').eq(1).type('invalid-email');
    cy.get('input').eq(2).type('b_Z6^2c4');
    cy.get('input').eq(3).type('b_Z6^2c4');

    cy.get('button').click();

    cy.get('p[role="alert"]').should('have.text', 'This is not a valid email');
  });

  it('should display error message when password is too short', () => {
    cy.get('input').eq(0).type('Jane Doe');
    cy.get('input').eq(1).type('jane.doe@example.com');
    cy.get('input').eq(2).type('b_Z6^2c');
    cy.get('input').eq(3).type('b_Z6^2c');

    cy.get('button').click();

    cy.get('p[role="alert"]')
      .should('have.length', 2)
      .each(($paragraph) => {
        cy.wrap($paragraph).should('have.text', 'Password must be at least 8 characters long');
      });
  });

  it('should display error message when passwords do not match', () => {
    cy.get('input').eq(0).type('Jane Doe');
    cy.get('input').eq(1).type('jane.doe@example.com');
    cy.get('input').eq(2).type('b_Z6^2cJH');
    cy.get('input').eq(3).type('b_Z6^2cH$k;b');

    cy.get('button').click();

    cy.get('p[role="alert"]').should('have.text', 'Passwords do not match');
  });

  it('should display error message when name exceeds 50 characters', () => {
    cy.get('input').eq(0).type('Jane Doe'.repeat(7));
    cy.get('input').eq(1).type('jane.doe@example.com');
    cy.get('input').eq(2).type('b_Z6^2c4');
    cy.get('input').eq(3).type('b_Z6^2c4');

    cy.get('button').click();

    cy.get('p[role="alert"]').should('have.text', 'Name must be at most 50 characters long');
  });

  it('should display error message when field is cleared after typing', () => {
    cy.get('input').eq(0).type('J').clear();
    cy.get('input').eq(1).type('j').clear();
    cy.get('input').eq(2).type('b').clear();
    cy.get('input').eq(3).type('b').clear();

    cy.get('button').click();

    cy.get('p[role="alert"]')
      .should('have.length', 4)
      .each(($paragraph, index) => {
        if (index < 2) {
          cy.wrap($paragraph).should('have.text', 'This field has to be filled');
        } else {
          cy.wrap($paragraph).should('have.text', 'Password must be at least 8 characters long');
        }
      });
  });
});
