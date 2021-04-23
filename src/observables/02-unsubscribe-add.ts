import {Observable, Observer} from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('[next]:', value),
    error: error => console.warn('error:', error),
    complete: ()=> console.info('Completado')
}
const intervalo$ = new Observable<number>(susb => {
    
    let cont = 1;
    const intervalo = setInterval(() => {
        console.log({cont})
        susb.next(cont);
        cont++;
    }, 1000);

    /* setTimeout(() => {
        susb.complete();
    }, 3000); */

    return ()=>{
        clearInterval(intervalo); // destrulle el setInterval
        console.log('intervalo destruido');
    }
})

//const subscription = intervalo$.subscribe(resp => console.log('Num: ', resp));
const subscription1 = intervalo$.subscribe(observer);
const subscription2 = intervalo$.subscribe(observer);
const subscription3 = intervalo$.subscribe(observer);

subscription1.add(subscription2)
            .add(subscription3); // subcribes encadenados

setTimeout(() => {
    subscription1.unsubscribe(); // cancelar la ejecucion del observable
    console.log('completado timeout')
}, 5000);