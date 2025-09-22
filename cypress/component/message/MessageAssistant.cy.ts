import VueDOMPurifyHTML from 'vue-dompurify-html';
import MessageAssistant from '@/components/custom/message/MessageAssistant.vue';
import { setActivePinia, createPinia, defineStore } from 'pinia';

describe('<MessageAssistant />', () => {
  const mountMessageAssistant = (message: string, apiProviderId = 1) => {
    cy.mount(MessageAssistant, {
      props: {
        message,
        apiProviderId
      },
      global: {
        plugins: [VueDOMPurifyHTML]
      }
    });
  };

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const mockUseChatStore = defineStore('chat', {
      state: () => ({
        apiProviders: [{ apiProviderId: 1, lowerCaseName: 'openai' }]
      })
    });

    mockUseChatStore();
  });

  it('renders the message content and displays the API provider icon', () => {
    mountMessageAssistant('Hello world!');

    cy.get('.assistant-message').should('exist');
    cy.get('svg').should('exist');
  });

  it('renders a TypeScript code block correctly', () => {
    mountMessageAssistant('```typescript\nconst message = "Hello world!";\n```');

    cy.get('pre code').should('exist');
    cy.get('code span').should('have.length', 2);
  });

  it('renders a table correctly', () => {
    mountMessageAssistant('| Name | Age |\n| ---- | --- |\n| Jane Doe | 20 |');
  });

  it('renders a hyperlink correctly within the message content', () => {
    mountMessageAssistant('Visit [Google](https://www.google.com)');

    cy.get('a').should('have.text', 'Google').should('have.attr', 'href', 'https://www.google.com');
  });

  it('does not render an icon for an unrecognized API provider', () => {
    mountMessageAssistant('Hello world!', 2);

    cy.get('.assistant-message').should('exist');
    cy.get('svg').should('not.exist');
  });

  it('renders bold and italic formatting correctly', () => {
    mountMessageAssistant('**Bold** and *italic* text');

    cy.get('strong').should('have.text', 'Bold');
    cy.get('em').should('have.text', 'italic');
  });

  it('renders inline code formatting correctly', () => {
    mountMessageAssistant('Use `const` instead of `var`');

    cy.get('code').should('have.length', 2);
  });

  it('renders unordered and ordered lists correctly', () => {
    mountMessageAssistant('- Item 1\n- Item 2\n1. First\n2. Second');

    cy.get('ul li').should('have.length', 2);
    cy.get('ol li').should('have.length', 2);
  });
});
