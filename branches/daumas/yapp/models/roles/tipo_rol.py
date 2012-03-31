'''
Created on Mar 30, 2012

@author: arturo
'''
from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class TipoRol (Base, EntidadBase):
    __tablename__ = "tipo_rol"
    _nombre = Column(String, nullable=True)
    
    def __init__(self, nombre):
        self._nombre = nombre;
        
    