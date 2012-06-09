from sqlalchemy import Column, Integer
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.unidad_trabajo.unidad_trabajo import UnidadTrabajo
from yapp.models.recurso.recurso import Recurso

class UnidadTrabajo_Recurso (Base, EntidadBase):
    """
    @summary: Crea una Tabla Unidad_Trabajo_Recurso.
    """
    __tablename__ = "unidad_trabajo_recurso"
    _unidad_trabajo_id = Column(Integer, ForeignKey('unidad_trabajo._id'))
    _unidad_trabajo = relation(UnidadTrabajo, backref=backref('unidadtrabajorecurso_unidadtrabajo'))
    _recurso_id = Column(Integer, ForeignKey('recurso._id'))
    _recurso = relation(Recurso)
        
    def __init__(self, unidadTrabajo,recurso):
        self._unidad_trabajo_id = unidadTrabajo;
        self._recurso_id = recurso;