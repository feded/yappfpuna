from sqlalchemy import Column, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.proyecto.proyecto import Proyecto

class Fase (EntidadPadre):
    """Crea una Tabla Fase con 
        - L{EntidadPadre}
        - Proyecto: proyecto al que pertenece la fase"""
    __mapper_args__ = {'polymorphic_identity': 'proyecto'}
    __mapper_args__ = {'polymorphic_identity': 'fase'}
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    __tablename__ = "fase"
    _proyecto_id = Column(Integer, ForeignKey('proyecto._id'))
    _proyecto = relation(Proyecto, primaryjoin=(_proyecto_id == Proyecto._id), backref=backref('fase'))


    def __init__(self, nombre, proyecto):
        self._nombre = nombre;
        self._proyecto = proyecto;
