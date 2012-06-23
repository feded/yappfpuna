from sqlalchemy import Column, String, Integer, Sequence
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Boolean, DateTime
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.fase.fase import Fase, FaseDTO
from yapp.models.tipo_item.tipo_item import TipoItem, TipoItemDTO

class Item (EntidadPadre):
    __tablename__ = "item"
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    _item_id = Column(Integer, Sequence('item_id_seq'), nullable = False )
    _tipo_item_id = Column(Integer, ForeignKey('tipo_item._id'))
    _tipo_item = relation(TipoItem, backref=backref('item_tipo'))
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relation(Fase, backref=backref('item_fase'), primaryjoin=Fase._id == _fase_id)
    _duracion = Column(Integer , nullable=False)
    _condicionado = Column(Boolean, nullable=False)
    _version = Column(Integer, nullable=False)
    _estado = Column(String, nullable=False)
    _fecha_inicio = Column(String, nullable=True)
    _completado = Column(Integer, nullable=True)
    _padre_item_id = Column(Integer, ForeignKey('item._id'))
    _antecesor_item_id = Column(Integer, ForeignKey('item._id'))    
    _linea_base_id = Column(Integer, ForeignKey('linea_base._id'))
    
    def __init__(self, item_id,  nombre, tipo_item, fase, duracion, descripcion,  condicionado, version, estado, fecha_inicio, completado, padre_item_id, antecesor_item_id):
        self._item_id = item_id
        self._nombre = nombre
        self._tipo_item = tipo_item
        self._fase = fase
        self._duracion = duracion
        self._descripcion = descripcion
        self._condicionado = condicionado
        self._version = version
        self._estado = estado
        self._fecha_inicio = fecha_inicio
        self._completado = completado
        self._padre_item_id = padre_item_id
        self._antecesor_item_id = antecesor_item_id
#        self._linea_base_id = linea_base_id



class ItemDTO:
    def __init__(self, item):
        self._item_id = item._item_id
        self._id = item._id
        self._nombre = item._nombre;
        self._tipo_item = TipoItemDTO(item._tipo_item);
        self._fase = FaseDTO(item._fase);
        self._duracion = item._duracion;
        self._descripcion = item._descripcion;
        self._condicionado = item._condicionado;
        self._version = item._version;
        self._estado = item._estado;
        self._fecha_inicio = item._fecha_inicio;
        self._completado = item._completado;
        self._padre_item_id = item._padre_item_id
        self._antecesor_item_id = item._antecesor_item_id
#        self._linea_base_id = item._linea_base_id

