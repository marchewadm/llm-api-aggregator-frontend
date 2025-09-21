import SidebarChatCustomizeModel from '@/components/custom/sidebar/SidebarChatCustomizeModel.vue';
import { storeToRefs } from 'pinia';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';

describe('<SidebarChatCustomizeModel />', () => {
  beforeEach(() => {
    cy.mountWithPinia(SidebarChatCustomizeModel);

    const chatSidebarStore = useChatSidebarStore();
    const { isModelSidebarVisible } = storeToRefs(chatSidebarStore);
    isModelSidebarVisible.value = true;
  });

  it('should render the component correctly', () => {
    cy.get('form')
      .should('exist')
      .get('legend')
      .should('exist')
      .and('have.text', 'Model settings')
      .get('label')
      .should('exist')
      .and('have.length', 5)
      .get('input')
      .should('exist')
      .and('have.length', 3)
      .get('p')
      .should('exist')
      .and('have.length', 6)
      .get('textarea')
      .should('exist')
      .and('have.attr', 'placeholder', 'You can set custom instructions for your model here.');
  });

  it('should have numeric inputs with default placeholder value', () => {
    cy.get('input').each(($input) => {
      expect($input).to.have.attr('placeholder', '0.0');
      expect($input).to.have.attr('type', 'number');
    });
  });

  it('should update the input value when typing', () => {
    cy.get('input').each(($input) => {
      cy.wrap($input).type('1').should('have.value', '1');
    });
  });
});
