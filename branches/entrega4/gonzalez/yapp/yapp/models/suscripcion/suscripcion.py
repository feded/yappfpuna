'''
Created on Apr 20, 2012

@author: arturo
'''
from sqlalchemy import Column, String
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.roles.rol_estado import RolEstado
from yapp.models.roles.rol_final import RolFinal

class Suscripcion (Base, EntidadBase):
    """Crea una Tabla Suscripcion con 
        - _nombre: nombre de la suscripcion.
        - _entidad: estado a la que se suscribio
        - _rol_final: usuario duenho de la suscripcion
    """
    __tablename__ = "suscripcion"
    _nombre = Column(String, nullable=False)
    _entidad_id = Column(Integer, ForeignKey('entidad_padre._id'))
    _entidad = relation(EntidadPadre, backref=backref('suscripcion'))
    _rol_id = Column(Integer, ForeignKey('rol_final._id'))
    _rol_final = relation(RolFinal, backref=backref('rolfinal'));
    
    def __init__(self, nombre, entidad, rol_final):
        self._nombre = nombre;
        self._entidad = entidad;
        self._rol_final = rol_final;
        
