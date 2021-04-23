import {Observable, Observer} from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('siguiente [next]:', value),
    error: error => console.warn('error [obs]:', error),
    complete: ()=> console.info('Completado [obs]')
}

//const myFirstObs$ = Observable.create();
const myFirstObs$ = new Observable<string>(subscribe => {
    subscribe.next('hi')
    subscribe.next('word')

    //forzar error
   /*  const a = undefined;
    a.nombre = 'rigo' */

    subscribe.complete();
});

/* 

myFirstObs$.subscribe(console.log)
console.log('---------------')
myFirstObs$.subscribe(console.log)
console.log('*****************')
myFirstObs$.subscribe(console.log)
console.log('/////////////////')

myFirstObs$.subscribe(
    valor => console.log('next', valor),
    error => console.log('error', error),
    () => console.info('Completado')
) */

// otra mejor forma de lo anterior
myFirstObs$.subscribe(observer);