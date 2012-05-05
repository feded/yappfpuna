from sqlalchemy import Column, String, Integer
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.entidad_padre import  EntidadPadre
from sqlalchemy.types import Boolean ,Date


class AtributoEsquema(Base, EntidadBase):
    """Crea una la tabla atributo_esquema con
        - _nombre: nombre del esquema
        - _descripcion : descripcion del esquema
        - _tipo : tipo del atributo
        - _valor : valor del atributo
        - _esquema_id : esquema relacionado al atributo
    """
    __tablename__ = "atributo_esquema"
    _nombre = Column(String, nullable=False)
    _descripcion = Column(String, nullable = False)
    _tipo = Column(String, nullable = False)
    _valor = Column(String, nullable = False)
    _esquema_id = Column(Integer, ForeignKey('esquema._id'))


    def __init__(self, nombre, descripcion,  tipo, valor, esquema_id):
        self._nombre = nombre
        self._descripcion = descripcion
        self._tipo = etiqueta
        self._valor = valor
        self._esquema_id = esquema_id