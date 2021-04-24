import { range, from, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
/* 
 range(1,10).pipe(
     filter( val => val % 2 === 1 )// si es verdadero lo deja pasar
 ).subscribe( console.log );
 */
range(20,30).pipe(
    filter( (val, i) => {
        console.log('index', i);
        return val % 2 === 1; // si retorna true deja pasar el value
    })
)//.subscribe( console.log );

interface Personaje {
    tipo: string;
    nombre: string;
}

const personajes: Personaje[] = [
    {
        tipo: 'heroe',
        nombre: 'Batman'
    },
    {
        tipo: 'heroe',
        nombre: 'Robin'
    },
    {
        tipo: 'villano',
        nombre: 'Joker'
    },
];


from( personajes ).pipe(
    filter( p => p.tipo !== 'heroe' )
).subscribe( console.log );

// encadenamiento de observables
const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' ).pipe(
    map( event => event.code ), // keyboardEvent, string
    filter( key => key === 'Enter' ), // el filter entra en juego con la información que le retorna el map
);



keyup$.subscribe( console.log );


