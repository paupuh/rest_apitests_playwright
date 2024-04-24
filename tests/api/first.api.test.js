import { test, expect } from "@playwright/test";

test.describe.parallel("API testing", () => {
  const baseURL = "https://reqres.in/api";

  test("GET Assert - Response Status Is 200", async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
  });

  test("GET Assert - Invalid Endpoint Status Is 404", async ({ request }) => {
    const response = await request.get(
      `${baseURL}/users/non-existing-endpoint`,
    );
    expect(response.status()).toBe(404);
  });

  test("GET Request - Get User Details Response Status Is 200", async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    console.log(responseBody);

    expect(responseBody.data.id).toBe(1);
    expect(responseBody.data.first_name).toContain("George");
    expect(responseBody.data.last_name).toContain("Bluth");
  });

  test("POST Request - Post User Detail Status Is 201", async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      data: {
        id: 1000,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(201);
    expect(responseBody.id).toBe(1000);
    expect(responseBody.id).toBeTruthy();
    console.log(responseBody);
  });

  test("POST Request - Login Status Is 200", async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
    console.log(responseBody);
  });

  test("POST Request - Login Unsuccessfull Status Is 400", async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: "peter@klaven",
        error: "Missing password",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toContain("Missing password");
    console.log(responseBody);
  });

  test("PUT - Update Existing's User Name And Job Status Is 200", async ({ request }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      data: {
        "name": "paulina",
        "job": "test automation",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect (response.status()).toBe(200);
    expect(responseBody.name).toBe("paulina");
    expect(responseBody.job).toBe("test automation");
    expect(responseBody.updatedAt).toBeTruthy;
    console.log(responseBody);
  })

});