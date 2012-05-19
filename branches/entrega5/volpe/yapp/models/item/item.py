from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Boolean
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.fase.fase import Fase
from yapp.models.tipo_item.tipo_item import TipoItem

class Item (EntidadPadre):
    __tablename__ = "item"
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    _tipo_item_id = Column(Integer, ForeignKey('tipo_item._id'))
    _tipo_item = relation(TipoItem, backref=backref('item_tipo'))
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relation(Fase, backref=backref('item_fase'), primaryjoin=Fase._id == _fase_id)
    _duracion = Column(Integer , nullable=False)
    _condicionado = Column(Boolean, nullable=False)
    _version = Column(Integer, nullable=False)
    _estado = Column(String, nullable=False)
    _fecha_inicio = Column(String, nullable=True)
    _fecha_fin = Column(String, nullable=True)
    
    _linea_base_id = Column(Integer, ForeignKey('linea_base._id'))
    
    def __init__(self, nombre, tipo_item, fase, duracion, condicionado, version, estado, fecha_inicio, fecha_fin):
        self._nombre = nombre
        self._tipo_item = tipo_item
        self._fase = fase
        self._duracion = duracion
        self._condicionado = condicionado
        self._version = version
        self._estado = estado
        self._fecha_inicio = fecha_inicio
        self._fecha_fin = fecha_fin
        
class ItemDTO:
    def __init__(self, item):
        self._nombre = item._nombre
#        self._tipo_item = item._tipo_item
#        self._fase = item._fase
        self._duracion = item._duracion
        self._condicionado = item._condicionado
        self._version = item._version
#        self._estado = item._estado
        self._fecha_inicio = item._fecha_inicio
        self._fecha_fin = item._fecha_fin        
