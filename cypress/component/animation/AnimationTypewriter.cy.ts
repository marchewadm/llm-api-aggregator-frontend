import AnimationTypewriter from '@/components/custom/animation/AnimationTypewriter.vue';
import typewriterData from '@/assets/typewriterData.json';

describe('<AnimationTypewriter />', () => {
  beforeEach(() => {
    cy.mount(AnimationTypewriter);
    cy.viewport(1920, 1080);
  });

  it('renders the component', () => {
    cy.get('h1').should('exist');
    cy.get('p').should('exist');
  });

  it('applies the correct initial classes', () => {
    cy.get('h1').should('have.class', 'text-3xl font-semibold tracking-tighter');
    cy.get('p').should('have.class', 'h-20 text-2xl tracking-tight');
  });

  it('displays the initial text', () => {
    cy.get('h1').should('contain.text', '');
    cy.get('p').should('contain.text', '');
  });

  it('updates the text and applies fade-in classes', () => {
    cy.get('h1').should('not.have.class', 'fade-out-base fade-out-slower');
    cy.get('h1').should('have.class', 'fade-in-base fade-in-faster');
    cy.get('p').should('not.have.class', 'fade-out-base fade-out-faster');
    cy.get('p').should('have.class', 'fade-in-base fade-in-slower');
  });

  it('displays one of the typewriter texts', () => {
    const expectedTitles = typewriterData.title;
    const expectedDescriptions = typewriterData.text;

    cy.get('h1')
      .invoke('text')
      .should((text) => {
        expect(expectedTitles).to.include(text);
      });

    cy.get('p')
      .invoke('text')
      .should((text) => {
        const descriptionWithoutCursor = text.replace('|', '');
        expect(expectedDescriptions).to.include(descriptionWithoutCursor);
      });
  });

  it('applies the fade-out classes after delay', () => {
    cy.wait(3500 + 700);
    cy.get('h1').should('have.class', 'fade-out-base fade-out-slower');
    cy.get('p').should('have.class', 'fade-out-base fade-out-faster');
  });
});
