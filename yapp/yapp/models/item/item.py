from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relation, backref, relationship
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Boolean
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.fase.fase import Fase
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.tipo_item.tipo_item import TipoItem

class Item (EntidadPadre):
    """Crea una Tabla item con 
        - _nombre: nombre del item
        - _tipo_item_id: tipo de item asociado al item
        """
    __tablename__ = "item"
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    _nombre = Column(String, nullable=False)
    _tipo_item_id = Column(Integer, ForeignKey('tipo_item._id'))
    _tipo_item = relation(TipoItem, backref=backref('item_tipo'))
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relation(Fase, backref=backref('item_fase'), primaryjoin=(_fase_id == Fase._id))
    _duracion = Column(Integer , nullable=False)
    _condicionado = Column(Boolean, nullable=False)
    _version = Column(Integer, nullable=False)
    _estado = Column(String, nullable=False)
    _fecha_inicio = Column(String, nullable=True)
    _fecha_fin = Column(String, nullable=True)
    _antecesor_id = Column(Integer, ForeignKey('item._id'))
    _padre_id = Column(Integer, ForeignKey('item._id'))
    _padre = relation('Item', primaryjoin=(_padre_id == _id))
#    _padre = relationship("Item", primaryjoin=(_padre_id == _id))
    
    def __init__(self, nombre, tipo_item, fase, duracion, condicionado, version, estado, fecha_inicio, fecha_fin, antecesor_id, padre):
        self._nombre = nombre
        self._tipo_item = tipo_item
        self._fase = fase
        self._duracion = duracion
        self._condicionado = condicionado
        self._version = version
        self._estado = estado
        self._fecha_inicio = fecha_inicio
        self._fecha_fin = fecha_fin
        self._antecesor_id = antecesor_id
        self._padre = padre
        #self._tipo_item = tipo_item
