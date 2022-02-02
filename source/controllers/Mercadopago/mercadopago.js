const server = require("express").Router();
const { Order, OrderDetail , Product} = require("../db");

const mercadopago = require("mercadopago");
const { response } = require("express");

const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

async function mercadop (req, res, next){
    try{
        const ordenId = req.params.id; 
        const cart = req.body.data;
        const items_ml = cart.map((i) => ({
            title: i.title,
            unit_price: i.unit_price,
            quantity: i.quantity,
          }));
          let preference = {
            items: items_ml,
            external_reference: ordenId,
            payment_methods: {
              excluyed_payment_types: [
                {
                  id: "ata",
                },
              ],
              installments: 3,
            },
            back_urls: {
              success: `/mercadopago/pagos` || "http://localhost:3001/mercadopago/pagos",
              failure: `/` || "http://localhost:3000/",
              pending: `/` || "http://localhost:3000/",
            },
          };

     const response = await mercadopago.preferences.create(preference)
     global.id=response.body.id


     res.json({id: global.id, init_point: response.body.init_point})

    } catch(error){

        console.log(error);

        res.send(error);

    }  }
    
  async function pagos (req, res, next){
    const paymentid = req.query.payment_id;
    const paymentstatus = req.query.status;
    const externalreference = req.query.external_reference;
    const merchantorderid = req.query.merchant_order_id;
 
  
    let carrito; 
  
    let a = OrderDetail.findAll({
      where: {orderId: externalreference}
    })
    .then(respuesta => {
      carrito = respuesta
    
      carrito.map(pos => {
        var ids = pos.productId
    
     
        Product.findOne(
          {where: {id: ids}
        })
        .then(response => {
          var stock = response.stock
          stock = stock - pos.amount
          Product.update(
            {stock: stock},
            {where : {id: pos.productId}}
           )
           .then(respuesta =>{console.log("STOCK CAMBIADO"); return true})
           .catch(err => {console.log ("error cambio de stock", err)})
        })
        .catch(err => {console.log("HUBO PROBLEMAS CON EL FIND ONEE", err)})
      })
  
    })
    .catch(err => { console.log("ERROR PARGO MERCADOPAGO EN FINDONE", err)})
  
   
  
    let b=Order.update(
      { state: "accepted", paymentid, paymentstatus, merchantorderid, paymentMethod:"MercadoPago" },
      { where: { id: externalreference } }
    )
      .then((Order) => {
        console.info("salvando order");
        console.info("redirect success");
        return res.redirect("/home"||"http://localhost:3000/home")
      })
      .catch((err) => {
        console.error("error al salvar", err);
        return res.redirect("/error"||"http://localhost:3000/error");
      });
      Promise.all([a,b]).then(response=>{res.send("Checkout exitoso")})
  }
  
  module.exports = {
    pagos,
    mercadop
};
