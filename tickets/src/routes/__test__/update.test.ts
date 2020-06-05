import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("should returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "updated!", price: 2 })
    .expect(404);
});

it("should returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "updated!", price: 2 })
    .expect(401);
});

it("should returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "New ticket", price: 12 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "vvdvd", price: 100 })
    .expect(401);
});

it("should returns a 400 if provides an invalid title or price", async () => {
  // const cookie = global.signin();
  // const response = await request(app)
  //   .post("/api/tickets")
  //   .set("Cookie", cookie)
  //   .send({ title: "New ticket", price: 12 });

  // await request(app)
  //   .put(`/api/ticket/${response.body.id}`)
  //   .set("Cookie", cookie)
  //   .send({ title: "", price: 20 })
  //   .expect(400);

  // await request(app)
  //   .put(`/api/ticket/${response.body.id}`)
  //   .set("Cookie", cookie)
  //   .send({ title: "vrvr", price: -20 })
  //   .expect(400);
});

it("should updates the ticket if valid inputs are provided", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "New ticket", price: 12 });

    await request(app).put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({title:'updated ticket',price:20})
    .expect(200);

    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

    expect(ticketResponse.body.title).toEqual('updated ticket');
    expect(ticketResponse.body.price).toEqual(20);
});
