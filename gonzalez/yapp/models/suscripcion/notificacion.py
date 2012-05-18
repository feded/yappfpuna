'''
Created on May 5, 2012

@author: arturo
'''
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, Boolean
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.historial import Historial, HistorialDTO
from yapp.models.suscripcion.suscripcion import Suscripcion, SuscripcionDTO

class Notificacion(Base, EntidadBase):
    __tablename__ = "notificacion"
    _historial_id = Column(Integer, ForeignKey('historial._id'))
    _historial = relation(Historial, backref=backref('notifiacacion_historial'))
    _suscripcion_id = Column(Integer, ForeignKey('suscripcion._id'))
    _suscripcion = relation(Suscripcion, backref=backref('notificacion_suscripcion'))
    _leido = Column(Boolean, nullable=False)
    
    def __init__(self, historial, suscripcion, leido):
        self._historial = historial;
        self._suscripcion = suscripcion;
        self._leido = leido
        
class NotificacionDTO:
    def __init__(self, notificacion):
        self._id = notificacion._id
        self._leido = notificacion._leido
        if notificacion._historial != None:
            self._historial = HistorialDTO(notificacion._historial)
        if notificacion._rol_final != None:
            self._suscripcion = SuscripcionDTO(notificacion._suscripcion)
        
        
