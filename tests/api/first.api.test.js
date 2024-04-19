import { test, expect } from '@playwright/test'

test.describe.parallel('API testing', () => {
  const apiUrl = 'https://reqres.in/api'

  test('Simple API Test - assert Response Status', async ({ request }) => {
    const response = await request.get(`${apiUrl}/users/1`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
  })

  test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${apiUrl}/users/non-existing-endpoint`)
    expect(response.status()).toBe(404)
     })

  test('GET Request - Get User Detail', async ({ request }) => {
     const response = await request.get(`${apiUrl}/users/1`)
     const responseBody = JSON.parse(await response.text())

     expect(response.status()).toBe(200)
     console.log(responseBody)

     expect(responseBody.data.id).toBe(1)
     expect(responseBody.data.first_name).toContain('George')
     expect(responseBody.data.last_name).toContain('Bluth')
     expect(responseBody.email).toBeTruthy()
    })

  test('POST Request - Post User Detail', async ({request}) => { 
    const response = await request.post(`${apiUrl}/users`, {
    data : {
      id: 1000,
    },
})
    const responseBody = JSON.parse(await response.text())

    expect(responseBody.id).toBe(1000);
    expect(responseBody.id).toBeTruthy();
    console.log(responseBody)
})

  test('POST Request - Login', async ({ request }) => {
      const response = await request.post(`${apiUrl}/login`, {
        data : {
            email: "eve.holt@reqres.in",
            password: "cityslicka",  
        },
      })
      const responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(200);
      expect(responseBody.token).toBeTruthy();
      console.log(responseBody)
  })

  test('POST Request - Login unsuccessfull', async ({ request }) => {
    const response = await request.post(`${apiUrl}/login`, {
      data: {
        email: "peter@klaven",
        error: "Missing password"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400);
    expect(responseBody.error).toContain('Missing password');
    console.log(responseBody)
})
})
