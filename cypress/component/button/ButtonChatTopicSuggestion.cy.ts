import ButtonChatTopicSuggestion from '@/components/custom/button/ButtonChatTopicSuggestion.vue';

describe('<ButtonChatTopicSuggestion />', () => {
  const mountButtonChatTopicSuggestion = () => {
    cy.mount(ButtonChatTopicSuggestion, {
      props: {
        topicTitle: 'Recommend me a book',
        topicDescription: 'so I can read it during the weekend'
      }
    });
  };

  it('should render component correctly', () => {
    mountButtonChatTopicSuggestion();

    cy.get('button').should('exist');
    cy.get('span').should('have.length', 2);
    cy.get('span').contains('Recommend me a book');
    cy.get('span').contains('so I can read it during the weekend');
  });

  it('should apply correct styles based on small screen size', () => {
    mountButtonChatTopicSuggestion();

    cy.get('button').containsClasses(['text-wrap', 'text-left']).should('be.true');
  });

  // Large screen size is considered as (min-width: 1800px)
  it('should apply correct styles based on large screen size', () => {
    cy.viewport(1920, 1080);
    mountButtonChatTopicSuggestion();

    cy.get('button').containsClasses(['text-wrap', 'text-left']).should('be.false');
  });
});
