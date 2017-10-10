import { Component } from '@angular/core';
import { request } from 'graphql-request';

const BASE_URL = 'http://localhost:3100/graphql';

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
    }
  }
`;

@Component({
  selector: 'app-root',
  template: `
        <h1>{{title}}</h1>
        <pre>{{students | json}}</pre>
    `,
  styles: []
})
export class AppComponent {
  title = 'Students';
  students: Student[];
  constructor() {
    request(BASE_URL, AllStudentsQuery).then(
      (data: QueryResponse) => (this.students = data.allStudents)
    );
  }
}
