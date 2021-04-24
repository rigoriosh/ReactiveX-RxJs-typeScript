import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// el operador tap: permite emitir eventos escundarios

const numeros$ = range(1,5); // observable que emite un rango de numeros


numeros$.pipe(
    tap( x => { // genera primer evento
        console.log('antes', x);
        return 100; // este return no hace nada
    }),
    map( val => val * 10 ),// toma lo que retorna el tap y lo multiplica * 10
    tap({ // genera segundo evento
        next: newValor => console.log('después', newValor),
        complete: () => console.log('Se terminó todo')// esta linea se ejucta cuando el range termina su tarea osea esto se ejcuta cuando el observable termina toda su lógica
    })
)
.subscribe( val => console.log('subs', val ));// va ejecutan cada bloque de codigo del observable






