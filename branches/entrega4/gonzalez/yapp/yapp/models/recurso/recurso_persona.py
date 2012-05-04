from sqlalchemy import Column
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models.recurso.recurso import Recurso


class RecursoPersona (Recurso):
    __tablename__ = "recurso_persona"
    _id = Column(Integer, ForeignKey('recurso._id'), primary_key=True)
    _costo_hora = Column(Integer, nullable=False)
    
    def __init__(self, nombre, tipo, descripcion,costo_hora):
        self._nombre = nombre
        self._tipo = tipo
        self._descripcion = descripcion
        self._costo_hora = costo_hora