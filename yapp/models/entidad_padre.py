'''
Created on Apr 20, 2012

@author: arturo
'''
from sqlalchemy import Column, Integer
from yapp.models import Base


class Entidad:
    
    _id = Column(Integer, primary_key=True)
    _
    @property
    def id(self):
        return self._id
    
    @id.setter
    def id(self, id):
        if id < 0:
            raise ValueError("ID debe ser numerico y mayor a 0")
        else:
            self._id = id
