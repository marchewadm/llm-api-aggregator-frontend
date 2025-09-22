import DescriptionParagraph from '@/components/custom/description/DescriptionParagraph.vue';

describe('<DescriptionParagraph />', () => {
  beforeEach(() => {
    cy.mount(DescriptionParagraph, {
      slots: {
        default: 'Hello world!'
      }
    });
  });

  it('renders the paragraph element', () => {
    cy.get('p').should('exist');
  });

  it('renders the correct text', () => {
    cy.get('p').should('have.text', 'Hello, World!');
  });

  it('applies the correct default text size class', () => {
    cy.get('p').should('have.class', 'text-base');
  });

  it('applies the correct text size class when textSize is xs', () => {
    cy.mount(DescriptionParagraph, {
      props: {
        textSize: 'xs'
      },
      slots: {
        default: 'Hello, World!'
      }
    });

    cy.get('p').should('have.class', 'text-xs');
  });

  it('applies the correct text size class when textSize is sm', () => {
    cy.mount(DescriptionParagraph, {
      props: {
        textSize: 'sm'
      },
      slots: {
        default: 'Hello, World!'
      }
    });

    cy.get('p').should('have.class', 'text-sm');
  });

  it('applies the correct text size class when textSize is base', () => {
    cy.mount(DescriptionParagraph, {
      props: {
        textSize: 'base'
      },
      slots: {
        default: 'Hello, World!'
      }
    });

    cy.get('p').should('have.class', 'text-base');
  });
});
