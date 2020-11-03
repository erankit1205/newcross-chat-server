const request = require("supertest");
const app = require("../../app/index");
const expect = require("chai").expect;

describe("/login ", () => {
    const BASE_URL = "/app/v1"
    it("should return token for valid user", (done) => {
        request(app).post(BASE_URL + "/login")
            .send({ "username": "test1", "password": "test1" })
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.body).to.have.property("token");
                done();
            });
    });

    it("should return Invalid credentials for invalid user", (done) => {
        request(app).post(BASE_URL + "/login")
            .send({ "username": "invalid", "password": "test1" })
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.body).not.to.have.property("token");
                done();
            });
    });
});