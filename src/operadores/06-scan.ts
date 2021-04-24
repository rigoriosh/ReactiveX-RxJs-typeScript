import { from } from 'rxjs';
import { reduce, scan, map } from 'rxjs/operators';


const numeros = [1,2,3,4,5];

// const totalAcumulador = (acc, cur) => {
//     return acc + cur;
// }
const totalAcumulador = (acc: number, cur: number) => acc + cur;

// Reduce
from( numeros ).pipe(
    reduce( totalAcumulador, 0 )
)
.subscribe( r => console.log('reduse: ', r) );

// Scan
from( numeros ).pipe(
    scan( totalAcumulador, 0 )
)
.subscribe(r => console.log('scan: ', r) );

// Redux
interface Usuario {
    id?: string; // ? es opcional
    autenticado?: boolean;
    token?: string;
    edad?: number;
}

const user: Usuario[] = [
    { id: 'fher1', autenticado: false, token: null },
    { id: 'fher2', autenticado: true, token: 'ABC' },
    { id: 'fher3', autenticado: true, token: 'ABC123' },
];

const state$ = from( user ).pipe(
    scan<Usuario>( (acc, cur) => {
        return { ...acc, ...cur }
    }, { edad: 33 })// agrea una varial al estado inicial
);

const id$ = state$.pipe(
    map( state => state.id )
);

id$.subscribe( console.log );


