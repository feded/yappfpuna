from yapp.models import Base

from sqlalchemy import (
    Column,
    Integer,
    Text,
    )

class EntidadBase:

    """Define los campos base de una Tabla con 
        - _id: id de todas las entidades
        TODO:- _fecha_creacion = fecha de creacion
    """
    
    _id = Column(Integer, primary_key=True)
#    _sa_instance_state
    @property
    def id(self):
        return self._id
    
    @id.setter
    def id(self, id):
        if id < 0:
            raise ValueError("ID debe ser numerico y mayor a 0")
        else:
            self._id = id
            
class EntidadBaseDTO(object):
    """Clase que representa una entidad base para ser enviada"""
    def __init__(self, id):
        self._id = id;
