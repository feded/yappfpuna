from sqlalchemy import Column
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models.recurso.recurso import Recurso


class RecursoMaterial (Recurso):
    """
    @summary: Crea una Tabla Recurso_Material. Recurso del tipo material. Hereda de recurso.
    @param _costo_cantidad: es el costo por cantidad de ese material.
    @param _cantidad: cantidad del material .
    """
    __tablename__ = "recurso_material"
    _id = Column(Integer, ForeignKey('recurso._id'), primary_key=True)
    _costo_cantidad = Column(Integer, nullable=False)
    _cantidad = Column(Integer, nullable=False)
    __mapper_args__ = {'polymorphic_identity': 'recurso_material'}
    
    def __init__(self, nombre, tipo, descripcion,costo_cantidad, cantidad):
        self._nombre = nombre
        self._tipo = tipo
        self._descripcion = descripcion
        self._costo_cantidad = costo_cantidad
        self._cantidad = cantidad