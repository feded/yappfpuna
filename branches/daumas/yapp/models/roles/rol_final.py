'''
Created on Mar 30, 2012

@author: arturo
'''
from sqlalchemy import Column, String
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models.roles.rol import Rol


class RolFinal (Rol):
    """Crea una Tabla RolFinal con 
        - _email: email del rol final.
        - _password: clave de seguridad para ingreso
        Los roles finales son aquellos con los cuales un usuario 
        puede ingresar al sistema
    """
    __tablename__ = "rol_final"
    __mapper_args__ = {'polymorphic_identity': 'rolfinal'}
    _id = Column(Integer, ForeignKey('rol._id'), primary_key=True)
    _email = Column(String, nullable=True)
    _password = Column(String, nullable=False)
    
    def __init__(self, nombre, estado, email, password):
        self._nombre = nombre
        self._estado = estado
        self._email = email
        self._password = password
        self._esFinal = True
        
    
