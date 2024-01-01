import gql from 'graphql-tag';

export const createPaymentMutation = gql`
  mutation {
    createPayment(
      createPaymentData: { title: "title", content: "content", userId: 1 }
    ) {
      id
      title
      content
      userId
      settings {
        commentable
        shareable
      }
    }
  }
`;

export const getPaymentsQuery = gql`
  query {
    getPayments {
      id
      title
      content
      userId
      settings {
        commentable
        shareable
      }
    }
  }
`;
