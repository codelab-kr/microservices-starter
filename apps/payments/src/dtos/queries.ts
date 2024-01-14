import gql from 'graphql-tag';

export const createPaymentMutation = gql`
  mutation {
    createPayment(createPaymentData: { amount: 10000, user: User }) {
      id
      amount
      user
    }
  }
`;

export const getPaymentsQuery = gql`
  query {
    getPayments {
      id
      amount
    }
  }
`;
