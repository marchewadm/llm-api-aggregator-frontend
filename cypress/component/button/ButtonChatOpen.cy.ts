import router from '@/router';
import ButtonChatOpen from '@/components/custom/button/ButtonChatOpen.vue';
import { setActivePinia, createPinia, defineStore } from 'pinia';

describe('<ButtonChatOpen />', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const mockUseChatStore = defineStore('chat', {
      state: () => ({
        apiProviders: [{ apiProviderId: 1, lowerCaseName: 'openai' }]
      })
    });

    mockUseChatStore();

    cy.mount(ButtonChatOpen, {
      props: {
        chatTitle: 'Hello world!',
        chatRoomUuid: '5701690a-4e49-4ac2-b349-b8d22586a294',
        apiProviderId: 1
      },
      global: {
        plugins: [router]
      }
    });
  });

  it('should render component correctly', () => {
    cy.get('a').should('exist');
    cy.get('span').should('exist').should('have.text', 'Hello world!');
  });
});
