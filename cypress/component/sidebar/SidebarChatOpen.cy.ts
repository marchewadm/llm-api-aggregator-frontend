import router from '@/router';
import SidebarChatOpen from '@/components/custom/sidebar/SidebarChatOpen.vue';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';

describe('<SidebarChatOpen />', () => {
  beforeEach(() => {
    cy.mountWithPinia(SidebarChatOpen, {
      global: {
        plugins: [router]
      }
    });

    const chatSidebarStore = useChatSidebarStore();
    const { toggleChatSidebar } = chatSidebarStore;
    toggleChatSidebar();
  });

  it('should render new chat button with icon', () => {
    cy.get('button span')
      .should('exist')
      .should('have.text', 'New chat')
      .get('button svg')
      .should('exist');
  });

  it('should display chat room list when rooms exist', () => {
    const chatStore = useChatStore();
    const { chatRooms } = storeToRefs(chatStore);
    chatRooms.value = [
      {
        roomUuid: '5701690a-4e49-4ac2-b349-b8d22586a294',
        lastMessage: 'Hello world!',
        apiProviderId: 1
      }
    ];

    cy.get('a').should('exist').should('have.length', 1).should('have.text', 'Hello world!');
  });

  it('should display empty state message when no chat rooms exist', () => {
    cy.get('p')
      .invoke('text')
      .then((text) => {
        const strippedText = text.trim();
        expect(strippedText).to.equal('No chats yet.');
      });
  });
});
