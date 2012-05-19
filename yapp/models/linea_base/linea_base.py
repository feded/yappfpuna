'''
Created on May 18, 2012

@author: arturo
'''
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.fase.fase import Fase, FaseDTO
from yapp.models.item.item import ItemDTO, Item
class LineaBase (EntidadPadre):
    __tablename__ = "linea_base"
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relationship(Fase, primaryjoin=Fase._id==_fase_id)
    _items = relationship("Item", primaryjoin=Item._linea_base_id==_id)
    
    def __init__(self, nombre, descripcion, fase, items):
        self._nombre = nombre
        self._descripcion = descripcion
        self._fase = fase
        self._items = items
    
    
class LineaBaseDTO:
    def __init__(self, linea_base):
        self._nombre = linea_base._nombre
        self._fase = FaseDTO(linea_base._fase)
        self._id = linea_base._id
        items = []
        if linea_base != None:
            for entidad in linea_base._items:
                dto = ItemDTO(entidad)
                items.append(dto)
        self._items = items;
    
    
