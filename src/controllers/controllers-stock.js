import models from '../models/models-control';


//FUNCIÓN QUE AUMENTA EL NÚMERO DE ARTICULOS
async function aumentStock (id_articulo, cantidad){

    //USAMOS EL DESTRUCTURING PARA REQUERIR EL STOCK DE LA BASE DE DATOS
    let {stock} = await models.Articulo.findOne({_id: id_articulo})
    let newStock = parseInt(stock) + parseInt(cantidad)
    const data = await models.Articulo.findByIdAndUpdate({_id: id_articulo}, {stock: newStock})
    


}



//FUNCIÓN QUE DISMINUYE EL NÚMERO DE ARTICULOS
async function disminStock (id_articulo, cantidad){

     //USAMOS EL DESTRUCTURING PARA REQUERIR EL STOCK DE LA BASE DE DATOS
     let {stock} = await models.Articulo.findOne({_id: id_articulo})
     let newStock = parseInt(stock) - parseInt(cantidad)
     const data = await models.Articulo.findByIdAndUpdate({_id: id_articulo}, {stock: newStock})



}





export default {

    aumentStock,
    disminStock

}