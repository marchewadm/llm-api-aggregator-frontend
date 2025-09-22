import router from '@/router';
import NavigationChat from '@/components/custom/navigation/NavigationChat.vue';

describe('<NavigationChat />', () => {
  beforeEach(() => {
    cy.mountWithPinia(NavigationChat, { global: { plugins: [router] } });
  });

  it('should render component correctly', () => {
    cy.get('nav').should('exist');
    cy.get('button').should('have.length', 6).should('have.attr', 'data-state');
  });

  it('should display tooltip on each individual button when hovered', () => {
    cy.get('button').each(($button) => {
      cy.wrap($button).should('have.attr', 'data-state', 'closed');
      cy.wrap($button).realHover();
      cy.wrap($button).should('have.attr', 'data-state', 'delayed-open');
      cy.wait(300);
    });
  });

  it('should display tooltip on each individual button when focused', () => {
    cy.get('button').each(($button) => {
      cy.wrap($button).should('have.attr', 'data-state', 'closed');
      cy.wrap($button).focus();
      cy.wrap($button).should('have.attr', 'data-state', 'instant-open');
    });
  });

  it('should hide tooltip when ESC key is pressed on focused button', () => {
    cy.get('button').each(($button) => {
      cy.wrap($button).should('have.attr', 'data-state', 'closed');
      cy.wrap($button).focus();
      cy.wrap($button).should('have.attr', 'data-state', 'instant-open');
      cy.wrap($button).realPress('Escape');
      cy.wrap($button).should('have.attr', 'data-state', 'closed');
    });
  });

  it("shoud apply 'bg-secondary' class to first two buttons when clicked", () => {
    cy.get('button').each(($button, index) => {
      if (index < 2) {
        cy.wrap($button).click();
        cy.wrap($button).containsClasses(['bg-secondary']);
      }
    });
  });
});
