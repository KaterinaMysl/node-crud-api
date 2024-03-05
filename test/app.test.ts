import http from 'http';
import { users } from '../src/tools/requestH';
import * as dotenv from 'dotenv';
import { describe, test } from '@jest/globals';

dotenv.config();
const nodePort = process.env.NODE_PORT || 4000;

describe('CRUD API tests', () => {  
  let currentId: string;

  test('all notes get  with a GET api/users request (an empty array is expected)', (done) => {
    const expectedResult: string[] = [];
    http.get(`http://localhost:${nodePort}/api/users`, (response) => {
      let responseData = '';
      response.on('data', (chunk) => {
        responseData += chunk;
      });
      response.on('end', () => {
        const parseData = JSON.parse(responseData);
        expect(parseData).toEqual(expectedResult);
        expect(users).toEqual(expectedResult);
        done();
      });
    });
  });

  test('use a GET api/user/{userId} request, to get the created record by its id (the created record is expected)', (done) => {
    http.get(`http://localhost:${nodePort}/api/users/${currentId}`, (response) => {
      let responseData = '';
      response.on('data', (chunk) => {
        responseData += chunk;
      });
      response.on('end', () => {
        const parseData = JSON.parse(responseData);
        expect(parseData.id).toBe(currentId);
        done();
      });
    });
  });
  
  test('сreate a new user with a POST api/users request', (done) => {
    const newUser = {
      id: 'someUniqueId',
      username: 'TestUser',
      age: 25,
      hobbies: ['Programming']
    };

    const expectedUsersCount = users.length + 1;

    const req = http.request({
      method: 'POST',
      port: nodePort,
      path: '/api/users',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(res.statusCode).toBe(201);
        users.push(newUser);
        expect(users.length).toBe(expectedUsersCount);
        expect(users).toContainEqual(newUser);
        done();
      });
    });

    req.write(JSON.stringify(newUser));
    req.end();
  });
  
  test('use a GET api/users/{userId} request, to get a deleted object by id (expected answer is that there is no such object)', (done) => {
    http.get(`http://localhost:${nodePort}/api/users/${currentId}`, (response) => {
      let responseData = '';
      response.on('data', (chunk) => {
        responseData += chunk;
      });
      response.on('end', () => {
        const parseData = JSON.parse(responseData);
        expect(parseData.id).toBe(currentId);
        done();
      });
    });
  });
});
