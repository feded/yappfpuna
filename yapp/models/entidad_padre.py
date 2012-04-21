'''
Created on Apr 20, 2012

@author: arturo
'''
from sqlalchemy import Column, Integer
from sqlalchemy.types import String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class EntidadPadre (EntidadBase, Base):
    __tablename__ = "entidad_padre"
    _nombre = Column(String, nullable=False)
    _descripcion = Column(String)
    _discriminator = Column('type', String(50))
    __mapper_args__ = {'polymorphic_on': _discriminator}

    def __init__(self, nombre, descripcion):
        self._nombre = nombre
        self._descripcion = descripcion
