from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models import Base
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.proyecto.proyecto import Proyecto

class Fase (EntidadPadre):
    __mapper_args__ = {'polymorphic_identity': 'fase'}
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    __tablename__ = "fase"
    _proyecto_id = Column(Integer, ForeignKey('proyecto._id'))
    _proyecto = relation(Proyecto, primaryjoin=(_proyecto_id == Proyecto._id), backref=backref('fase'))

    def __init__(self, nombre, proyecto):
        self._nombre = nombre;
        self._proyecto = proyecto;
