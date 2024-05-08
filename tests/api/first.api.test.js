import { test, expect } from "@playwright/test";

test.describe.parallel("API testing", () => {
  const baseURL = "https://reqres.in/api";

  test("GET / Return List Of All Users / Assert Status is 200", async  ({ request}) => {
    const response = await request.get(`${baseURL}/users`);
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.page).toBe(1);
    expect(responseBody.per_page).toBe(6);
    expect(responseBody.total).toBe(12);
    expect(responseBody.total_pages).toBe(2);
  });

  test("GET / Return First User Details / Server Status Is 200", async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(1);
    expect(responseBody.data.email).toContain("george.bluth@reqres.in");
    expect(responseBody.data.first_name).toContain("George");
    expect(responseBody.data.last_name).toContain("Bluth");
    console.log(responseBody);
  });

  test("GET / Not Existing Endpoint / Server Status Is 404", async ({ request }) => {
    const response = await request.get(
      `${baseURL}/users/non-existing-endpoint`,
    );
    expect(response.status()).toBe(404);
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

  test("POST Request - Login With Missing Password Unsuccessfull Status Is 400", async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: "eve.holt@reqres.in",
        error: "Missing password",
    }
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toContain("Missing password");
    console.log(responseBody);
  });

  test("POST REQUEST - Logitn With Missing Email Unsuccessfull Status Is 400", async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        password: "cityslicka",
        error: "Missing email or username",
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toContain("Missing email or username");
    expect(responseBody.error).toContain("Missing email or username");
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
    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe("paulina");
    expect(responseBody.job).toBe("test automation");
    expect(responseBody.updatedAt).toBeTruthy;
    console.log(responseBody);
  });

  test("PATCH - Partially Updated Existing User's Name Status Is 200", async ({ request }) => {     
    const patch = await request.patch(`${baseURL}/users/2`,{ 
    data: {
        "first_name": "paulina",
      }
    });
    const responseBody = JSON.parse(await patch.text());
    expect(patch.status()).toBe(200);
    console.log(responseBody);
    expect(responseBody.updatedAt).toBeTruthy;

  });

  });
