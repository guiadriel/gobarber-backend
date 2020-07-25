interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: 'guilherme@ses.com.br',
      name: 'Guilherme SES',
    },
  },
} as IMailConfig;
