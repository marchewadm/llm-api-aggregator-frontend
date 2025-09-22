import IconApiProvider from '@/components/custom/icon/IconApiProvider.vue';
import { setActivePinia, createPinia, defineStore } from 'pinia';

describe('<IconApiProvider />', () => {
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

  it('renders the correct icon with the default size', () => {
    cy.mount(IconApiProvider, {
      props: {
        apiProviderId: 1
      }
    });

    cy.get('svg').should('have.class', 'w-5 h-5');
  });

  it('renders the correct icon with the large size', () => {
    cy.mount(IconApiProvider, {
      props: {
        apiProviderId: 1,
        size: 'lg'
      }
    });

    cy.get('svg').should('have.class', 'w-6 h-6');
  });

  it('renders the correct icon with the small size', () => {
    cy.mount(IconApiProvider, {
      props: {
        apiProviderId: 1,
        size: 'sm'
      }
    });

    cy.get('svg').should('have.class', 'w-4 h-4');
  });
});
