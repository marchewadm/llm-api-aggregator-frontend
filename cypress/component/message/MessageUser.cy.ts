import MessageUser from '@/components/custom/message/MessageUser.vue';

describe('<MessageUser />', () => {
  beforeEach(() => {
    cy.mount(MessageUser, {
      props: {
        message: 'Hello world!'
      }
    });
  });

  it('renders the user message element', () => {
    cy.get('div.col-start-2').should('exist');
  });

  it('renders the message bubble element', () => {
    cy.get('div.ml-auto').should('exist');
    cy.get('p').should('exist');
    cy.get('p').should('have.text', 'Hello world!');
  });

  it('renders the message image element', () => {
    cy.mount(MessageUser, {
      props: {
        message: 'Hello world!',
        imageUrl: 'https://picsum.photos/seed/picsum/200/200'
      }
    });

    cy.get('img').should('exist');
    cy.get('img').should('have.attr', 'src', 'https://picsum.photos/seed/picsum/200/200');
  });
});
