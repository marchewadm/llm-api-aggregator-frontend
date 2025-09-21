import MessageUserPending from '@/components/custom/message/MessageUserPending.vue';

describe('<MessageUserPending />', () => {
  beforeEach(() => {
    cy.mount(MessageUserPending, {
      props: {
        pendingMessage: "Hello, I'm a pending message"
      }
    });
  });

  it('renders the pending message', () => {
    cy.get('p').should('have.text', "Hello, I'm a pending message");
  });

  it('renders the spinner', () => {
    cy.get('svg').should('exist');
  });

  it('renders the message image element', () => {
    cy.mount(MessageUserPending, {
      props: {
        pendingMessage: "Hello, I'm a pending message",
        pendingImageUrl: 'https://picsum.photos/seed/picsum/200/200'
      }
    });

    cy.get('img').should('exist');
  });
});
