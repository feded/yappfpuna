from sqlalchemy import Column, String, Integer
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.proyecto.proyecto import Proyecto
from sqlalchemy.types import Boolean ,Date

class Item (Base, EntidadBase):
    """Crea una Tabla item con 
        - _nombre: nombre del item
        - _tipo_item_id: tipo de item asociado al item
        """
    __tablename__ = "item"
    _nombre = Column(String, nullable = False)
    _tipo_item_id = Column(Integer, ForeignKey('tipo_item._id'))
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _duracion = Column(Integer , nullable = False)
    _condicionado = Column(Boolean, nullable = False)
    _version = Column(Integer, nullable = False)
    _estado = Column(String, nullable = False)
    _fecha_inicio = Column(Date)
    _fecha_fin = Column(Date)
    _antecesor_id = Column(Integer, ForeignKey('item._id'))
    _padre_id = Column(Integer, ForeignKey('item._id'))

    def __init__(self, nombre, tipo_item_id, fase_id, duracion, condicionado, version, estado, fecha_inicio, fecha_fin, antecesor_id, padre_id):
        self._nombre = nombre
        self._tipo_item_id = tipo_item_id
        self._fase_id = fase_id
        self._duracion = duracion
        self._condicionado = condicionado
        self._version = version
        self._estado = estado
        self._fecha_inicio = fecha_inicio
        self._fecha_fin = fecha_fin
        self._antecesor_id = antecesor_id
        self._padre_id = padre_id
