import FormAuthenticationLoginWrapper from '@/components/custom/form/FormAuthenticationLoginWrapper.vue';

describe('<FormAuthenticationLoginWrapper />', () => {
  it('should render the login wrapper correctly', () => {
    cy.mount(FormAuthenticationLoginWrapper);

    cy.get('h2').should('have.text', 'Welcome back');

    cy.get('p').first().should('have.text', 'Enter your credentials below to log in');
    cy.get('p').last().should('have.text', "Don't have an account? ");

    cy.get('form').should('exist');

    cy.get('span').contains('Or continue with').should('exist');

    cy.get('button').should('have.length', 5);

    cy.get('button:has(svg)').should('have.length', 2);
    cy.get('button:has(svg)').first().should('have.text', 'Sign in with Google');
    cy.get('button:has(svg)').last().should('have.text', 'Sign in with GitHub');

    cy.get('button[data-state="closed"]')
      .invoke('text')
      .then((text) => {
        const strippedText = text.trim();
        expect(strippedText).to.equal('Forgot your password?');
      });

    cy.get('button').last().should('have.text', 'Sign up');
  });
});
