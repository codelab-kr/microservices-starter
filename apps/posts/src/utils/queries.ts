import gql from 'graphql-tag';

export const createPostMutation = gql`
  mutation {
    createPost(
      createPostData: { title: "title", content: "content", userId: 1 }
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

export const getPostsQuery = gql`
  query {
    getPosts {
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
