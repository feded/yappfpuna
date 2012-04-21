from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Boolean
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase



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
    _color = Column(Integer, nullable=False)
    _prefijo = Column(String, nullable=False)
    _condicionado = Column(Boolean)
    
    def __init__(self, nombre, comentario, color, prefijo, condicionado):
        self._nombre = nombre
        self._comentario = comentario
        self._color = color
        self._prefijo = prefijo
        self._condicionado = condicionado

