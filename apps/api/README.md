```bash
query {
  getUsers {
    id
    email
    payments {
      id
      amount
    }
  }
}
```

```bash
mutation {
  CreatePayment(createPaymentDto: { amount: 120000, userId: "cb4ab319-00c6-4026-b18b-04f3013008fb"  }) {
    id
    amount
  }
}
```

```bash
mutation {
  CreateUser (createUserDto: {email: "ddd@dd.com", password: "abcd1234", username: "ddd", isSubscribed: true}) {
    id
    username
  }
}
```
