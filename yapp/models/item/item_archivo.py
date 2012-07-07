from sqlalchemy import Column, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.item.archivo import Archivo
from yapp.models.item.item import Item

class ItemArchivo (Base, EntidadBase):
    __tablename__ = "item_archivo"
    
    _archivo_id = Column(Integer, ForeignKey('archivo._id'))
    _item_id = Column(Integer,  ForeignKey('item._id'))
    _archivo = relation(Archivo, backref=backref('itemarchivo_archivo'))
    _item = relation(Item,backref=backref('itemarchivo_item'))
    
    def __init__(self, item, archivo):
        self._item = item;
        self._archivo = archivo;
        