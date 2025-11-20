class MailProvider {
  async sendEmail({ to, subject, text }) {
    throw new Error('sendEmail must be implemented');
  }
}

const sendgrid = {
  async send({ to, subject, text }) {
    console.log('[sendgrid] Email envoyé à', to, 'Sujet:', subject);
    console.log(text);
  },
};

class SendGridProvider extends MailProvider {
  async sendEmail({ to, subject, text }) {
    return sendgrid.send({ to, subject, text });
  }
}

class FakeMailProvider extends MailProvider {
  constructor() {
    super();
    this.sent = [];
  }

  async sendEmail(payload) {
    this.sent.push(payload);
  }
}

class EmailService {
  constructor(mailProvider) {
    this.mailProvider = mailProvider; // dépendance inversée
  }

  async sendWelcomeEmail(user) {
    const subject = 'Bienvenue sur notre plateforme';
    const text = `Bonjour ${user.firstName},

Merci pour votre inscription.

À bientôt !`;

    await this.mailProvider.sendEmail({
      to: user.email,
      subject,
      text,
    });
  }
}

const prodService = new EmailService(new SendGridProvider());

prodService.sendWelcomeEmail({
  firstName: 'Kenan',
  email: 'kenan@example.com',
});

(async () => {
  const fake = new FakeMailProvider();
  const testService = new EmailService(fake);

  await testService.sendWelcomeEmail({
    firstName: 'TestUser',
    email: 'test@example.com',
  });

  console.log('Emails envoyés (fake) :', fake.sent);
})();
