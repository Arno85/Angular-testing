import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

xdescribe('Async Testing examples', () => {

  it('Asynchronous test example with Jasmin', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);

  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;

    setTimeout(() => { }, 300);

    setTimeout(() => {
      test = true;
    }, 1000);
    // tick(1300);
    flush();
    console.log('running assertions setTimeout()');
    expect(test).toBe(true);
  }));

  it('Asynchronous test example - Promises', fakeAsync(() => {
    let test = false;
    console.log('Creating promise');

    // setTimeout are considered MACRO tasks (or tasks) along with setInterval, Ajax calls, mouse clicks, ...
    /*setTimeout(() => {
      console.log('setTimeout 1 evaluated successfully');
    });

    setTimeout(() => {
      console.log('setTimeout 2 evaluated successfully');
    });*/

    // Promises are considered MICRO tasks so they have a kind of priority for execution
    // They are added to a different queue than MACRO tasks in JS
    Promise.resolve().then(() => {
      console.log('Promise 1 evaluated successfully');
      return Promise.resolve();
    })
      .then(() => {
        console.log('Promise 2 evaluated successfully');
        test = true;
      });

    flushMicrotasks();
    console.log('running assertions Promises');
    expect(test).toBeTruthy();
    // flush();
  }));

  it('Asynchronous test example - Promise + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;

        setTimeout(() => {
          counter += 1;
        }, 1000);
      });

    console.log('running assertions Promise + setTimeout()');
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    flush();
    expect(counter).toBe(11);
  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;
    console.log('Creating Observable');
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    console.log('running assertions Observables');
    expect(test).toBeTruthy();
  }));
});
