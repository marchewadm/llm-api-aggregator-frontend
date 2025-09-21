import TextareaChat from '@/components/custom/textarea/TextareaChat.vue';

describe('<TextareaChat />', () => {
  it('should render the component correctly', () => {
    cy.mount(TextareaChat);
    cy.get('textarea')
      .should('exist')
      .should('have.attr', 'placeholder', 'Type your message here...')
      .get('label')
      .should('exist')
      .should('have.attr', 'for', 'file-input')
      .get('svg')
      .should('exist')
      .get('input')
      .should('exist')
      .should('have.attr', 'id', 'file-input')
      .should('have.attr', 'type', 'file')
      .should('have.attr', 'class', 'hidden')
      .should('have.attr', 'accept', 'image/*');
  });

  it('should render the component without additional buttons on smaller screen', () => {
    cy.viewport(849, 500).mount(TextareaChat);
    cy.get('textarea')
      .should('exist')
      .get('button')
      .should('have.length', 2)
      .should('not.be.visible');
  });

  it('should render the component with additional buttons on larger screen', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('textarea').should('exist').get('button').should('have.length', 2).should('be.visible');
  });

  it('should focus on the textarea element when component is mounted', () => {
    cy.mount(TextareaChat);
    cy.get('textarea').should('have.focus');
  });

  it('should update the textarea value when typing', () => {
    cy.mount(TextareaChat);
    cy.get('textarea').type('Test message.').should('have.value', 'Test message.');
  });

  it('should clear the textarea value when clicking on the send button', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('textarea').type('Test message.').should('have.value', 'Test message.');
    cy.get('button').eq(0).click();
    cy.get('textarea').should('have.value', '');
  });

  it('should clear the textarea value when pressing the Enter key', () => {
    cy.mount(TextareaChat);
    cy.get('textarea').type('Test message.').should('have.value', 'Test message.');
    cy.get('textarea').realPress('Enter');
    cy.get('textarea').should('have.value', '');
  });

  it('should display tooltip when hovering over the file input', () => {
    cy.mount(TextareaChat);
    cy.get('label').should('have.attr', 'data-state', 'closed');
    cy.get('label').realHover();
    cy.get('label').should('have.attr', 'data-state', 'delayed-open');
  });

  it('should display tooltip when focusing on the file input', () => {
    cy.mount(TextareaChat);
    cy.get('label').should('have.attr', 'data-state', 'closed');
    cy.get('label').focus();
    cy.get('label').should('have.attr', 'data-state', 'instant-open');
  });

  it('should hide tooltip when ESC key is pressed on focused file input', () => {
    cy.mount(TextareaChat);
    cy.get('label').should('have.attr', 'data-state', 'closed');
    cy.get('label').focus();
    cy.get('label').should('have.attr', 'data-state', 'instant-open');
    cy.get('label').realPress('Escape');
    cy.get('label').should('have.attr', 'data-state', 'closed');
  });

  it('should display tooltip when hovering over the send button', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('button').eq(0).should('have.attr', 'data-state', 'closed');
    cy.get('button').eq(0).realHover();
    cy.get('button').eq(0).should('have.attr', 'data-state', 'delayed-open');
  });

  it('should display tooltip when focusing on the send button', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('button').eq(0).should('have.attr', 'data-state', 'closed');
    cy.get('button').eq(0).focus();
    cy.get('button').eq(0).should('have.attr', 'data-state', 'instant-open');
  });

  it('should hide tooltip when ESC key is pressed on focused send button', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('button').eq(0).should('have.attr', 'data-state', 'closed');
    cy.get('button').eq(0).focus();
    cy.get('button').eq(0).should('have.attr', 'data-state', 'instant-open');
    cy.get('button').eq(0).realPress('Escape');
    cy.get('button').eq(0).should('have.attr', 'data-state', 'closed');
  });

  it('should display tooltip when hovering over the microphone button', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('button').eq(1).should('have.attr', 'data-state', 'closed');
    cy.get('button').eq(1).realHover();
    cy.get('button').eq(1).should('have.attr', 'data-state', 'delayed-open');
  });

  it('should display tooltip when focusing on the microphone button', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('button').eq(1).should('have.attr', 'data-state', 'closed');
    cy.get('button').eq(1).focus();
    cy.get('button').eq(1).should('have.attr', 'data-state', 'instant-open');
  });

  it('should hide tooltip when ESC key is pressed on focused microphone button', () => {
    cy.viewport(850, 500).mount(TextareaChat);
    cy.get('button').eq(1).should('have.attr', 'data-state', 'closed');
    cy.get('button').eq(1).focus();
    cy.get('button').eq(1).should('have.attr', 'data-state', 'instant-open');
    cy.get('button').eq(1).realPress('Escape');
    cy.get('button').eq(1).should('have.attr', 'data-state', 'closed');
  });

  it('should upload image and display it as the image preview', () => {
    cy.mount(TextareaChat);

    cy.get('input').selectFile('cypress/fixtures/test.jpg', { force: true });

    cy.get('label')
      .should('not.exist')
      .get('img')
      .should('exist')
      .get('div.m-4.relative button')
      .should('exist')
      .get('div.m-4.relative button svg')
      .should('exist');
  });

  it('should remove image preview when clicking on the remove button', () => {
    cy.mount(TextareaChat);

    cy.get('input').selectFile('cypress/fixtures/test.jpg', { force: true });

    cy.get('div.m-4.relative button').click().get('img').should('not.exist');
  });

  it('should display tooltip when hovering over the remove button in the image preview', () => {
    cy.mount(TextareaChat);

    cy.get('input').selectFile('cypress/fixtures/test.jpg', { force: true });

    cy.get('div.m-4.relative button').should('have.attr', 'data-state', 'closed');
    cy.get('div.m-4.relative button').realHover();
    cy.get('div.m-4.relative button').should('have.attr', 'data-state', 'delayed-open');
  });

  it('should display tooltip when focusing on the remove button in the image preview', () => {
    cy.mount(TextareaChat);

    cy.get('input').selectFile('cypress/fixtures/test.jpg', { force: true });

    cy.get('div.m-4.relative button').should('have.attr', 'data-state', 'closed');
    cy.get('div.m-4.relative button').focus();
    cy.get('div.m-4.relative button').should('have.attr', 'data-state', 'instant-open');
  });

  it('should hide tooltip when ESC key is pressed on focused remove button in the image preview', () => {
    cy.mount(TextareaChat);

    cy.get('input').selectFile('cypress/fixtures/test.jpg', { force: true });

    cy.get('div.m-4.relative button').should('have.attr', 'data-state', 'closed');
    cy.get('div.m-4.relative button').focus();
    cy.get('div.m-4.relative button').should('have.attr', 'data-state', 'instant-open');
    cy.get('div.m-4.relative button').realPress('Escape');
    cy.get('div.m-4.relative button').should('have.attr', 'data-state', 'closed');
  });
});
