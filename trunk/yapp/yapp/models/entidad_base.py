from yapp.models import Base

from sqlalchemy import (
    Column,
    Integer,
    Text,
    )

class EntidadBase:

    """Crea una Tabla TipoItem con 
        - _nombre: nombre del tipo de item
        - _comentario: comentario del tipo de item
        - _color: color del tipo de item
        - _prefijo: prefijo del tipo de item
        - _condicionado: determina si un item es condicionado
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
