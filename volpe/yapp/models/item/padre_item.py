from sqlalchemy import Column, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.item.item import Item

class PadreItem (Base, EntidadBase):
    __tablename__ = "padre_item"
    _padre_id = Column(Integer, ForeignKey('item._id'))
    _padre = relation(Item, backref=backref('padre'),primaryjoin=_padre_id==Item._id)
    _hijo_id = Column(Integer, ForeignKey('item._id'))
    _hijo = relation(Item, backref=backref('hijo'),primaryjoin=_hijo_id==Item._id)

    def __init__(self, padre, hijo):
        self._padre = padre;
        self._hijo = hijo;