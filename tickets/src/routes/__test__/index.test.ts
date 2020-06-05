import request from 'supertest';
import { Ticket } from '../../models/ticket';
import { app } from '../../app';

it("should return lists of tickets", async ()=>{
 await request(app).post('/api/tickets')
 .set('Cookie', global.signin())
 .send({title:'Ticket 1', price:1})

 await request(app).post('/api/tickets')
 .set('Cookie', global.signin())
 .send({title:'Ticket 2', price:2})

 const ticketsResponse = await request(app).get('/api/tickets').send();
 expect(ticketsResponse.body.length).toEqual(2); 
})