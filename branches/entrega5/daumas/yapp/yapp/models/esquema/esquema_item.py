from sqlalchemy import Column, String, Integer
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.entidad_padre import  EntidadPadre
from sqlalchemy.types import Boolean ,Date


class EsquemaItem(Base, EntidadBase):
    """Crea una la tabla atributo_esquema con
        - _esquema_id: id del esquema
        - _item_id : id del item agregado al esquema
    """
    __tablename__ = "esquema_item"
    _esquema_id = Column(Integer, ForeignKey('esquema._id'))
    _item_id = Column(Integer, ForeignKey('item._id'))

    def __init__(self, esquema_id, item_id):
        self._esquema_id = esquema_id
        self._item_id = item_id