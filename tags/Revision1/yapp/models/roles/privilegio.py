'''
Created on Mar 30, 2012

@author: arturo
'''
from sqlalchemy.schema import Column
from sqlalchemy.types import String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Privilegio(EntidadBase, Base):
    __tablename__ = "privilegio"
    _nombre = Column(String, nullable=False)
    def __init__(self, nombre):
        self._nombre = nombre;
