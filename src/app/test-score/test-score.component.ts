import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: number;
}
@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<ITest> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {

  }

  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null,
    };
    this.tests.unshift(test);
      this.toastService.showToast('success', 5000, 'Test Added.');
  }

  deleteTest(index: number) {
    this.tests.splice(index, 1);
      this.toastService.showToast('success', 5000, 'Test was Deleted.');
  }
  saveTest() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
      this.toastService.showToast('success', 5000, 'Success: Test Saved.');
  }

  async loadTestsFromJson() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();
  }

  computeGrade() {
    console.log('from finalize...');
    const data = this.calculate();
    this.router.navigate(['home', data]);
  }

  calculate() {
    let grade = 0;
    for (let i = 0; i < this.tests.length; i++) {
      // console.log('i --->', i, "this.contacts[i]", this.contacts [i]);
      grade += this.tests[i].grade;
      // console.log('owed--->', owed);
    }
    return {
      numberOfTests: this.tests.length,
      pointsPossible: grade,
      pointsEarned: grade * .10,
      Precent: grade + (grade * .10)
    };

  }
  search(params: string) {
    console.log('from search ... params', params);

    this.tests = this.tests.filter((test: ITest) => {
      return test.testName.toLowerCase() === params.toLowerCase();
    });
  }
}
