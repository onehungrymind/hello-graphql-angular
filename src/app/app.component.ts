import { Component } from '@angular/core';
import { request } from 'graphql-request';

const BASE_URL = 'http://localhost:3000/graphql';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  courses: Course[];
}

interface Course {
  id: string;
  name: string;
  description: string;
  level: string;
}

interface QueryResponse {
  allStudents;
}

const AllStudentsQuery = `
  query allStudents {
    allStudents {
      id
      firstName
      lastName
      active
      courses {
          id
          name
          description
          level
      }
    }
  }
`;

@Component({
  selector: 'app-root',
  template: `
        <h1>Students</h1>
        <pre>{{students | json}}</pre>
    `,
  styles: []
})
export class AppComponent {
  students: Student[];
  constructor() {
    request(BASE_URL, AllStudentsQuery).then(
      (data: QueryResponse) => (this.students = data.allStudents)
    );
  }
}
