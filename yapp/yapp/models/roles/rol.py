'''
Created on Mar 30, 2012

@author: arturo
'''
from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class Rol (Base, EntidadBase):
    __tablename__ = "rol"
    _nombre = Column(String, nullable=True)
    _estado = Column(String, nullable=True)
    
    def __init__(self, nombre, estado):
        self._nombre = nombre;
        self._estado = estado;
        
    