'''
Created on Mar 30, 2012

@author: arturo
'''
from sqlalchemy.schema import Column
from sqlalchemy.types import String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Proyecto(EntidadBase, Base):
    __tablename__ = "proyecto"
    _nombre = Column(String, nullable=False)
    _autor = Column(String, nullable=False)
    def __init__(self, nombre, autor):
        self._nombre = nombre;
        self._autor = autor;
