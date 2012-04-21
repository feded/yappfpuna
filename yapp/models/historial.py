'''
Created on Mar 30, 2012

@author: arturo
'''

from sqlalchemy import Column, Integer, Text, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class Historial (Base, EntidadBase):

    """Crea una Tabla Historial con 
        - _entidad: nombre de la tabla modificada
        - _id_modificado : id del registro modificado
        - _accion: accion realizada
        - _usuario: usuario qeu realizo la accion
    """
    
    __tablename__ = "historial"
    _entidad = Column(String, nullable=False);
    _id_modificado = Column(Integer, nullable=False);
    _accion = Column(String, nullable=False);
    _usuario = Column(String, nullable=False);
    
    def __init__(self, entidad, id_modificado, accion, usuario):
        self._entidad = entidad
        self._id_modificado = id_modificado
        self._accion = accion
        self._usuario = usuario

    
