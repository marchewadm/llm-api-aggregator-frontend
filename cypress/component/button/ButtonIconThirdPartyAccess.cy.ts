import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';

describe('<ButtonThirdPartyAccess />', () => {
  it('should render the component correctly based on props', () => {
    cy.mount(ButtonThirdPartyAccess, {
      props: {
        iconName: 'brand-github',
        text: 'Sign in with GitHub'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('span').contains('Sign in with GitHub');
  });
});
