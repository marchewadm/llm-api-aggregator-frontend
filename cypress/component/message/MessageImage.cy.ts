import MessageImage from '@/components/custom/message/MessageImage.vue';

describe('<MessageImage />', () => {
  beforeEach(() => {
    cy.mount(MessageImage, {
      props: {
        imageUrl: 'https://picsum.photos/seed/picsum/200/200'
      }
    });
  });

  it('renders the image element', () => {
    cy.get('img').should('exist');
  });

  it('renders the correct image', () => {
    cy.get('img').should('have.attr', 'src', 'https://picsum.photos/seed/picsum/200/200');
  });

  it('applies the correct classes', () => {
    cy.get('img').should(
      'have.class',
      'mb-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 group-hover:opacity-70'
    );
  });
});
