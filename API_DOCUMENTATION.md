# MedBridge API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# Authentication

## Register

POST

```
/auth/register
```

Body

```json
{
  "name": "Himanshu Mali",
  "email": "himanshu@gmail.com",
  "password": "Password123",
  "phone": "9876543210",
  "address": "Ahmedabad",
  "role": "DONOR"
}
```

---

## Login

POST

```
/auth/login
```

Body

```json
{
  "email": "himanshu@gmail.com",
  "password": "Password123"
}
```

---

## Current User

GET

```
/auth/me
```

Authorization

```
Bearer Token
```

---

# Medicine APIs

## Add Medicine

POST

```
/medicine/add
```

Authorization

```
Bearer Token
```

---

## My Medicines

GET

```
/medicine/my
```

---

## All Medicines

GET

```
/medicine/all
```

---

## Search Medicines

GET

```
/medicine/search
```

Example

```
/medicine/search?name=Paracetamol
```

---

## Low Stock Medicines

GET

```
/medicine/low-stock
```

---

## Update Medicine

PUT

```
/medicine/update/:id
```

---

## Delete Medicine

DELETE

```
/medicine/delete/:id
```

---

# Donation APIs

## Create Donation

POST

```
/donation/create
```

---

## My Donations

GET

```
/donation/my
```

---

## Received Donations

GET

```
/donation/received
```

---

## Update Donation Status

PUT

```
/donation/status/:id
```

Body

```json
{
    "status":"ACCEPTED"
}
```

---

## Delete Donation

DELETE

```
/donation/delete/:id
```

---

# Dashboard APIs

GET

```
/dashboard/stats
```

---

# Authentication Header

```
Authorization:
Bearer YOUR_JWT_TOKEN
```

---

# HTTP Status Codes

| Code | Meaning |
|------|----------|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|500|Internal Server Error|

---

# Developed By

Himanshu Mali
Nikhil Suthar