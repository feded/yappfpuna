'''
Created on Mar 30, 2012

@author: arturo
'''
from sqlalchemy import Column, String
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.roles.rol import Rol


class RolFinal (Rol):
    __tablename__ = "rol_final"
    __mapper_args__ = {'polymorphic_identity': 'rolfinal'}
    _email = Column(String, nullable=True)
    _contrasenha = Column(String, nullable=False)
    id = Column(Integer, ForeignKey('rol._id'), primary_key=True)
    
    def __init__(self, email, contrasenha):
        self._email = email;
        self._contrasenha = contrasenha;
        
    