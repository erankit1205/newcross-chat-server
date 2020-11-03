const request = require("supertest");
const app = require("../../app/index");
const expect = require("chai").expect;

describe("Message controller ", () => {
    let token;
    const BASE_URL = "/app/v1"

    beforeEach(async () => {
        await request(app).post(BASE_URL + "/login")
            .send({ "username": "test1", "password": "test1" })
            .set('Accept', 'application/json')
            .then((response) => {
                token = response.body.token;
            });
    });

    describe("POST /message", () => {
        it("should return username timestamp and message for successful mesagge post", (done) => {
            request(app).post(BASE_URL + "/message")
                .set('Accept', 'application/json')
                .send({ "message": "test1" })
                .set('authorization', `Bearer ${token}`)
                .then(response => {
                    expect(response.body).to.have.property("username");
                    expect(response.body).to.have.property("timestamp");
                    expect(response.body).to.have.property("message");
                    expect(response.body.message).to.equals("test1");
                    expect(response.status).to.equal(200);
                    done();
                });
        });
    
        it("should return token error for invalid token", (done) => {
            request(app).post(BASE_URL + "/message")
                .set('Accept', 'application/json')
                .send({ "message": "test1" })
                .set('authorization', `Bearer invalied`)
                .then(response => {
                    expect(response.body).not.to.have.property("username");
                    expect(response.body).not.to.have.property("timestamp");
                    expect(response.body).not.to.have.property("message");
                    done();
                });
        });
    });

    describe("GET /message", () => {

        beforeEach(() => {
            request(app).post(BASE_URL + "/message")
                .set('Accept', 'application/json')
                .send({ "message": "dummy message for testing" })
                .set('authorization', `Bearer ${token}`)
        });

        it("should return username timestamp and message for all messages of that user", (done) => {
            request(app).get(BASE_URL + "/message")
                .set('Accept', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .then(response => {
                    expect(response.body[0]).to.have.property("username");
                    expect(response.body[0]).to.have.property("timestamp");
                    expect(response.body[0]).to.have.property("message");
                    expect(response.status).to.equal(200);
                    done();
                });
        });

        it("should return token error for invalid token", (done) => {
            request(app).get(BASE_URL + "/message")
                .set('Accept', 'application/json')
                .set('authorization', `Bearer invalid roken`)
                .then(response => {
                    expect(response.body).not.to.have.property("username");
                    expect(response.body).not.to.have.property("timestamp");
                    expect(response.body).not.to.have.property("message");
                    done();
                });
        });
    })
    
});