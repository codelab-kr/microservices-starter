import gql from 'graphql-tag';

export const createPaymentMutation = gql`
  mutation {
    createPayment(createPaymentData: { amount: 10000 }) {
      id
      amount
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
