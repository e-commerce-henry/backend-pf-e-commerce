const mercadopago = require('mercadopago');

//agregando credenciales

mercadopago.configure({
    access_token:'TEST-2740297351268044-012718-d897c3fceba48737188059496e0ec59f-237469205'

});

class mercadopagocontrolador{

    async mercadopago({request}){

        let preference = {
            items: [
              {
                title: "Mi producto",
                unit_price: 100,
                quantity: 1,
              },
            ],
        };


        mercadopago.preferences
        .create(preference)
        .then(function (response) {
          // Este valor reemplazará el string "<%= global.id %>" en tu HTML
          global.id = response.body.id;
        })
        .catch(function (error) {
          console.log(error);
        });

    }


}


module.exports = mercadopagocontrolador