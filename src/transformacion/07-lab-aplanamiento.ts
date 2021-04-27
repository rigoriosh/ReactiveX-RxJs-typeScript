import { fromEvent, of } from 'rxjs';
import { tap, map, mergeMap, pluck, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Helper
const peticionHttpLogin = ( userPass ) => ajax.post('https://reqres.in/api/login?delay=1', userPass)
        .pipe(
            pluck('response', 'token'),
            catchError( err => of('xxx') )
        )

// creando un formulario
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass  = document.createElement('input');
const submitBtn  = document.createElement('button');

// Configuraciones
inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar';

form.append( inputEmail, inputPass, submitBtn );
document.querySelector('body').append( form );

// Streams
const submitForm$ = fromEvent<Event>( form, 'submit' )
    .pipe(
        tap( ev => ev.preventDefault() ),
        map( ev => {
            const data = {
                email: ev.target[0].value,
                password: ev.target[1].value
            }
            return data;
        }),
        //mergeMap(peticionHttpLogin)
        //switchMap(peticionHttpLogin)
        exhaustMap( data => peticionHttpLogin(data) )
    );


submitForm$.subscribe( token => {
    console.log(token);
})
