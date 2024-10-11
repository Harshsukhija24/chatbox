# Twillio Integration

1. **Actual Problem statement**

We’re invoking Twillio send message API from this collection:
https://www.postman.com/twilio/twilio-api/request/dwkejfp/send-an-sms?action=share&source=copy-link&creator=26976298&ctx=documentation

For this invocation we’re using a node axios library

```tsx
axios.post(...).then((res) => {
  console.log(`Got the response ${res.json()}`)
}).catch((err) => {
	console.log(`Failure during invocation: ${JSON.stringify(err)}`)
})

```

Once the service has gone live, we’re seeing mostly healthy response logs but from time to time, we’re seeing this:

```tsx
Failure during invocation: {"ERROR": 63018, "message":  "Rate limit exceeded for Channel"}
```

**What is happening here and how do we fix this? Use chatgpt etc or whatever online tool you want**

/**
 * 
 * they reason behind this that someone is using bot for that to 
 * sol-we can solve this using by making an extra feild that can be so that we can detect bot and not accept that request
 * 
 * if someone is making request continously which can make this error
 * 
 * we can use setinterval for that a person can 
 * 
 *  * 
 */


