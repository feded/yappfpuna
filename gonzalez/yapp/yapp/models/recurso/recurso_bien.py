from sqlalchemy import Column
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models.recurso.recurso import Recurso


class RecursoBien (Recurso):
    """
    @summary: Crea una Tabla Recurso_Bien. Recurso del tipo bien. Hereda de recurso.
    @param _costo_cantidad: es el costo por cantidad de ese bien.
    @param _cantidad: cantidad del bien .
    """

    __tablename__ = "recurso_bien"
    _id = Column(Integer, ForeignKey('recurso._id'), primary_key=True)
    _costo_cantidad = Column(Integer, nullable=False)
    _cantidad = Column(Integer, nullable=False)
    
    def __init__(self, nombre, tipo, descripcion,costo_cantidad, cantidad):
        self._nombre = nombre
        self._tipo = tipo
        self._descripcion = descripcion
        self._costo_cantidad = costo_cantidad
        self._cantidad = cantidad