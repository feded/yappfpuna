'''
Created on Mar 30, 2012

@author: arturo
'''
from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class RolEstado (Base, EntidadBase):
    __tablename__ = "rol_estado"
    _estado = Column(String, nullable = False)
    
    def __init__(self, estado):
        self._estado = estado
        
    