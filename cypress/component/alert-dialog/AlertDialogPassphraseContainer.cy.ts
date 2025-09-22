import AlertDialogPassphraseContainer from '@/components/custom/alert-dialog/AlertDialogPassphraseContainer.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useAlertDialogStore } from '@/stores/alertDialogStore';

describe('<AlertDialogPassphraseCreate />', () => {
  beforeEach(() => {
    const alertDialogStore = useAlertDialogStore();
    const { isPassphraseAlertDialog } = storeToRefs(alertDialogStore);

    isPassphraseAlertDialog.value = true;

    cy.mountWithPinia(AlertDialogPassphraseContainer);
  });

  it('should render passphrase creation dialog', () => {
    cy.get('div[role="alertdialog"]').should('exist');
  });

  it('should display readonly input field and generate button', () => {
    cy.get('input')
      .should('exist')
      .and('have.attr', 'readonly')
      .get('button')
      .contains('Generate passphrase')
      .should('exist');
  });

  it('should toggle input field type between password and text when eye icon is clicked', () => {
    cy.get('input')
      .should('have.attr', 'type', 'password')
      .get('button:has(svg)')
      .click()
      .get('input')
      .should('have.attr', 'type', 'text')
      .get('button:has(svg)')
      .click()
      .get('input')
      .should('have.attr', 'type', 'password');
  });

  it('should close dialog when ESC key is pressed', () => {
    cy.get('div[role="alertdialog"]').realPress('Escape');
    cy.wait(250);
    cy.get('div[role="alertdialog"]').should('not.exist');
  });

  it('should close dialog when clicked outside', () => {
    cy.get('body').realClick({ x: 0, y: 0 });
    cy.wait(250);
    cy.get('div[role="alertdialog"]').should('not.exist');
  });

  it('should close dialog when cancel button is clicked', () => {
    cy.get('button').contains('Cancel').click();
    cy.wait(250);
    cy.get('div[role="alertdialog"]').should('not.exist');
  });
});

describe('<AlertDialogPassphraseValidate />', () => {
  beforeEach(() => {
    const userStore = useUserStore();
    const alertDialogStore = useAlertDialogStore();
    const { isPassphrase } = storeToRefs(userStore);
    const { isPassphraseAlertDialog } = storeToRefs(alertDialogStore);

    isPassphrase.value = true;
    isPassphraseAlertDialog.value = true;

    cy.mountWithPinia(AlertDialogPassphraseContainer);
  });

  it('should render passphrase validation dialog', () => {
    cy.get('div[role="alertdialog"]').should('exist');
  });

  it('should display input field and continue button', () => {
    cy.get('input')
      .should('exist')
      .and('not.have.attr', 'readonly')
      .get('button')
      .contains('Continue')
      .should('exist');
  });

  it('should allow typing in the passphrase input field', () => {
    cy.get('input').type('test123').should('have.value', 'test123');
  });

  it('should display reset button for forgotten passphrase', () => {
    cy.get('button').contains('Reset my passphrase').should('exist');
  });

  it('should switch to passphrase creation dialog when reset button is clicked', () => {
    cy.get('button').contains('Reset my passphrase').click();
    cy.wait(250);
    cy.get('button')
      .contains('Reset my passphrase')
      .should('not.exist')
      .get('div[role="alertdialog"]')
      .should('exist');
  });

  it('should close dialog when ESC key is pressed', () => {
    cy.get('div[role="alertdialog"]').realPress('Escape');
    cy.wait(250);
    cy.get('div[role="alertdialog"]').should('not.exist');
  });

  it('should close dialog when clicked outside', () => {
    cy.get('body').realClick({ x: 0, y: 0 });
    cy.wait(250);
    cy.get('div[role="alertdialog"]').should('not.exist');
  });

  it('should close dialog when cancel button is clicked', () => {
    cy.get('button').contains('Cancel').click();
    cy.wait(250);
    cy.get('div[role="alertdialog"]').should('not.exist');
  });
});
