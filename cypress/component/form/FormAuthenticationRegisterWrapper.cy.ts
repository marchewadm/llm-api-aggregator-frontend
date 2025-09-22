import FormAuthenticationRegisterWrapper from '@/components/custom/form/FormAuthenticationRegisterWrapper.vue';

describe('<FormAuthenticationRegisterWrapper />', () => {
  it('should render the register wrapper correctly', () => {
    cy.mount(FormAuthenticationRegisterWrapper);

    cy.get('h2').should('have.text', 'Create an account');

    cy.get('p').first().should('have.text', 'Fill out the form below to create your account');
    cy.get('p').last().should('have.text', 'Already have an account? ');

    cy.get('form').should('exist');

    cy.get('span').contains('Or continue with').should('exist');

    cy.get('button').should('have.length', 4);

    cy.get('button:has(svg)').should('have.length', 2);
    cy.get('button:has(svg)').first().should('have.text', 'Sign up with Google');
    cy.get('button:has(svg)').last().should('have.text', 'Sign up with GitHub');

    cy.get('button').last().should('have.text', 'Sign in');
  });
});
