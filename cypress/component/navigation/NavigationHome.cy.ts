import router from '@/router';
import NavigationHome from '@/components/custom/navigation/NavigationHome.vue';

describe('<NavigationHome />', () => {
  beforeEach(() => {
    cy.mountWithPinia(NavigationHome, {
      global: {
        plugins: [router]
      }
    });
  });

  it('should render component correctly', () => {
    cy.get('nav').should('exist');

    // ! Due to the way how HTML is formatted in the component, we need to strip the text, so we can compare it correctly.
    cy.get('a')
      .invoke('text')
      .then((text) => {
        const strippedText = text.trim();
        expect(strippedText).to.equal('LLM Aggregator');
      });

    cy.get('button').should('have.length', 2);
  });

  it('should toggle authentication form button text', () => {
    cy.get('button').contains('Sign up').should('exist').click();
    cy.get('button').contains('Sign in').should('exist').click();
    cy.get('button').contains('Sign up').should('exist');
  });
});
