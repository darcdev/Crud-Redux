import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
} from "../types";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
// Crear Nuevos productos

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //insertar en API
      await clienteAxios.post("/productos", producto);
      // si todo sale bien actualizar state
      dispatch(agregarProductoExito(producto));
      Swal.fire("Correcto", "El Producto se agrego correctamente", "success");
    } catch (error) {
      // si hay error cambiar el state
      dispatch(agregarProductoError(true));

      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un Error , intenta de nuevo",
      });
    }
  };
}

// AGREGAR PRODUCTO API
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

// si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

// DESCARGA PRODUCTOS API
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargaProductosError(true));
    }
  };
}
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = (estado) => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado,
});

// Seleccionar y eliminar el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      Swal.fire("Eliminado!", "El producto ha sido eliminado.", "success");
    } catch (error) {
      dispatch(eliminarProductoError(true));
    }
  };
}
const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});
const eliminarProductoError = (estado) => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: estado,
});
// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoActionEditar(producto));
  };
}
const obtenerProductoActionEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

export function editarProductoAction(producto) {
  return async (dispatch) => {
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      editarProductoExito(producto);
    } catch (error) {
      console.log(error);
      dispatch(errorProducto(true));
    }
  };
}
const editarProductoExito = () => ({
  type: PRODUCTO_EDITAR_EXITO,
});
const errorProducto = (estado) => ({
  type: PRODUCTO_EDITAR_ERROR,
  payload: estado,
});
