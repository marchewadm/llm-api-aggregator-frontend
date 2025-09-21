import ButtonChatTextareaAction from '@/components/custom/button/ButtonChatTextareaAction.vue';

describe('<ButtonChatTextareaAction />', () => {
  it('should render button with icon correctly', () => {
    cy.mount(ButtonChatTextareaAction, {
      props: {
        iconName: 'microphone'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
  });
});
