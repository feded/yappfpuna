from yapp.models import Base

from sqlalchemy import (
    Column,
    Integer,
    Text,
    )

class EntidadBase:
    
    _id = Column(Integer, primary_key=True)

    @property
    def id(self):
        return self._id
    
    @id.setter
    def id(self, id):
        if id < 0:
            raise ValueError("ID debe ser numerico y mayor a 0")
        else:
            self._id = id
