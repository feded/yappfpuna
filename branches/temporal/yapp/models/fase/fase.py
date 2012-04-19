from sqlalchemy import Column, String, Integer
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.proyecto.proyecto import Proyecto

class Fase (Base, EntidadBase):
    __tablename__ = "fase"
    _nombre = Column(String, nullable = False)
    _proyecto_id = Column(Integer, ForeignKey('proyecto._id'))
    _proyecto = relation(Proyecto, backref=backref('proyecto'))

    def __init__(self, nombre, proyecto):
        self._nombre = nombre;
        self._proyecto = proyecto;
        
    