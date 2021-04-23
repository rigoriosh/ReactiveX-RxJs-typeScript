import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next : value => console.log('next:', value ),
    error: error => console.warn('error:', error ),
    complete: () => console.info('completado')
};

const intervalo$ = new Observable<number>( subs => { // el number es el tipo de dato que va a retornar el observable

    const intervalID =  setInterval(() => {
        subs.next( Math.random() ) // genera numeros random
    }, 1000);
    

    return () => { // cuando se realiza el subscribe se dispara este codigo
        clearInterval( intervalID );
        console.log('Intervalo destruido')
    };

});

/**
 * 1- Casteo múltiple
 * 2- También es un observer
 * 3- Next, error y complete
 */

const subject$ = new Subject(); // cuando tiene el simbolo de dolar es por q es un obervable
const subscription = intervalo$.subscribe( subject$ );  // con subscribe empieza a ejecutarse la funcion dentro de intervalo$


// const subs1 = intervalo$.subscribe( rnd => console.log('subs1', rnd) ); //ejecuta el codigo que esta en intervalo$
// const subs2 = intervalo$.subscribe( rnd => console.log('subs2', rnd) );

// ejecuta dos subcris pero por medio de un subject, el cual continen la misma información
// lo contarrio de subcribe qu genera dos instancias diferentes, el subject es una sola instancia
// para pordelo llamar de diferentes partes de codigo y retorne la misma información para todos
const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );


setTimeout( () => {

    // como el subject es un observe tiene tambien el metodo next, compete and error
    subject$.next(10); // este metodo es como el setState, modifica el observable con 10
                       // y de donde esten los subscribe escuchando van a obtener ese dato
                       // es conocido como un Hot Observable, el por defecto o interno es el Cold Observable

    subject$.complete(); // termina la ejecusiojn del codigo pero no lo destruye

    subscription.unsubscribe(); // este si lo destruye

}, 3500 );

