import { of, range, asyncScheduler } from 'rxjs';


// const src$ = of(1,2,3,4,5);
// el renge genera un serie de numeros, en el ejemplo de bajo, numero de 1 al 5
const src$ = range(1,5, asyncScheduler);


console.log('inicio');
src$.subscribe( console.log );
console.log('fin');


