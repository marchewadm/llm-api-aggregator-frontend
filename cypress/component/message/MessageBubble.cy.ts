import MessageBubble from '@/components/custom/message/MessageBubble.vue';

describe('<MessageBubble />', () => {
  beforeEach(() => {
    cy.mount(MessageBubble, {
      props: {
        message: 'Hello world!'
      }
    });
  });

  it('renders the message bubble element', () => {
    cy.get('div.ml-auto').should('exist');
    cy.get('p').should('exist');
  });

  it('renders the correct text', () => {
    cy.get('p').should('have.text', 'Hello world!');
  });

  it('applies the correct classes', () => {
    cy.get('div.ml-auto').should(
      'have.class',
      'ml-auto w-fit max-w-full bg-secondary py-2 px-4 rounded-2xl break-words'
    );
    cy.get('p').should('have.class', 'leading-7');
  });
});
