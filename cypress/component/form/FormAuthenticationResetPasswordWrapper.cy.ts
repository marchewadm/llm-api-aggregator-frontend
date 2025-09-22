import FormAuthenticationResetPasswordWrapper from '@/components/custom/form/FormAuthenticationResetPasswordWrapper.vue';

describe('<FormAuthenticationResetPasswordWrapper />', () => {
  it('should render the reset password wrapper correctly', () => {
    cy.mount(FormAuthenticationResetPasswordWrapper);

    cy.get('h2').should('have.text', 'Reset your password');

    cy.get('p').first().should('have.text', 'We will send you an email with instructions');
    cy.get('p').last().should('have.text', "I've changed my mind, ");

    cy.get('form').should('exist');

    cy.get('button').should('have.length', 2);
    cy.get('button').last().should('have.text', 'take me back!');
  });
});
