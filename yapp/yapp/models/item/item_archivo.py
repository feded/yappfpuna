from sqlalchemy import Column, Binary, Integer, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class itemArchivo (Base, EntidadBase):
    __tablename__ = "item_archivo"
    
    _archivo = Column(Binary)
    _nombre_archivo = Column(String)
    _item_id = Column(Integer)
    def __init__(self, id_item, archivo, nombre):
        self._item_id = id_item;
        self._archivo = archivo;
        self._nombre_archivo = nombre;
