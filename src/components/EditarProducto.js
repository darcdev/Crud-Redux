import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
const EditarProducto = () => {
  //producto  a editar
  // nuevo state de producto
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
  });
  const productoEditar = useSelector((state) => state.productos.productoEditar);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    guardarProducto(productoEditar);
  }, [productoEditar]);

  const { nombre, precio } = producto;

  const submitEditarProducto = (e) => {
    e.preventDefault();
    producto.precio = Number(producto.precio);
    dispatch(editarProductoAction(producto));
    history.push("/");
  };

  const onChangeFormulario = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4-font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                onClick={submitEditarProducto}
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Editar Producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
