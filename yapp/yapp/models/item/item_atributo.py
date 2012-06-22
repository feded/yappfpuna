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
from yapp.models.tipo_item.atributo_tipo_item import AtributoTipoItemDTO

class ItemAtributo (Base, EntidadBase):
    __tablename__ = "item_atributo"
    _item_id = Column(Integer, ForeignKey('item._id'))
    _atributo_id = Column(Integer,  ForeignKey('atributo_tipo_item._id'))
    _valor = Column(String , default = "",  nullable = False)
    
    def __init__(self, item_id, atributo_id, valor):
        self._item_id = item_id
        self._atributo_id = atributo_id
        self._valor = valor

class ItemAtributoDTO:
    
    def __init__(self, item_atributo):
        self._id = item_atributo._id
        self._item_id = item_atributo._item_id
        self._id = item_atributo._id
        self._item = ItemDTO(item_atributo._item)
        self._atributo = AtributoTipoItemDTO(item_atributo._atributo)
        self._atributo_id = item_atributo._atributo_id
        self._valor = item_atributo._valor

