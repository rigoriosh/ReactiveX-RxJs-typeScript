import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';


const numeros$ = of(1,2,3,4,5); // emite cinco valores


numeros$.pipe(
    tap( t => console.log('tap', t) ),
    take(3) // el take es como un brake, al llegar a la emision 3, cancela la ejecuci[on del observable
)
.subscribe({
    next: val => console.log('next:' , val),
    complete: () => console.log('complete'),
});





