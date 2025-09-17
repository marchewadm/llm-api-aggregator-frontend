import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

// Mounting ButtonIcon as any due to this bug: https://github.com/cypress-io/cypress/issues/26628

describe('<ButtonIcon />', () => {
  it('should render a button containing only an icon', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
  });

  it('should render a button with a default variant', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        variant: 'default'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button')
      .containsClasses(['bg-primary', 'text-primary-foreground', 'shadow', 'hover:bg-primary/90'])
      .should('be.true');
  });

  it('should render a button with a destructive variant', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        variant: 'destructive'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button')
      .containsClasses([
        'bg-destructive',
        'text-destructive-foreground',
        'shadow-sm',
        'hover:bg-destructive/90'
      ])
      .should('be.true');
  });

  it('should render a button with an outline variant', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        variant: 'outline'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button')
      .containsClasses([
        'border',
        'border-input',
        'bg-background',
        'shadow-sm',
        'hover:bg-accent',
        'hover:text-accent-foreground'
      ])
      .should('be.true');
  });

  it('should render a button with a secondary variant', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        variant: 'secondary'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button')
      .containsClasses([
        'bg-secondary',
        'text-secondary-foreground',
        'shadow-sm',
        'hover:bg-secondary/80'
      ])
      .should('be.true');
  });

  it('should render a button with a ghost variant', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        variant: 'ghost'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button')
      .containsClasses(['hover:bg-accent', 'hover:text-accent-foreground'])
      .should('be.true');
  });

  it('should render a button with a link variant', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        variant: 'link'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button')
      .containsClasses(['text-primary', 'underline-offset-4', 'hover:underline'])
      .should('be.true');
  });

  it('should render a button with a default size', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        size: 'default'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button').containsClasses(['h-9', 'px-4', 'py-2']).should('be.true');
  });

  it('should render a button with a xs size', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        size: 'xs'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button').containsClasses(['h-7', 'rounded', 'px-2']).should('be.true');
  });

  it('should render a button with a sm size', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        size: 'sm'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button').containsClasses(['h-8', 'rounded-md', 'px-3', 'text-xs']).should('be.true');
  });

  it('should render a button with a lg size', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        size: 'lg'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button').containsClasses(['h-10', 'rounded-md', 'px-8']).should('be.true');
  });

  it('should render a button with an icon size', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        size: 'icon'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('button').containsClasses(['h-9', 'w-9']).should('be.true');
  });

  it('should render a button with an icon and left-aligned text', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        size: 'sm'
      },
      slots: {
        optionalTextOnLeft: '<span>Add</span>'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('span').should('have.text', 'Add');
  });

  it('should render a button with an icon and right-aligned text', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'minus',
        size: 'sm'
      },
      slots: {
        optionalTextOnRight: '<span>Remove</span>'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').should('exist');
    cy.get('span').should('have.text', 'Remove');
  });

  it('should render a button with a custom icon class', () => {
    cy.mount(ButtonIcon as any, {
      props: {
        iconName: 'plus',
        iconClass: 'w-10 h-10'
      }
    });

    cy.get('button').should('exist');
    cy.get('svg').containsClasses(['w-10', 'h-10']).should('be.true');
  });
});
