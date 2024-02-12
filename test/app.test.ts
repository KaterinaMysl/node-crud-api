import http from 'http';
import { users } from '../src/tools/requestH';
import * as dotenv from 'dotenv';
import { describe, test } from '@jest/globals';

dotenv.config();
const nodePort = process.env.NODE_PORT || 4000;

describe('CRUD API tests', () => {  
  let currentId: string;

  test('Get all records with a GET api/users request (an empty array is expected)', (done) => {
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

  test('With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', (done) => {
    http.get(`http://localhost:4000/api/users/${currentId}`, (response) => {
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

  test('With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)', (done) => {
    http.get(`http://localhost:4000/api/users/${currentId}`, (response) => {
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