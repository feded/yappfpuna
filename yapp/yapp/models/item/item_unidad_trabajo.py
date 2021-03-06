from sqlalchemy import Column, String, Integer, Sequence
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey, UniqueConstraint
from sqlalchemy.types import Boolean
from yapp.models.entidad_padre import EntidadPadre
from yapp.models import Base
from yapp.models.fase.fase import Fase, FaseDTO
from yapp.models.tipo_item.tipo_item import TipoItem, TipoItemDTO
from yapp.models.entidad_base import EntidadBase
from yapp.models.item.item import ItemDTO
from yapp.daos.unidad_trabajo_dao import UnidadTrabajoDAO
from yapp.models.unidad_trabajo.unidad_trabajo import UnidadTrabajoDTO

class ItemUnidadTrabajo (Base, EntidadBase):
    __tablename__ = "item_unidad_trabajo"
    _item_id = Column(Integer,  ForeignKey('item._id') )
    _unidad_id = Column(Integer,  ForeignKey('unidad_trabajo._id'))
    _cantidad = Column(Integer , nullable = False)
    
    
    def __init__(self, item_id, unidad_id, cantidad):
        self._item_id = item_id
        self._unidad_id = unidad_id
        self._cantidad = cantidad

class ItemUnidadTrabajoDTO:
    def __init__(self, item_unidad):
        self._item_id = item_unidad._item_id
        self._id = item_unidad._id
        if (item_unidad._item!= None):
            self._item = ItemDTO(item_unidad._item)
        if (item_unidad._unidad!= None):
            self._unidad = UnidadTrabajoDTO(item_unidad._unidad)
        self._unidad_id = item_unidad._unidad_id
        self._cantidad = item_unidad._cantidad

