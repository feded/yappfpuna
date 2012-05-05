'''
Created on Apr 20, 2012

@author: arturo
'''
from sqlalchemy import Column
from sqlalchemy.types import String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase, EntidadBaseDTO


class EntidadPadre (EntidadBase, Base):
    """Crea una Tabla EntidadPadre con 
        - _nombre: nombre del tipo de item
        - _descripcion: comentario del tipo de item
    """
    __tablename__ = "entidad_padre"
    _nombre = Column(String, nullable=False)
    _descripcion = Column(String)
#    _discriminator = Column('type', String(50))
#    __mapper_args__ = {'polymorphic_on': _discriminator}

    def __init__(self, nombre, descripcion):
        self._nombre = nombre
        self._descripcion = descripcion

class EntidadPadreDTO (EntidadBaseDTO):
    def __init__(self, entidad):
#        super(EntidadPadreDTO, self).__init__(id)
        self._id = entidad._id;
        self._nombre = entidad._nombre;
        self._descripcion = entidad._descripcion;
        