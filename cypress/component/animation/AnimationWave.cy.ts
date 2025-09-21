import AnimationWave from '@/components/custom/animation/AnimationWave.vue';

describe('<AnimationWave />', () => {
  beforeEach(() => {
    cy.mount(AnimationWave);
  });

  it('renders the SVG element', () => {
    cy.get('svg').should('exist');
  });

  it('renders the correct number of paths', () => {
    cy.get('svg path').should('have.length', 3);
  });

  it('applies the correct classes to the first path', () => {
    cy.get('svg path')
      .eq(0)
      .should('have.class', 'shape-fill-base shape-fill-1 shape-fill-slow fill-primary');
  });

  it('applies the correct classes to the second path', () => {
    cy.get('svg path')
      .eq(1)
      .should('have.class', 'shape-fill-base shape-fill-2 shape-fill-normal fill-primary');
  });

  it('applies the correct classes to the third path', () => {
    cy.get('svg path')
      .eq(2)
      .should('have.class', 'shape-fill-base shape-fill-3 shape-fill-slower fill-primary');
  });
});
