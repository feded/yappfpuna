from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.recurso.tipo_recurso import TipoRecurso

class Recurso (Base, EntidadBase):
    """
    @summary: Crea una Tabla Recurso. Los Recursos pueden ser asignados a items.
    @param _nombre: nombre del recurso.
    @param _descripcion: una breve descripcion del recurso.
    @param _tipo: tipo de recurso. Puede ser persona, bien o material.
    """
    __tablename__ = "recurso"
    _nombre = Column(String, nullable = False)
    _tipo_id = Column(Integer, ForeignKey('tipo_recurso._id'))
    _descripcion = Column(String)
    _tipo = relation(TipoRecurso, backref=backref('recurso'))

    def __init__(self, nombre, tipo,descripcion):
        self._nombre = nombre;
        self._tipo = tipo;
        self._descripcion = descripcion