import ButtonColorMode from '@/components/custom/button/ButtonColorMode.vue';

describe('<ButtonColorMode />', () => {
  beforeEach(() => {
    cy.mount(ButtonColorMode);
  });

  it('should render button', () => {
    cy.get('button').should('exist');
  });

  it('should change color mode when clicked', () => {
    cy.get('html')
      .invoke('attr', 'class')
      .then((initialMode) => {
        cy.log(`Initial color mode: ${initialMode}`);

        cy.get('button').click();

        cy.get('html')
          .invoke('attr', 'class')
          .should((newMode) => {
            expect(newMode).to.not.eq(initialMode);
          });
      });
  });
});
