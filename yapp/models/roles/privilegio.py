from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.roles.entidad import Entidad


class Privilegio(EntidadBase, Base):
    __tablename__ = "privilegio"
    _nombre = Column(String, nullable=False)
#    _entidad_id = Column(Integer, ForeignKey('entidad._id'))
    _entidad_id = Column(Integer, ForeignKey('entidad._id'))
    _entidad = relation(Entidad, backref=backref('privilegio'))
#    _estado = relation(RolEstado, backref=backref('rol'))
    
    def __init__(self, nombre, entidad):
        self._nombre = nombre;
        self._entidad = entidad;