from sqlalchemy import Column, String, Integer
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.entidad_padre import  EntidadPadre
from sqlalchemy.types import Boolean ,Date


class Esquema(Base, EntidadBase):
    """Crea una la tabla esquema con
        - _nombre: nombre del esquema
        - _descripcion : descripcion del esquema
        - _etiqueta: etiqueda del esquema
        - _color: color para identificar al esquema
        - _fase_id: relacion con la fase sobre la que se crea el esquema
    """
    __tablename__ = "esquema"
    _nombre = Column(String, nullable=False)
    _descripcion = Column(String, nullable = False)
    _etiqueta = Column(String, nullable = False)
    _color = Column(String, nullable = False)
    _fase_id = Column(Integer, ForeignKey('fase._id'))


    def __init__(self, nombre, descripcion,  etiqueta, color, fase_id):
        self._nombre = nombre
        self._descripcion = descripcion
        self._etiqueta = etiqueta
        self._color = color
        self._fase_id = fase_id