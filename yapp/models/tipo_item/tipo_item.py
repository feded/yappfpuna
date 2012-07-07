from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Boolean
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models.proyecto.proyecto import Proyecto



class TipoItem (Base, EntidadBase):
    """Crea una Tabla TipoItem con 
        - _nombre: nombre del tipo de item
        - _comentario: comentario del tipo de item
        - _color: color del tipo de item
        - _prefijo: prefijo del tipo de item
        - _condicionado: determina si un item es condicionado
    """
    __tablename__ = "tipo_item"
    _nombre = Column(String, nullable=True)
    _comentario = Column(String, nullable=True)
    _color = Column(String, nullable=False)
    _prefijo = Column(String, nullable=False)
    _condicionado = Column(Boolean)
    _proyecto_id = Column(Integer, ForeignKey('proyecto._id'))
    _proyecto = relation(Proyecto, backref=backref('tipo_proyecto'), primaryjoin=Proyecto._id==_proyecto_id)
    
    
    def __init__(self, nombre, comentario, color, prefijo, condicionado,proyecto):
        self._nombre = nombre
        self._comentario = comentario
        self._color = color
        self._prefijo = prefijo
        self._condicionado = condicionado
        self._proyecto = proyecto


class TipoItemDTO:
    def __init__(self, entidad):
        self._id = entidad._id
        self._nombre = entidad._nombre
        self._comentario = entidad._comentario
        self._color = entidad._color
        self._prefijo = entidad._prefijo
        self._condicionado = entidad._condicionado
        self._proyecto_id = entidad._proyecto.id